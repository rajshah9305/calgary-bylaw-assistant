import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { compareProperties, type ComparisonResult } from '@/lib/comparison';
import type { ZoningData } from '@/types/zoning';
import { CheckCircle2, XCircle, AlertCircle, Trophy } from 'lucide-react';

interface ComparisonViewProps {
  properties: ZoningData[];
  onClose: () => void;
}

export function ComparisonView({ properties, onClose }: ComparisonViewProps) {
  const comparison: ComparisonResult = compareProperties(properties);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'permitted':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'likely':
        return <AlertCircle className="w-4 h-4 text-blue-600" />;
      case 'prohibited':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Property Comparison</h2>
        <Button variant="outline" onClick={onClose}>Close</Button>
      </div>

      <Card className="p-4 bg-primary/5 border-primary">
        <p className="text-sm font-medium">{comparison.recommendation}</p>
      </Card>

      <div className="space-y-4">
        {comparison.items.map((item, index) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  {index === 0 && <Trophy className="w-5 h-5 text-amber-500" />}
                  <h3 className="font-semibold">
                    {item.zoningData.address || item.zoningData.community}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.zoningData.luCode} • {item.zoningData.community}
                </p>
              </div>
              <Badge variant={index === 0 ? 'default' : 'secondary'}>
                Score: {item.score}/100
              </Badge>
            </div>

            <Separator className="my-3" />

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Backyard Suite</p>
                <div className="flex items-center gap-2">
                  {getStatusIcon(item.feasibility.backyardSuite.status)}
                  <span className="text-sm capitalize">{item.feasibility.backyardSuite.status}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Secondary Suite</p>
                <div className="flex items-center gap-2">
                  {getStatusIcon(item.feasibility.secondarySuite.status)}
                  <span className="text-sm capitalize">{item.feasibility.secondarySuite.status}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Rowhouse</p>
                <div className="flex items-center gap-2">
                  {getStatusIcon(item.feasibility.rowhouse.status)}
                  <span className="text-sm capitalize">{item.feasibility.rowhouse.status}</span>
                </div>
              </div>
            </div>

            <Separator className="my-3" />

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Max FAR:</span>
                <span className="ml-2 font-medium">
                  {item.detailedAnalysis.lotRequirements.maxFloorAreaRatio}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Timeline:</span>
                <span className="ml-2 font-medium">
                  {item.detailedAnalysis.costs.estimatedTimeline}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {comparison.bestForBackyardSuite && (
        <Card className="p-4 bg-green-50 border-green-200">
          <p className="text-sm">
            <strong>Best for Backyard Suite:</strong> Property {comparison.items.findIndex(i => i.id === comparison.bestForBackyardSuite) + 1}
          </p>
        </Card>
      )}

      {comparison.bestForRowhouse && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-sm">
            <strong>Best for Rowhouse:</strong> Property {comparison.items.findIndex(i => i.id === comparison.bestForRowhouse) + 1}
          </p>
        </Card>
      )}
    </div>
  );
}
