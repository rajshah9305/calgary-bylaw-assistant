import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tooltip } from '@/components/Tooltip';
import type { DetailedAnalysis } from '@/lib/advanced-analysis';
import { 
  Home, 
  Ruler, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

interface DetailedAnalysisPanelProps {
  analysis: DetailedAnalysis;
}

export function DetailedAnalysisPanel({ analysis }: DetailedAnalysisPanelProps) {
  return (
    <div className="space-y-4 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Ruler className="w-5 h-5 text-primary" />
          Lot Requirements
          <Tooltip content="Minimum size and dimensions your property needs to meet">
            <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
          </Tooltip>
        </h3>
        <Card className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Tooltip content="Minimum total area of your lot">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  Min Lot Size <HelpCircle className="w-3 h-3" />
                </p>
              </Tooltip>
              <p className="text-lg font-semibold">{analysis.lotRequirements.minLotSize}m²</p>
            </div>
            <div>
              <Tooltip content="Minimum width of your lot (front to back)">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  Min Width <HelpCircle className="w-3 h-3" />
                </p>
              </Tooltip>
              <p className="text-lg font-semibold">{analysis.lotRequirements.minLotWidth}m</p>
            </div>
            <div>
              <Tooltip content="Maximum % of your lot you can cover with buildings">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  Max Coverage <HelpCircle className="w-3 h-3" />
                </p>
              </Tooltip>
              <p className="text-lg font-semibold">{analysis.lotRequirements.maxSiteCoverage}%</p>
            </div>
            <div>
              <Tooltip content="Floor Area Ratio - total floor area divided by lot size">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  Max FAR <HelpCircle className="w-3 h-3" />
                </p>
              </Tooltip>
              <p className="text-lg font-semibold">{analysis.lotRequirements.maxFloorAreaRatio}</p>
            </div>
          </div>
        </Card>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Home className="w-5 h-5 text-primary" />
          Setback Requirements
          <Tooltip content="How far your building must be from property lines">
            <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
          </Tooltip>
        </h3>
        <Card className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Front (from street)</p>
              <p className="text-lg font-semibold">{analysis.setbacks.front}m</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rear (back yard)</p>
              <p className="text-lg font-semibold">{analysis.setbacks.rear}m</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Side (neighbors)</p>
              <p className="text-lg font-semibold">{analysis.setbacks.side}m</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Garage (from lane)</p>
              <p className="text-lg font-semibold">{analysis.setbacks.garage}m</p>
            </div>
          </div>
        </Card>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          Estimated Costs & Timeline
          <Tooltip content="Approximate costs and time to get permits (not including construction)">
            <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
          </Tooltip>
        </h3>
        <Card className="p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Development Permit</span>
            <span className="font-semibold">
              ${analysis.costs.developmentPermit.min.toLocaleString()} - 
              ${analysis.costs.developmentPermit.max.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Building Permit</span>
            <span className="font-semibold">
              ${analysis.costs.buildingPermit.min.toLocaleString()} - 
              ${analysis.costs.buildingPermit.max.toLocaleString()}
            </span>
          </div>
          {analysis.costs.landUseAmendment && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Land Use Amendment</span>
              <span className="font-semibold">
                ${analysis.costs.landUseAmendment.min.toLocaleString()} - 
                ${analysis.costs.landUseAmendment.max.toLocaleString()}
              </span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Approval Timeline
            </span>
            <span className="font-semibold">{analysis.costs.estimatedTimeline}</span>
          </div>
          <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-800">
            💡 These are permit costs only. Construction costs are separate.
          </div>
        </Card>
      </div>

      {analysis.opportunities.length > 0 && (
        <>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Opportunities
            </h3>
            <Card className="p-4">
              <ul className="space-y-2">
                {analysis.opportunities.map((opp, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{opp}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </>
      )}

      {analysis.risks.length > 0 && (
        <>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Risks & Considerations
            </h3>
            <Card className="p-4">
              <ul className="space-y-2">
                {analysis.risks.map((risk, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </>
      )}

      {analysis.nextSteps.length > 0 && (
        <>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
            <Card className="p-4">
              <ol className="space-y-2 list-decimal list-inside">
                {analysis.nextSteps.map((step, index) => (
                  <li key={index} className="text-sm">{step}</li>
                ))}
              </ol>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
