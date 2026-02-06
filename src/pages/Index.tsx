import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { ZoningMap } from '@/components/ZoningMap';
import { FeasibilityReport } from '@/components/FeasibilityReport';
import { LoadingState } from '@/components/LoadingState';
import { EmptyState } from '@/components/EmptyState';
import { MapSetupModal } from '@/components/MapSetupModal';
import { MapErrorState } from '@/components/MapErrorState';
import { useMapboxToken } from '@/hooks/useMapboxToken';
import { analyzeZoning } from '@/lib/zoning-analysis';
import type { ZoningData, FeasibilityResult } from '@/types/zoning';

const Index = () => {
  const { token, hasToken, saveToken, clearToken, isLoading: tokenLoading } = useMapboxToken();
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [analysisState, setAnalysisState] = useState<'empty' | 'loading' | 'complete'>('empty');
  const [zoningData, setZoningData] = useState<ZoningData | null>(null);
  const [feasibilityResult, setFeasibilityResult] = useState<FeasibilityResult | null>(null);
  const [mapError, setMapError] = useState(false);

  const handleSearch = useCallback((address: string) => {
    setAnalysisState('loading');
    
    // Simulate geocoding delay - in production this would geocode the address
    setTimeout(() => {
      // For demo, we'll create a mock response
      const mockData: ZoningData = {
        luCode: 'R-CG',
        community: 'Beltline',
        address: address,
      };
      
      setZoningData(mockData);
      setFeasibilityResult(analyzeZoning(mockData));
      setAnalysisState('complete');
    }, 1500);
  }, []);

  const handleParcelClick = useCallback((data: ZoningData) => {
    setAnalysisState('loading');
    
    // Small delay to show loading state
    setTimeout(() => {
      setZoningData(data);
      setFeasibilityResult(analyzeZoning(data));
      setAnalysisState('complete');
    }, 800);
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
      {/* Left Panel */}
      <div className="w-[38%] min-w-[380px] max-w-[520px] flex flex-col border-r border-divider bg-panel">
        <Header />
        <SearchBar onSearch={handleSearch} isLoading={analysisState === 'loading'} />
        
        <div className="flex-1 overflow-y-auto border-t border-divider">
          {analysisState === 'empty' && <EmptyState />}
          {analysisState === 'loading' && <LoadingState />}
          {analysisState === 'complete' && zoningData && feasibilityResult && (
            <FeasibilityReport result={feasibilityResult} zoningData={zoningData} />
          )}
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
    </div>
  );
};

export default Index;
