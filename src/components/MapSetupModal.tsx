import { useState } from 'react';
import { Map, ExternalLink, Key } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface MapSetupModalProps {
  open: boolean;
  onSave: (token: string) => void;
}

export function MapSetupModal({ open, onSave }: MapSetupModalProps) {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token.trim()) {
      setError('Please enter a Mapbox access token');
      return;
    }

    if (!token.startsWith('pk.')) {
      setError('Please enter a valid public access token (starts with pk.)');
      return;
    }

    onSave(token.trim());
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Map className="w-5 h-5 text-primary-foreground" />
            </div>
            <DialogTitle className="text-xl">Map Setup Required</DialogTitle>
          </div>
          <DialogDescription className="text-base">
            To display the interactive Calgary zoning map, please add your Mapbox access token.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="token" className="text-sm font-medium">
              <Key className="w-3.5 h-3.5 inline mr-1.5" />
              Public Access Token
            </Label>
            <Input
              id="token"
              type="text"
              placeholder="pk.eyJ1Ijoi..."
              value={token}
              onChange={(e) => {
                setToken(e.target.value);
                setError('');
              }}
              className="font-mono text-sm"
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>

          <div className="bg-secondary/50 rounded-lg p-4 text-sm">
            <p className="font-medium text-foreground mb-2">How to get a token:</p>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Create a free account at mapbox.com</li>
              <li>Go to your Account → Access tokens</li>
              <li>Copy your default public token</li>
            </ol>
            <a
              href="https://account.mapbox.com/access-tokens/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-3 text-primary hover:underline"
            >
              Open Mapbox Dashboard
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <Button type="submit" className="w-full">
            Save & Load Map
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
