import type { ZoningData, FeasibilityResult } from '@/types/zoning';

export function analyzeZoning(data: ZoningData): FeasibilityResult {
  const { luCode } = data;
  const upperCode = luCode.toUpperCase();

  // Check for Direct Control districts
  if (upperCode.startsWith('DC')) {
    return {
      backyardSuite: {
        status: 'manual-review',
        description: 'Requires site-specific review',
      },
      secondarySuite: {
        status: 'manual-review',
        description: 'Requires site-specific review',
      },
      rowhouse: {
        status: 'manual-review',
        description: 'Requires site-specific review',
      },
      maxHeight: 'Varies by bylaw',
      notes: [
        'Direct Control districts have unique, site-specific bylaws.',
        'Contact the City of Calgary Planning Department for detailed requirements.',
      ],
      isDirectControl: true,
    };
  }

  // R-C1 and R-C2 zones
  if (upperCode === 'R-C1' || upperCode === 'R-C2') {
    return {
      backyardSuite: {
        status: 'likely',
        description: 'Discretionary Use - requires development permit approval',
      },
      secondarySuite: {
        status: 'likely',
        description: 'Discretionary Use - subject to development permit',
      },
      rowhouse: {
        status: 'prohibited',
        description: 'Not permitted - requires land use amendment (rezoning)',
      },
      maxHeight: '10m',
      notes: [
        'Secondary suites are a discretionary use in this zone.',
        'Backyard suites require development permit approval.',
        'Consider rezoning to R-CG for additional development options.',
      ],
      isDirectControl: false,
    };
  }

  // R-CG zone (Contextual Grade-Oriented)
  if (upperCode === 'R-CG') {
    return {
      backyardSuite: {
        status: 'permitted',
        description: 'Permitted Use - meets base bylaw requirements',
      },
      secondarySuite: {
        status: 'permitted',
        description: 'Permitted Use - aligns with R-CG regulations',
      },
      rowhouse: {
        status: 'permitted',
        description: 'Permitted Use - up to 4 dwelling units',
      },
      maxHeight: '11m',
      notes: [
        'R-CG allows for the most flexibility in residential development.',
        'Up to 4 dwelling units permitted on a standard lot.',
        'Suite amnesty fees are currently waived until 2026.',
      ],
      isDirectControl: false,
    };
  }

  // R-G zone (Grade-Oriented)
  if (upperCode === 'R-G' || upperCode.startsWith('R-G')) {
    return {
      backyardSuite: {
        status: 'permitted',
        description: 'Permitted Use - aligns with R-G regulations',
      },
      secondarySuite: {
        status: 'permitted',
        description: 'Permitted Use - aligns with R-G regulations',
      },
      rowhouse: {
        status: 'permitted',
        description: 'Permitted Use - row housing allowed',
      },
      maxHeight: '11m',
      notes: [
        'R-G zones support multi-unit residential development.',
        'Review specific lot coverage and setback requirements.',
      ],
      isDirectControl: false,
    };
  }

  // M-C zones (Multi-Residential)
  if (upperCode.startsWith('M-C') || upperCode.startsWith('M-')) {
    return {
      backyardSuite: {
        status: 'likely',
        description: 'May be permitted - check specific M-district rules',
      },
      secondarySuite: {
        status: 'permitted',
        description: 'Generally permitted in multi-residential zones',
      },
      rowhouse: {
        status: 'permitted',
        description: 'Permitted - multi-unit housing allowed',
      },
      maxHeight: '14m-23m (varies)',
      notes: [
        'Multi-residential zones have varying height limits.',
        'Check specific bylaw for density and FAR requirements.',
      ],
      isDirectControl: false,
    };
  }

  // Commercial zones
  if (upperCode.startsWith('C-')) {
    return {
      backyardSuite: {
        status: 'prohibited',
        description: 'Not applicable in commercial zones',
      },
      secondarySuite: {
        status: 'likely',
        description: 'May be permitted as mixed-use development',
      },
      rowhouse: {
        status: 'prohibited',
        description: 'Not permitted in commercial zones',
      },
      maxHeight: 'Varies by district',
      notes: [
        'Commercial zones may allow residential above ground floor.',
        'Consider mixed-use development options.',
      ],
      isDirectControl: false,
    };
  }

  // Default/Unknown zones
  return {
    backyardSuite: {
      status: 'manual-review',
      description: 'Unknown zone type - manual review required',
    },
    secondarySuite: {
      status: 'manual-review',
      description: 'Unknown zone type - manual review required',
    },
    rowhouse: {
      status: 'manual-review',
      description: 'Unknown zone type - manual review required',
    },
    maxHeight: 'Unknown',
    notes: [
      `Zone "${luCode}" requires manual verification.`,
      'Contact the City of Calgary for specific bylaws.',
    ],
    isDirectControl: false,
  };
}

export function getZoneColor(luCode: string): string {
  const code = luCode?.toUpperCase() || '';
  
  if (code.startsWith('DC')) return '#F59E0B'; // Amber for Direct Control
  if (code === 'R-C1') return '#93C5FD'; // Light blue
  if (code === 'R-C2') return '#60A5FA'; // Blue
  if (code === 'R-CG') return '#34D399'; // Green
  if (code.startsWith('R-G')) return '#10B981'; // Emerald
  if (code.startsWith('M-')) return '#8B5CF6'; // Purple
  if (code.startsWith('C-')) return '#F472B6'; // Pink
  if (code.startsWith('I-')) return '#6B7280'; // Gray for Industrial
  
  return '#CBD5E1'; // Slate for unknown
}

export function getZoneLabel(luCode: string): string {
  const code = luCode?.toUpperCase() || '';
  
  const labels: Record<string, string> = {
    'R-C1': 'Residential - Contextual One Dwelling',
    'R-C2': 'Residential - Contextual Two Dwelling',
    'R-CG': 'Residential - Grade-Oriented Infill',
    'R-G': 'Residential - Grade-Oriented',
  };

  if (code.startsWith('DC')) return 'Direct Control District';
  if (code.startsWith('M-C')) return 'Multi-Residential - Contextual';
  if (code.startsWith('M-')) return 'Multi-Residential';
  if (code.startsWith('C-')) return 'Commercial';
  if (code.startsWith('I-')) return 'Industrial';

  return labels[code] || code;
}
