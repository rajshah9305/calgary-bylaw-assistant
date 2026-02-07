import { MousePointerClick, Search, Sparkles, TrendingUp, DollarSign, Clock } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="px-6 py-8 flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4">
        <MousePointerClick className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">
        Let's Find Your Property!
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-8">
        Discover what you can build on any Calgary property in seconds. 
        It's easy - just search or click!
      </p>
      
      {/* How to Start */}
      <div className="grid gap-4 w-full max-w-md mb-8">
        <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 text-left">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
            <Search className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-900 mb-1">Option 1: Search Address</p>
            <p className="text-xs text-blue-700">Type any Calgary address in the search bar above</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 border border-green-200 text-left">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
            <MousePointerClick className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-green-900 mb-1">Option 2: Click on Map</p>
            <p className="text-xs text-green-700">Click any colored area on the map to the right</p>
          </div>
        </div>
      </div>

      {/* What You'll Get */}
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <p className="text-sm font-semibold text-foreground">What You'll Discover:</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 text-left">
            <TrendingUp className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-muted-foreground">Development potential</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 text-left">
            <DollarSign className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-muted-foreground">Cost estimates</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 text-left">
            <Clock className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-muted-foreground">Timeline info</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 text-left">
            <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-muted-foreground">Smart insights</span>
          </div>
        </div>
      </div>

      {/* Quick Tip */}
      <div className="mt-8 p-4 rounded-lg bg-amber-50 border border-amber-200 w-full max-w-md">
        <p className="text-xs text-amber-900">
          <strong>💡 Pro Tip:</strong> Looking for the best development potential? 
          Search for properties in <strong>R-CG zones</strong> - they allow up to 4 units!
        </p>
      </div>
    </div>
  );
}
