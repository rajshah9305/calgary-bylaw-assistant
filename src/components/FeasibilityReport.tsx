import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  HelpCircle,
  Home,
  Building,
  Layers,
  Ruler,
  FileText,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { FeasibilityResult, ZoningData } from '@/types/zoning';
import { getZoneLabel } from '@/lib/zoning-analysis';

interface FeasibilityReportProps {
  result: FeasibilityResult;
  zoningData: ZoningData;
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'permitted':
      return (
        <span className="status-permitted">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Permitted
        </span>
      );
    case 'likely':
      return (
        <span className="status-likely">
          <HelpCircle className="w-3.5 h-3.5" />
          Likely (Discretionary)
        </span>
      );
    case 'prohibited':
      return (
        <span className="status-prohibited">
          <XCircle className="w-3.5 h-3.5" />
          Prohibited
        </span>
      );
    case 'manual-review':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-warning/10 text-warning">
          <AlertTriangle className="w-3.5 h-3.5" />
          Manual Review
        </span>
      );
    default:
      return null;
  }
}

function FeatureRow({ 
  icon: Icon, 
  label, 
  status, 
  description 
}: { 
  icon: React.ElementType;
  label: string;
  status: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
        <Icon className="w-4 h-4 text-secondary-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="font-medium text-foreground">{label}</span>
          <StatusBadge status={status} />
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export function FeasibilityReport({ result, zoningData }: FeasibilityReportProps) {
  const handleGeneratePDF = () => {
    // Mock action
    alert('PDF Report generation coming soon! This feature will create a detailed analysis document.');
  };

  return (
    <div className="px-6 py-4 animate-slide-up">
      {/* Zone Overview Card */}
      <Card className="mb-4 shadow-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Zoning Analysis</CardTitle>
            <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-sm font-mono font-medium">
              {zoningData.luCode}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            {getZoneLabel(zoningData.luCode)}
          </p>
          {zoningData.community && (
            <p className="text-sm">
              <span className="text-muted-foreground">Community:</span>{' '}
              <span className="font-medium">{zoningData.community}</span>
            </p>
          )}
        </CardContent>
      </Card>

      {/* Direct Control Warning */}
      {result.isDirectControl && (
        <div className="warning-box mb-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium mb-1">Manual Review Needed</p>
            <p className="text-sm opacity-90">
              Direct Control districts have unique, site-specific bylaws that require 
              individual assessment by the City of Calgary.
            </p>
          </div>
        </div>
      )}

      {/* Feasibility Results */}
      <Card className="mb-4 shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Development Options</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <FeatureRow
            icon={Home}
            label="Backyard Suite"
            status={result.backyardSuite.status}
            description={result.backyardSuite.description}
          />
          <Separator />
          <FeatureRow
            icon={Layers}
            label="Secondary Suite"
            status={result.secondarySuite.status}
            description={result.secondarySuite.description}
          />
          <Separator />
          <FeatureRow
            icon={Building}
            label="Rowhouse (R-CG)"
            status={result.rowhouse.status}
            description={result.rowhouse.description}
          />
        </CardContent>
      </Card>

      {/* Building Specs */}
      <Card className="mb-4 shadow-card">
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <Ruler className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Maximum Building Height</p>
              <p className="text-lg font-semibold text-foreground">{result.maxHeight}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      {result.notes.length > 0 && (
        <Card className="mb-4 shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Info className="w-4 h-4" />
              Additional Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-2">
              {result.notes.map((note, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-1">•</span>
                  {note}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* CTA */}
      <Button 
        onClick={handleGeneratePDF}
        className="w-full h-11"
        variant="default"
      >
        <FileText className="w-4 h-4 mr-2" />
        Generate PDF Report
      </Button>

      <p className="mt-3 text-xs text-center text-muted-foreground">
        This analysis is for informational purposes only. Always verify with the City of Calgary.
      </p>
    </div>
  );
}
