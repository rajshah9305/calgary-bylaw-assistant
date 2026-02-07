// Advanced zoning analysis with detailed calculations and recommendations

import type { ZoningData } from '@/types/zoning';

export interface LotRequirements {
  minLotSize: number; // square meters
  minLotWidth: number; // meters
  minLotDepth: number; // meters
  maxSiteCoverage: number; // percentage
  maxFloorAreaRatio: number; // FAR
}

export interface SetbackRequirements {
  front: number; // meters
  rear: number; // meters
  side: number; // meters
  garage: number; // meters from lane
}

export interface DevelopmentCosts {
  developmentPermit: { min: number; max: number };
  buildingPermit: { min: number; max: number };
  landUseAmendment?: { min: number; max: number };
  estimatedTimeline: string;
}

export interface DetailedAnalysis {
  lotRequirements: LotRequirements;
  setbacks: SetbackRequirements;
  parkingRequirements: {
    backyardSuite: number;
    secondarySuite: number;
    rowhouse: number;
  };
  costs: DevelopmentCosts;
  opportunities: string[];
  risks: string[];
  nextSteps: string[];
}

export function getDetailedAnalysis(data: ZoningData): DetailedAnalysis {
  const { luCode } = data;
  const upperCode = luCode.toUpperCase();

  // R-C1 Analysis
  if (upperCode === 'R-C1') {
    return {
      lotRequirements: {
        minLotSize: 360,
        minLotWidth: 12,
        minLotDepth: 30,
        maxSiteCoverage: 45,
        maxFloorAreaRatio: 0.5,
      },
      setbacks: {
        front: 6,
        rear: 7.5,
        side: 1.2,
        garage: 0.6,
      },
      parkingRequirements: {
        backyardSuite: 1,
        secondarySuite: 1,
        rowhouse: 0,
      },
      costs: {
        developmentPermit: { min: 500, max: 2000 },
        buildingPermit: { min: 3000, max: 8000 },
        estimatedTimeline: '3-6 months',
      },
      opportunities: [
        'Secondary suite adds rental income potential',
        'Backyard suite possible with discretionary approval',
        'Consider rezoning to R-CG for more flexibility',
      ],
      risks: [
        'Discretionary uses require neighbor notification',
        'Limited density compared to R-CG',
        'May face community opposition for infill',
      ],
      nextSteps: [
        'Verify lot dimensions meet minimum requirements',
        'Check if property is in heritage area',
        'Pre-application meeting with City planners recommended',
      ],
    };
  }

  // R-C2 Analysis
  if (upperCode === 'R-C2') {
    return {
      lotRequirements: {
        minLotSize: 360,
        minLotWidth: 12,
        minLotDepth: 30,
        maxSiteCoverage: 50,
        maxFloorAreaRatio: 0.6,
      },
      setbacks: {
        front: 6,
        rear: 7.5,
        side: 1.2,
        garage: 0.6,
      },
      parkingRequirements: {
        backyardSuite: 1,
        secondarySuite: 1,
        rowhouse: 0,
      },
      costs: {
        developmentPermit: { min: 500, max: 2000 },
        buildingPermit: { min: 3000, max: 10000 },
        estimatedTimeline: '3-6 months',
      },
      opportunities: [
        'Duplex development permitted',
        'Higher site coverage than R-C1',
        'Secondary suites add value',
      ],
      risks: [
        'Discretionary approval needed for suites',
        'Parking requirements can be challenging',
        'Neighbor notification required',
      ],
      nextSteps: [
        'Measure existing lot dimensions',
        'Review parking availability',
        'Consider professional design consultation',
      ],
    };
  }

  // R-CG Analysis (Most flexible)
  if (upperCode === 'R-CG') {
    return {
      lotRequirements: {
        minLotSize: 360,
        minLotWidth: 12,
        minLotDepth: 30,
        maxSiteCoverage: 50,
        maxFloorAreaRatio: 0.7,
      },
      setbacks: {
        front: 4.5,
        rear: 6,
        side: 1.2,
        garage: 0.6,
      },
      parkingRequirements: {
        backyardSuite: 1,
        secondarySuite: 0,
        rowhouse: 1,
      },
      costs: {
        developmentPermit: { min: 500, max: 1500 },
        buildingPermit: { min: 5000, max: 15000 },
        estimatedTimeline: '2-4 months',
      },
      opportunities: [
        'Up to 4 units permitted on standard lot',
        'Rowhouse development highly feasible',
        'Suite amnesty fees waived until 2026',
        'Reduced parking requirements',
        'Fastest approval timeline',
      ],
      risks: [
        'Higher construction costs for multi-unit',
        'Must meet design guidelines',
        'Utility upgrades may be required',
      ],
      nextSteps: [
        'Engage architect for site plan',
        'Review utility capacity',
        'Apply for development permit',
        'Consider pre-sale to offset costs',
      ],
    };
  }

  // R-G Analysis
  if (upperCode.startsWith('R-G')) {
    return {
      lotRequirements: {
        minLotSize: 450,
        minLotWidth: 15,
        minLotDepth: 30,
        maxSiteCoverage: 45,
        maxFloorAreaRatio: 0.8,
      },
      setbacks: {
        front: 4.5,
        rear: 6,
        side: 1.5,
        garage: 0.6,
      },
      parkingRequirements: {
        backyardSuite: 1,
        secondarySuite: 0,
        rowhouse: 1,
      },
      costs: {
        developmentPermit: { min: 800, max: 2500 },
        buildingPermit: { min: 6000, max: 20000 },
        estimatedTimeline: '3-5 months',
      },
      opportunities: [
        'Multi-unit residential permitted',
        'Higher FAR allows more density',
        'Row housing and townhomes feasible',
      ],
      risks: [
        'Larger lot requirements',
        'More complex approval process',
        'Higher development costs',
      ],
      nextSteps: [
        'Verify lot meets minimum size',
        'Hire experienced developer/architect',
        'Review market demand for multi-unit',
      ],
    };
  }

  // Multi-Residential
  if (upperCode.startsWith('M-')) {
    return {
      lotRequirements: {
        minLotSize: 800,
        minLotWidth: 20,
        minLotDepth: 40,
        maxSiteCoverage: 50,
        maxFloorAreaRatio: 1.5,
      },
      setbacks: {
        front: 6,
        rear: 7.5,
        side: 2.5,
        garage: 1.5,
      },
      parkingRequirements: {
        backyardSuite: 1,
        secondarySuite: 1,
        rowhouse: 1.25,
      },
      costs: {
        developmentPermit: { min: 2000, max: 5000 },
        buildingPermit: { min: 10000, max: 50000 },
        estimatedTimeline: '6-12 months',
      },
      opportunities: [
        'High-density development potential',
        'Multiple dwelling units permitted',
        'Strong rental market demand',
      ],
      risks: [
        'Complex approval process',
        'Significant capital requirements',
        'Traffic and parking concerns',
      ],
      nextSteps: [
        'Conduct feasibility study',
        'Engage development team',
        'Review financing options',
      ],
    };
  }

  // Default/Unknown
  return {
    lotRequirements: {
      minLotSize: 0,
      minLotWidth: 0,
      minLotDepth: 0,
      maxSiteCoverage: 0,
      maxFloorAreaRatio: 0,
    },
    setbacks: {
      front: 0,
      rear: 0,
      side: 0,
      garage: 0,
    },
    parkingRequirements: {
      backyardSuite: 0,
      secondarySuite: 0,
      rowhouse: 0,
    },
    costs: {
      developmentPermit: { min: 0, max: 0 },
      buildingPermit: { min: 0, max: 0 },
      estimatedTimeline: 'Unknown',
    },
    opportunities: ['Contact City of Calgary for zone-specific information'],
    risks: ['Unknown zone requirements'],
    nextSteps: ['Schedule consultation with City planning department'],
  };
}

export function calculateMaxUnits(lotSize: number, luCode: string): number {
  const upperCode = luCode.toUpperCase();
  
  if (upperCode === 'R-C1') return 2; // Main + secondary suite
  if (upperCode === 'R-C2') return 3; // Duplex + suite
  if (upperCode === 'R-CG') return 4; // Rowhouse or main + suite + backyard suite
  if (upperCode.startsWith('R-G')) return Math.floor(lotSize / 100); // Approx 1 unit per 100m²
  if (upperCode.startsWith('M-')) return Math.floor(lotSize / 80); // Higher density
  
  return 1;
}

export function estimateConstructionCost(developmentType: string, units: number): { min: number; max: number } {
  const costs = {
    'backyard-suite': { min: 150000, max: 250000 },
    'secondary-suite': { min: 50000, max: 100000 },
    'rowhouse': { min: 300000, max: 500000 },
    'duplex': { min: 400000, max: 700000 },
  };

  const baseCost = costs[developmentType as keyof typeof costs] || { min: 100000, max: 300000 };
  
  return {
    min: baseCost.min * units,
    max: baseCost.max * units,
  };
}
