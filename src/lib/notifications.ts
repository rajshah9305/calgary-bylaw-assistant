// Notification system for zoning changes and updates

export interface ZoningAlert {
  id: string;
  type: 'rezoning' | 'bylaw-change' | 'permit-update' | 'community-plan';
  title: string;
  description: string;
  affectedZones: string[];
  affectedCommunities: string[];
  effectiveDate: string;
  priority: 'high' | 'medium' | 'low';
  url?: string;
  timestamp: number;
}

export interface NotificationPreferences {
  zones: string[];
  communities: string[];
  alertTypes: Array<ZoningAlert['type']>;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

const ALERTS_KEY = 'bylaw-bot-alerts';
const PREFERENCES_KEY = 'bylaw-bot-notification-prefs';
const DISMISSED_KEY = 'bylaw-bot-dismissed-alerts';

// Mock alerts - in production, fetch from City API or RSS feed
export function getMockAlerts(): ZoningAlert[] {
  return [
    {
      id: 'alert-001',
      type: 'bylaw-change',
      title: 'Suite Amnesty Program Extended',
      description: 'The City has extended the secondary suite amnesty fee waiver until December 2026.',
      affectedZones: ['R-C1', 'R-C2', 'R-CG', 'R-G'],
      affectedCommunities: ['All'],
      effectiveDate: '2026-01-01',
      priority: 'high',
      url: 'https://www.calgary.ca/planning/secondary-suites',
      timestamp: Date.now() - 86400000, // 1 day ago
    },
    {
      id: 'alert-002',
      type: 'rezoning',
      title: 'Blanket Rezoning Initiative Update',
      description: 'Council approved blanket rezoning for select communities to R-CG.',
      affectedZones: ['R-C1', 'R-C2'],
      affectedCommunities: ['Beltline', 'Inglewood', 'Kensington'],
      effectiveDate: '2026-03-01',
      priority: 'high',
      url: 'https://www.calgary.ca/planning/blanket-rezoning',
      timestamp: Date.now() - 172800000, // 2 days ago
    },
    {
      id: 'alert-003',
      type: 'permit-update',
      title: 'New Digital Permit Portal',
      description: 'Submit development permits online through the new portal.',
      affectedZones: ['All'],
      affectedCommunities: ['All'],
      effectiveDate: '2026-02-15',
      priority: 'medium',
      url: 'https://www.calgary.ca/permits',
      timestamp: Date.now() - 259200000, // 3 days ago
    },
  ];
}

export function getRelevantAlerts(
  zoningData: ZoningData | null,
  preferences?: NotificationPreferences
): ZoningAlert[] {
  const allAlerts = getMockAlerts();
  const dismissed = getDismissedAlerts();

  let filtered = allAlerts.filter(alert => !dismissed.includes(alert.id));

  if (zoningData) {
    filtered = filtered.filter(alert => {
      const matchesZone = alert.affectedZones.includes('All') || 
                         alert.affectedZones.includes(zoningData.luCode.toUpperCase());
      const matchesCommunity = alert.affectedCommunities.includes('All') || 
                              alert.affectedCommunities.includes(zoningData.community);
      return matchesZone || matchesCommunity;
    });
  }

  if (preferences) {
    filtered = filtered.filter(alert => 
      preferences.alertTypes.includes(alert.type)
    );
  }

  return filtered.sort((a, b) => {
    // Sort by priority then timestamp
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return b.timestamp - a.timestamp;
  });
}

export function dismissAlert(alertId: string): void {
  const dismissed = getDismissedAlerts();
  if (!dismissed.includes(alertId)) {
    dismissed.push(alertId);
    localStorage.setItem(DISMISSED_KEY, JSON.stringify(dismissed));
  }
}

export function getDismissedAlerts(): string[] {
  try {
    const stored = localStorage.getItem(DISMISSED_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function getNotificationPreferences(): NotificationPreferences {
  try {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    return stored ? JSON.parse(stored) : getDefaultPreferences();
  } catch {
    return getDefaultPreferences();
  }
}

export function saveNotificationPreferences(prefs: NotificationPreferences): void {
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
}

function getDefaultPreferences(): NotificationPreferences {
  return {
    zones: [],
    communities: [],
    alertTypes: ['rezoning', 'bylaw-change', 'permit-update', 'community-plan'],
    emailNotifications: false,
    pushNotifications: true,
  };
}

// Import ZoningData type
import type { ZoningData } from '@/types/zoning';
