import { AlertCircle, RefreshCw, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MapErrorStateProps {
  onRetry: () => void;
  onReconfigure: () => void;
  error?: string;
}

export function MapErrorState({ onRetry, onReconfigure, error }: MapErrorStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-secondary/30 p-8 text-center">
      <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-destructive" />
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Map Failed to Load
      </h3>
      
      <p className="text-sm text-muted-foreground max-w-md mb-6">
        {error || 'There was an issue loading the map. This might be due to an invalid token or network issues.'}
      </p>
      
      <div className="flex gap-3">
        <Button variant="outline" onClick={onRetry}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </Button>
        <Button onClick={onReconfigure}>
          <Settings className="w-4 h-4 mr-2" />
          Reconfigure Token
        </Button>
      </div>
    </div>
  );
}
