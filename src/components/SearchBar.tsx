import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (address: string) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-6 py-4">
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter a Calgary address..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-11 bg-background border-input"
          />
        </div>
        <Button 
          type="submit" 
          disabled={isLoading || !query.trim()}
          className="h-11 px-5"
        >
          <Search className="w-4 h-4 mr-2" />
          Analyze
        </Button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Or click directly on the map to analyze a parcel
      </p>
    </form>
  );
}
