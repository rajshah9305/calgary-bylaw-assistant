import { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { X, Bell, ExternalLink } from 'lucide-react';
import { getRelevantAlerts, dismissAlert, type ZoningAlert } from '@/lib/notifications';
import type { ZoningData } from '@/types/zoning';

interface NotificationBannerProps {
  zoningData: ZoningData | null;
}

export function NotificationBanner({ zoningData }: NotificationBannerProps) {
  const [alerts, setAlerts] = useState<ZoningAlert[]>([]);

  useEffect(() => {
    const relevantAlerts = getRelevantAlerts(zoningData);
    setAlerts(relevantAlerts);
  }, [zoningData]);

  const handleDismiss = (alertId: string) => {
    dismissAlert(alertId);
    setAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-2 p-4 border-b border-divider bg-card">
      {alerts.map(alert => (
        <Alert 
          key={alert.id}
          className={`relative ${
            alert.priority === 'high' ? 'border-amber-500 bg-amber-50' :
            alert.priority === 'medium' ? 'border-blue-500 bg-blue-50' :
            'border-gray-300 bg-gray-50'
          }`}
        >
          <Bell className="h-4 w-4" />
          <AlertTitle className="flex items-center justify-between pr-8">
            <span>{alert.title}</span>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 h-6 w-6 p-0"
              onClick={() => handleDismiss(alert.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </AlertTitle>
          <AlertDescription className="text-sm">
            {alert.description}
            {alert.url && (
              <a 
                href={alert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 inline-flex items-center gap-1 text-primary hover:underline"
              >
                Learn more <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </AlertDescription>
          <div className="mt-2 text-xs text-muted-foreground">
            Effective: {alert.effectiveDate}
          </div>
        </Alert>
      ))}
    </div>
  );
}
