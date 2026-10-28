import { AnalyticsEvent } from '../types';

type Listener = (events: AnalyticsEvent[]) => void;

class AnalyticsManager {
  private events: AnalyticsEvent[] = [];
  private listeners: Set<Listener> = new Set();

  constructor() {
    // Initial page view event
    if (typeof window !== 'undefined') {
      this.track('page_view', 'navigation', { path: window.location.pathname });
    }
  }

  track(eventName: string, category: string, metadata?: Record<string, string | number | boolean | undefined>) {
    // Strictly sanitize: ensure no sensitive clinical/health data is passed
    const cleanMeta: Record<string, string | number | boolean | undefined> = {};
    if (metadata) {
      for (const [k, v] of Object.entries(metadata)) {
        // Exclude potential sensitive keys
        if (!['symptoms', 'diagnosis', 'clinicalNotes', 'fullHealthHistory'].includes(k)) {
          cleanMeta[k] = v;
        }
      }
    }

    const event: AnalyticsEvent = {
      eventName,
      category,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      metadata: cleanMeta
    };

    this.events.unshift(event);
    if (this.events.length > 50) {
      this.events.pop();
    }

    this.notify();

    // Log in development for transparency
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Telemetry] ${eventName}:`, cleanMeta);
    }
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.getEvents());
    return () => this.listeners.delete(listener);
  }

  private notify() {
    const list = this.getEvents();
    this.listeners.forEach((l) => l(list));
  }
}

export const analytics = new AnalyticsManager();
