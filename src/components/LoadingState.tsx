import { Loader2 } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="px-6 py-12 flex flex-col items-center justify-center animate-pulse-subtle">
      <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
      <p className="text-sm font-medium text-foreground">Analyzing zoning data...</p>
      <p className="text-xs text-muted-foreground mt-1">
        Checking land use codes and bylaws
      </p>
    </div>
  );
}
