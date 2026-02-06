import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapErrorState } from './MapErrorState';
import { getZoneColor } from '@/lib/zoning-analysis';
import type { ZoningData } from '@/types/zoning';
import { Loader2 } from 'lucide-react';

interface ZoningMapProps {
  token: string;
  onParcelClick: (data: ZoningData) => void;
  onError: () => void;
}

const CALGARY_CENTER: [number, number] = [-114.0719, 51.0447];
const ZONING_URL = 'https://data.calgary.ca/resource/qe6k-p9nh.geojson?$limit=50000';
const COMMUNITY_URL = 'https://data.calgary.ca/resource/surr-xmvs.geojson';

export function ZoningMap({ token, onParcelClick, onError }: ZoningMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState('Initializing map...');
  const [error, setError] = useState<string | null>(null);

  const initializeMap = useCallback(async () => {
    if (!mapContainer.current || map.current) return;

    try {
      setIsLoading(true);
      setError(null);
      setLoadingStatus('Connecting to Mapbox...');

      mapboxgl.accessToken = token;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: CALGARY_CENTER,
        zoom: 11,
        pitch: 0,
        bearing: 0,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.current.on('load', async () => {
        if (!map.current) return;

        try {
          setLoadingStatus('Loading Calgary zoning data...');

          // Add zoning layer
          map.current.addSource('zoning', {
            type: 'geojson',
            data: ZONING_URL,
          });

          // Create color expression based on lu_code
          const colorExpression: mapboxgl.Expression = [
            'case',
            ['==', ['get', 'lu_code'], 'R-C1'], '#93C5FD',
            ['==', ['get', 'lu_code'], 'R-C2'], '#60A5FA',
            ['==', ['get', 'lu_code'], 'R-CG'], '#34D399',
            ['all', ['has', 'lu_code'], ['==', ['slice', ['get', 'lu_code'], 0, 2], 'DC']], '#F59E0B',
            ['all', ['has', 'lu_code'], ['==', ['slice', ['get', 'lu_code'], 0, 2], 'R-']], '#60A5FA',
            ['all', ['has', 'lu_code'], ['==', ['slice', ['get', 'lu_code'], 0, 2], 'M-']], '#8B5CF6',
            ['all', ['has', 'lu_code'], ['==', ['slice', ['get', 'lu_code'], 0, 2], 'C-']], '#F472B6',
            '#CBD5E1'
          ];

          map.current.addLayer({
            id: 'zoning-fill',
            type: 'fill',
            source: 'zoning',
            paint: {
              'fill-color': colorExpression,
              'fill-opacity': 0.6,
            },
          });

          map.current.addLayer({
            id: 'zoning-outline',
            type: 'line',
            source: 'zoning',
            paint: {
              'line-color': '#475569',
              'line-width': 0.5,
              'line-opacity': 0.5,
            },
          });

          setLoadingStatus('Loading community boundaries...');

          // Add community boundaries
          map.current.addSource('communities', {
            type: 'geojson',
            data: COMMUNITY_URL,
          });

          map.current.addLayer({
            id: 'community-outline',
            type: 'line',
            source: 'communities',
            paint: {
              'line-color': '#1E293B',
              'line-width': 2,
              'line-dasharray': [3, 2],
              'line-opacity': 0.7,
            },
          });

          // Hover effect
          map.current.on('mouseenter', 'zoning-fill', () => {
            if (map.current) {
              map.current.getCanvas().style.cursor = 'pointer';
            }
          });

          map.current.on('mouseleave', 'zoning-fill', () => {
            if (map.current) {
              map.current.getCanvas().style.cursor = '';
            }
          });

          // Click handler
          map.current.on('click', 'zoning-fill', (e) => {
            if (e.features && e.features.length > 0) {
              const feature = e.features[0];
              const properties = feature.properties;
              
              const luCode = properties?.lu_code || properties?.land_use_designation || 'Unknown';
              
              // Try to get community name
              const communityName = properties?.comm_name || properties?.community || '';

              onParcelClick({
                luCode,
                community: communityName,
                parcelId: properties?.objectid?.toString(),
              });

              // Add highlight
              if (map.current) {
                const existingHighlight = map.current.getLayer('highlight');
                if (existingHighlight) {
                  map.current.removeLayer('highlight');
                  map.current.removeSource('highlight');
                }

                map.current.addSource('highlight', {
                  type: 'geojson',
                  data: feature as GeoJSON.Feature,
                });

                map.current.addLayer({
                  id: 'highlight',
                  type: 'line',
                  source: 'highlight',
                  paint: {
                    'line-color': '#2563EB',
                    'line-width': 3,
                  },
                });
              }
            }
          });

          setIsLoading(false);
        } catch (err) {
          console.error('Error loading map layers:', err);
          setError('Failed to load Calgary zoning data. Please try again.');
          setIsLoading(false);
        }
      });

      map.current.on('error', (e) => {
        console.error('Mapbox error:', e);
        const errorMessage = e.error?.message || '';
        if (errorMessage.includes('access token') || errorMessage.includes('401')) {
          setError('Invalid Mapbox access token. Please check your token and try again.');
          onError();
        }
      });

    } catch (err) {
      console.error('Map initialization error:', err);
      setError('Failed to initialize the map. Please try again.');
      setIsLoading(false);
      onError();
    }
  }, [token, onParcelClick, onError]);

  useEffect(() => {
    initializeMap();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [initializeMap]);

  const handleRetry = () => {
    if (map.current) {
      map.current.remove();
      map.current = null;
    }
    setError(null);
    initializeMap();
  };

  if (error) {
    return (
      <MapErrorState
        error={error}
        onRetry={handleRetry}
        onReconfigure={onError}
      />
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
      
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
          <p className="text-sm font-medium text-foreground">{loadingStatus}</p>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg shadow-panel p-3 text-xs">
        <p className="font-medium text-foreground mb-2">Zoning Legend</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#93C5FD' }} />
            <span className="text-muted-foreground">R-C1</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#60A5FA' }} />
            <span className="text-muted-foreground">R-C2</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#34D399' }} />
            <span className="text-muted-foreground">R-CG</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#F59E0B' }} />
            <span className="text-muted-foreground">Direct Control</span>
          </div>
        </div>
      </div>
    </div>
  );
}
