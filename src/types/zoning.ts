export interface ZoningData {
  luCode: string;
  community: string;
  address?: string;
  parcelId?: string;
}

export interface FeasibilityResult {
  backyardSuite: {
    status: 'permitted' | 'likely' | 'prohibited' | 'manual-review';
    description: string;
  };
  secondarySuite: {
    status: 'permitted' | 'likely' | 'prohibited' | 'manual-review';
    description: string;
  };
  rowhouse: {
    status: 'permitted' | 'likely' | 'prohibited' | 'manual-review';
    description: string;
  };
  maxHeight: string;
  notes: string[];
  isDirectControl: boolean;
}

export interface ZoningFeature {
  type: 'Feature';
  properties: {
    lu_code?: string;
    land_use_designation?: string;
    [key: string]: unknown;
  };
  geometry: {
    type: string;
    coordinates: unknown;
  };
}

export interface CommunityFeature {
  type: 'Feature';
  properties: {
    name?: string;
    class?: string;
    [key: string]: unknown;
  };
  geometry: {
    type: string;
    coordinates: unknown;
  };
}
