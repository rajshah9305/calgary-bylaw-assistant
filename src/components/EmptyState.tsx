import { MousePointerClick, Search } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="px-6 py-12 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
        <MousePointerClick className="w-7 h-7 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Select a Property
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs">
        Search for an address above or click on any parcel on the map to see its 
        development feasibility analysis.
      </p>
      
      <div className="mt-8 grid gap-3 w-full max-w-xs">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 text-left">
          <Search className="w-5 h-5 text-primary flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Search by address</p>
            <p className="text-xs text-muted-foreground">Enter any Calgary address</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 text-left">
          <MousePointerClick className="w-5 h-5 text-primary flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Click on map</p>
            <p className="text-xs text-muted-foreground">Select any colored parcel</p>
          </div>
        </div>
      </div>
    </div>
  );
}
