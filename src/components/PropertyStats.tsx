import { MapPin, Building2, Layers, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { ZoningData } from '@/types/zoning';
import { getZoneColor } from '@/lib/zoning-analysis';

interface PropertyStatsProps {
  zoningData: ZoningData;
}

export function PropertyStats({ zoningData }: PropertyStatsProps) {
  const zoneColor = getZoneColor(zoningData.luCode);

  return (
    <div className="grid grid-cols-2 gap-3 mb-4">
      <Card className="shadow-card">
        <CardContent className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: zoneColor }}
            />
            <span className="text-xs text-muted-foreground">Zone Type</span>
          </div>
          <p className="text-sm font-semibold text-foreground">{zoningData.luCode}</p>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardContent className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Community</span>
          </div>
          <p className="text-sm font-semibold text-foreground truncate">
            {zoningData.community}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
