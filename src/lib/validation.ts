// Validation utilities for zoning data and user inputs

import type { ZoningData } from '@/types/zoning';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateZoningData(data: ZoningData): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!data.luCode || data.luCode.trim() === '') {
    errors.push('Zoning code (luCode) is required');
  }

  if (!data.community || data.community.trim() === '') {
    errors.push('Community name is required');
  }

  // Validate zoning code format
  if (data.luCode) {
    const validPrefixes = ['R-', 'M-', 'C-', 'I-', 'DC', 'S-'];
    const hasValidPrefix = validPrefixes.some(prefix => 
      data.luCode.toUpperCase().startsWith(prefix)
    );

    if (!hasValidPrefix) {
      warnings.push(`Zoning code "${data.luCode}" may not be a standard Calgary zone`);
    }
  }

  // Validate address format if provided
  if (data.address && data.address.length < 5) {
    warnings.push('Address seems too short, may be incomplete');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateLotDimensions(
  lotSize: number,
  lotWidth: number,
  lotDepth: number,
  luCode: string
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const upperCode = luCode.toUpperCase();

  // Minimum requirements by zone
  const requirements: Record<string, { minSize: number; minWidth: number; minDepth: number }> = {
    'R-C1': { minSize: 360, minWidth: 12, minDepth: 30 },
    'R-C2': { minSize: 360, minWidth: 12, minDepth: 30 },
    'R-CG': { minSize: 360, minWidth: 12, minDepth: 30 },
    'R-G': { minSize: 450, minWidth: 15, minDepth: 30 },
  };

  const req = requirements[upperCode];

  if (req) {
    if (lotSize < req.minSize) {
      errors.push(`Lot size ${lotSize}m² is below minimum ${req.minSize}m² for ${upperCode}`);
    }

    if (lotWidth < req.minWidth) {
      errors.push(`Lot width ${lotWidth}m is below minimum ${req.minWidth}m for ${upperCode}`);
    }

    if (lotDepth < req.minDepth) {
      errors.push(`Lot depth ${lotDepth}m is below minimum ${req.minDepth}m for ${upperCode}`);
    }

    // Warnings for marginal lots
    if (lotSize < req.minSize * 1.1) {
      warnings.push('Lot size is close to minimum - limited development flexibility');
    }

    if (lotWidth < req.minWidth * 1.1) {
      warnings.push('Lot width is close to minimum - may affect design options');
    }
  }

  // General validations
  if (lotSize <= 0 || lotWidth <= 0 || lotDepth <= 0) {
    errors.push('Lot dimensions must be positive numbers');
  }

  if (lotSize > 10000) {
    warnings.push('Unusually large lot - verify measurements');
  }

  if (lotWidth > 100 || lotDepth > 100) {
    warnings.push('Unusually large dimensions - verify measurements');
  }

  // Check if dimensions are consistent
  const calculatedSize = lotWidth * lotDepth;
  if (Math.abs(calculatedSize - lotSize) > lotSize * 0.2) {
    warnings.push('Lot size does not match width × depth - lot may be irregular shape');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateAddress(address: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!address || address.trim() === '') {
    errors.push('Address is required');
    return { isValid: false, errors, warnings };
  }

  // Basic address format checks
  const hasNumber = /\d/.test(address);
  if (!hasNumber) {
    warnings.push('Address should typically include a street number');
  }

  // Check for Calgary-specific patterns
  const hasCalgaryKeywords = /calgary|alberta|ab|t\d[a-z]/i.test(address);
  if (!hasCalgaryKeywords) {
    warnings.push('Address may not be in Calgary - add "Calgary, AB" for better results');
  }

  // Check minimum length
  if (address.length < 5) {
    errors.push('Address is too short');
  }

  // Check for common typos
  if (/\s{2,}/.test(address)) {
    warnings.push('Address contains multiple spaces - may be a typo');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateMapboxToken(token: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!token || token.trim() === '') {
    errors.push('Mapbox token is required');
    return { isValid: false, errors, warnings };
  }

  // Mapbox tokens start with 'pk.' for public or 'sk.' for secret
  if (!token.startsWith('pk.') && !token.startsWith('sk.')) {
    errors.push('Invalid Mapbox token format - should start with "pk." or "sk."');
  }

  // Check token length (typical Mapbox tokens are 80+ characters)
  if (token.length < 50) {
    warnings.push('Token seems too short - verify it is complete');
  }

  // Warn about secret tokens (should use public tokens in browser)
  if (token.startsWith('sk.')) {
    warnings.push('Using secret token in browser is not recommended - use public token (pk.)');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

export function sanitizeInput(input: string): string {
  // Remove potentially dangerous characters
  return input
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatArea(squareMeters: number): string {
  return `${squareMeters.toLocaleString('en-CA')}m²`;
}

export function formatDistance(meters: number): string {
  return `${meters.toLocaleString('en-CA', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}m`;
}

export function formatPercentage(value: number): string {
  return `${value.toLocaleString('en-CA', { minimumFractionDigits: 0, maximumFractionDigits: 1 })}%`;
}
