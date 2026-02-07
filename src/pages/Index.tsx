import { useState, useCallback, useEffect } from 'react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { SearchHistory } from '@/components/SearchHistory';
import { ZoningMap } from '@/components/ZoningMap';
import { FeasibilityReport } from '@/components/FeasibilityReport';
import { LoadingState } from '@/components/LoadingState';
import { EmptyState } from '@/components/EmptyState';
import { MapSetupModal } from '@/components/MapSetupModal';
import { MapErrorState } from '@/components/MapErrorState';
import { OnboardingTour } from '@/components/OnboardingTour';
import { FloatingHelpButton } from '@/components/FloatingHelpButton';
import { useMapboxToken } from '@/hooks/useMapboxToken';
import { analyzeZoning } from '@/lib/zoning-analysis';
import { geocodeAddress } from '@/lib/geocoding';
import { 
  getSearchHistory, 
  addToSearchHistory, 
  clearSearchHistory,
  type SearchHistoryItem 
} from '@/lib/storage';
import type { ZoningData, FeasibilityResult } from '@/types/zoning';

const Index = () => {
  const { token, hasToken, saveToken, clearToken, isLoading: tokenLoading } = useMapboxToken();
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [analysisState, setAnalysisState] = useState<'empty' | 'loading' | 'complete' | 'error'>('empty');
  const [zoningData, setZoningData] = useState<ZoningData | null>(null);
  const [feasibilityResult, setFeasibilityResult] = useState<FeasibilityResult | null>(null);
  const [mapError, setMapError] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Load search history on mount
  useEffect(() => {
    setSearchHistory(getSearchHistory());
  }, []);

  const handleSearch = useCallback(async (address: string) => {
    if (!token) return;
    
    setAnalysisState('loading');
    setErrorMessage('');
    
    try {
      // Geocode the address
      const geocoded = await geocodeAddress(address, token);
      
      if (!geocoded) {
        setAnalysisState('error');
        setErrorMessage('Address not found. Please try a different address in Calgary.');
        return;
      }

      // For now, create mock zoning data since we'd need to query the zoning layer
      // In a full implementation, you'd query the zoning GeoJSON at these coordinates
      const mockData: ZoningData = {
        luCode: 'R-CG', // This should come from actual zoning data
        community: geocoded.community || 'Calgary',
        address: address,
      };
      
      setZoningData(mockData);
      setFeasibilityResult(analyzeZoning(mockData));
      addToSearchHistory(mockData);
      setSearchHistory(getSearchHistory());
      setAnalysisState('complete');
    } catch (error) {
      console.error('Search error:', error);
      setAnalysisState('error');
      setErrorMessage('Failed to search address. Please try again.');
    }
  }, [token]);

  const handleParcelClick = useCallback((data: ZoningData) => {
    setAnalysisState('loading');
    setErrorMessage('');
    
    // Small delay to show loading state
    setTimeout(() => {
      setZoningData(data);
      setFeasibilityResult(analyzeZoning(data));
      addToSearchHistory(data);
      setSearchHistory(getSearchHistory());
      setAnalysisState('complete');
    }, 800);
  }, []);

  const handleHistorySelect = useCallback((item: SearchHistoryItem) => {
    const data: ZoningData = {
      luCode: item.luCode,
      community: item.community,
      address: item.address,
    };
    setZoningData(data);
    setFeasibilityResult(analyzeZoning(data));
    setAnalysisState('complete');
  }, []);

  const handleClearHistory = useCallback(() => {
    clearSearchHistory();
    setSearchHistory([]);
  }, []);

  const handleTokenSave = (newToken: string) => {
    saveToken(newToken);
    setShowSetupModal(false);
    setMapError(false);
  };

  const handleMapError = () => {
    setMapError(true);
  };

  const handleReconfigure = () => {
    clearToken();
    setMapError(false);
    setShowSetupModal(true);
  };

  const handleRetry = () => {
    setMapError(false);
  };

  // Show modal if no token after loading
  const shouldShowModal = !tokenLoading && !hasToken && !showSetupModal;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Onboarding Tour */}
      <OnboardingTour />
      
      {/* Left Panel */}
      <div className="w-[38%] min-w-[380px] max-w-[520px] flex flex-col border-r border-divider bg-panel">
        <Header />
        <SearchBar onSearch={handleSearch} isLoading={analysisState === 'loading'} />
        
        <div className="flex-1 overflow-y-auto border-t border-divider">
          {analysisState === 'empty' && (
            <>
              <SearchHistory
                history={searchHistory}
                onSelect={handleHistorySelect}
                onClear={handleClearHistory}
              />
              <EmptyState />
            </>
          )}
          {analysisState === 'loading' && <LoadingState />}
          {analysisState === 'error' && (
            <div className="px-6 py-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚠️</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Search Error</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">{errorMessage}</p>
            </div>
          )}
          {analysisState === 'complete' && zoningData && feasibilityResult && (
            <FeasibilityReport result={feasibilityResult} zoningData={zoningData} />
          )}
        </div>

        {/* Footer Disclaimer */}
        <div className="border-t border-divider bg-card px-4 py-3">
          <p className="text-xs text-foreground text-center">
            <span className="font-semibold">Disclaimer:</span> It's a helpful starting point, but always verify with the City of Calgary before starting any construction.
          </p>
        </div>
      </div>

      {/* Right Panel - Map */}
      <div className="flex-1 relative">
        {tokenLoading ? (
          <div className="flex-1 flex items-center justify-center bg-secondary/30">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
          </div>
        ) : hasToken && token && !mapError ? (
          <ZoningMap
            token={token}
            onParcelClick={handleParcelClick}
            onError={handleMapError}
          />
        ) : mapError ? (
          <MapErrorState
            onRetry={handleRetry}
            onReconfigure={handleReconfigure}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-secondary/30 h-full">
            <div className="text-center p-8">
              <p className="text-muted-foreground mb-4">Map requires configuration</p>
              <button
                onClick={() => setShowSetupModal(true)}
                className="text-primary hover:underline font-medium"
              >
                Configure Mapbox Token
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Setup Modal */}
      <MapSetupModal
        open={shouldShowModal || showSetupModal}
        onSave={handleTokenSave}
      />

      {/* Floating Help Button */}
      <FloatingHelpButton />
    </div>
  );
};

export default Index;
