import { DiagnosticState } from '../types';

const DIAGNOSTIC_KEY = 'drtanutri_diagnostic_state';

export function safeGetSession(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return sessionStorage.getItem(key);
    }
  } catch (e) {
    // Graceful fallback for iframes with blocked storage or incognito mode
    console.warn('[Storage] sessionStorage blocked or unavailable:', key);
  }
  return null;
}

export function safeSetSession(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem(key, value);
    }
  } catch (e) {
    console.warn('[Storage] Unable to write to sessionStorage:', key);
  }
}

export function safeRemoveSession(key: string): void {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.removeItem(key);
    }
  } catch (e) {
    console.warn('[Storage] Unable to remove from sessionStorage:', key);
  }
}

export function saveDiagnosticState(state: DiagnosticState): void {
  safeSetSession(DIAGNOSTIC_KEY, JSON.stringify(state));
}

export function loadDiagnosticState(): DiagnosticState | null {
  const raw = safeGetSession(DIAGNOSTIC_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearDiagnosticState(): void {
  safeRemoveSession(DIAGNOSTIC_KEY);
}
