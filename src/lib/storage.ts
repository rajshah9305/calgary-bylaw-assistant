// LocalStorage utilities for search history and bookmarks

import type { ZoningData } from '@/types/zoning';

const SEARCH_HISTORY_KEY = 'bylaw-bot-search-history';
const BOOKMARKS_KEY = 'bylaw-bot-bookmarks';
const MAX_HISTORY_ITEMS = 10;

export interface SearchHistoryItem {
  id: string;
  address: string;
  luCode: string;
  community: string;
  timestamp: number;
}

export interface Bookmark {
  id: string;
  zoningData: ZoningData;
  note?: string;
  timestamp: number;
}

// Search History
export function getSearchHistory(): SearchHistoryItem[] {
  try {
    const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addToSearchHistory(data: ZoningData): void {
  try {
    const history = getSearchHistory();
    const newItem: SearchHistoryItem = {
      id: `${data.luCode}-${data.community}-${Date.now()}`,
      address: data.address || `${data.community} - ${data.luCode}`,
      luCode: data.luCode,
      community: data.community,
      timestamp: Date.now(),
    };

    // Remove duplicates based on address
    const filtered = history.filter(
      item => item.address.toLowerCase() !== newItem.address.toLowerCase()
    );

    // Add new item at the beginning
    const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save search history:', error);
  }
}

export function clearSearchHistory(): void {
  try {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear search history:', error);
  }
}

// Bookmarks
export function getBookmarks(): Bookmark[] {
  try {
    const stored = localStorage.getItem(BOOKMARKS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addBookmark(data: ZoningData, note?: string): void {
  try {
    const bookmarks = getBookmarks();
    const newBookmark: Bookmark = {
      id: `bookmark-${Date.now()}`,
      zoningData: data,
      note,
      timestamp: Date.now(),
    };

    const updated = [newBookmark, ...bookmarks];
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save bookmark:', error);
  }
}

export function removeBookmark(id: string): void {
  try {
    const bookmarks = getBookmarks();
    const updated = bookmarks.filter(b => b.id !== id);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to remove bookmark:', error);
  }
}

export function isBookmarked(data: ZoningData): boolean {
  const bookmarks = getBookmarks();
  return bookmarks.some(
    b => b.zoningData.luCode === data.luCode && 
         b.zoningData.community === data.community
  );
}
