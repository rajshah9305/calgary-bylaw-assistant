// Compare multiple properties or zoning scenarios

import type { ZoningData, FeasibilityResult } from '@/types/zoning';
import { analyzeZoning } from './zoning-analysis';
import { getDetailedAnalysis, type DetailedAnalysis } from './advanced-analysis';

export interface ComparisonItem {
  id: string;
  zoningData: ZoningData;
  feasibility: FeasibilityResult;
  detailedAnalysis: DetailedAnalysis;
  score: number; // 0-100 development potential score
}

export interface ComparisonResult {
  items: ComparisonItem[];
  recommendation: string;
  bestForBackyardSuite: string | null;
  bestForRowhouse: string | null;
  bestOverall: string | null;
}

export function compareProperties(properties: ZoningData[]): ComparisonResult {
  const items: ComparisonItem[] = properties.map((data, index) => {
    const feasibility = analyzeZoning(data);
    const detailedAnalysis = getDetailedAnalysis(data);
    const score = calculateDevelopmentScore(feasibility, detailedAnalysis);

    return {
      id: `property-${index}`,
      zoningData: data,
      feasibility,
      detailedAnalysis,
      score,
    };
  });

  // Sort by score
  items.sort((a, b) => b.score - a.score);

  // Find best for specific uses
  const bestForBackyardSuite = findBestFor(items, 'backyardSuite');
  const bestForRowhouse = findBestFor(items, 'rowhouse');
  const bestOverall = items[0]?.id || null;

  const recommendation = generateRecommendation(items);

  return {
    items,
    recommendation,
    bestForBackyardSuite,
    bestForRowhouse,
    bestOverall,
  };
}

function calculateDevelopmentScore(
  feasibility: FeasibilityResult,
  analysis: DetailedAnalysis
): number {
  let score = 0;

  // Feasibility scoring (40 points)
  const statusPoints = { permitted: 15, likely: 10, 'manual-review': 5, prohibited: 0 };
  score += statusPoints[feasibility.backyardSuite.status] || 0;
  score += statusPoints[feasibility.secondarySuite.status] || 0;
  score += statusPoints[feasibility.rowhouse.status] || 0;

  // FAR scoring (20 points)
  const far = analysis.lotRequirements.maxFloorAreaRatio;
  score += Math.min(far * 25, 20);

  // Site coverage scoring (15 points)
  const coverage = analysis.lotRequirements.maxSiteCoverage;
  score += Math.min(coverage / 3.33, 15);

  // Cost efficiency (15 points) - lower permit costs = higher score
  const avgPermitCost = (analysis.costs.developmentPermit.max + analysis.costs.buildingPermit.max) / 2;
  score += Math.max(15 - (avgPermitCost / 1000), 0);

  // Opportunities vs risks (10 points)
  const opportunityScore = Math.min(analysis.opportunities.length * 2, 7);
  const riskPenalty = Math.min(analysis.risks.length * 1, 3);
  score += opportunityScore - riskPenalty;

  return Math.round(Math.min(score, 100));
}

function findBestFor(items: ComparisonItem[], useType: 'backyardSuite' | 'rowhouse'): string | null {
  const filtered = items.filter(item => {
    const status = item.feasibility[useType].status;
    return status === 'permitted' || status === 'likely';
  });

  if (filtered.length === 0) return null;

  // Sort by score and return best
  filtered.sort((a, b) => b.score - a.score);
  return filtered[0].id;
}

function generateRecommendation(items: ComparisonItem[]): string {
  if (items.length === 0) return 'No properties to compare';
  if (items.length === 1) return 'Single property analysis completed';

  const best = items[0];
  const worst = items[items.length - 1];
  const scoreDiff = best.score - worst.score;

  if (scoreDiff < 10) {
    return 'All properties have similar development potential. Choose based on location and price.';
  }

  if (best.zoningData.luCode.toUpperCase() === 'R-CG') {
    return `${best.zoningData.address || best.zoningData.community} (R-CG) offers the best development flexibility with up to 4 units permitted.`;
  }

  return `${best.zoningData.address || best.zoningData.community} scores highest (${best.score}/100) for development potential.`;
}

export function exportComparison(comparison: ComparisonResult): string {
  let output = 'PROPERTY COMPARISON REPORT\n';
  output += '='.repeat(50) + '\n\n';

  comparison.items.forEach((item, index) => {
    output += `${index + 1}. ${item.zoningData.address || item.zoningData.community}\n`;
    output += `   Zone: ${item.zoningData.luCode}\n`;
    output += `   Score: ${item.score}/100\n`;
    output += `   Backyard Suite: ${item.feasibility.backyardSuite.status}\n`;
    output += `   Secondary Suite: ${item.feasibility.secondarySuite.status}\n`;
    output += `   Rowhouse: ${item.feasibility.rowhouse.status}\n`;
    output += `   Max FAR: ${item.detailedAnalysis.lotRequirements.maxFloorAreaRatio}\n`;
    output += '\n';
  });

  output += `\nRECOMMENDATION: ${comparison.recommendation}\n`;

  return output;
}
