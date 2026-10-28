import { DiagnosticState } from '../types';

const DIAGNOSTIC_KEY = 'drtanutri_diagnostic_state';
const LAB_PREFS_KEY = 'drtanutri_lab_prefs';

export function saveDiagnosticState(state: DiagnosticState): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(DIAGNOSTIC_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Unable to save to sessionStorage', e);
  }
}

export function loadDiagnosticState(): DiagnosticState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(DIAGNOSTIC_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function clearDiagnosticState(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(DIAGNOSTIC_KEY);
}
