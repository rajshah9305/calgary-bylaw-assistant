import { MousePointerClick, Search, History, Bookmark, Share2, FileText } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="px-6 py-12 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
        <MousePointerClick className="w-7 h-7 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Select a Property
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs mb-6">
        Search for an address above or click on any parcel on the map to see its 
        development feasibility analysis.
      </p>
      
      <div className="grid gap-3 w-full max-w-xs">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 text-left">
          <Search className="w-5 h-5 text-primary flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Search by address</p>
            <p className="text-xs text-muted-foreground">Real geocoding with Mapbox</p>
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

      <div className="mt-8 pt-6 border-t border-divider w-full max-w-xs">
        <p className="text-xs font-medium text-muted-foreground mb-3">NEW FEATURES</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <History className="w-3.5 h-3.5" />
            <span>Search History</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Save Properties</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Results</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <FileText className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </div>
        </div>
      </div>
    </div>
  );
}
