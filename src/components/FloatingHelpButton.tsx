import { useState } from 'react';
import { HelpCircle, Phone, Mail, ExternalLink, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function FloatingHelpButton() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {showMenu && (
        <Card className="absolute bottom-16 right-0 w-72 p-4 shadow-lg animate-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Need Help?</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setShowMenu(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <a
              href="tel:311"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Phone className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Call 311</p>
                <p className="text-xs text-muted-foreground">City of Calgary</p>
              </div>
            </a>

            <a
              href="https://www.calgary.ca/planning"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <ExternalLink className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Planning Website</p>
                <p className="text-xs text-muted-foreground">calgary.ca/planning</p>
              </div>
            </a>

            <a
              href="mailto:planning@calgary.ca"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <Mail className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Email Planning</p>
                <p className="text-xs text-muted-foreground">planning@calgary.ca</p>
              </div>
            </a>
          </div>

          <div className="mt-3 pt-3 border-t">
            <p className="text-xs text-muted-foreground text-center">
              Always verify information with the City before making decisions
            </p>
          </div>
        </Card>
      )}

      <Button
        size="lg"
        className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all"
        onClick={() => setShowMenu(!showMenu)}
      >
        {showMenu ? (
          <X className="w-6 h-6" />
        ) : (
          <HelpCircle className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
}
