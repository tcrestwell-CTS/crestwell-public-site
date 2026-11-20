type GtagParams = Record<string, unknown>;

interface GtagFunction {
  (command: 'js', date: Date): void;
  (command: 'config', measurementId: string, params?: GtagParams): void;
  (command: 'event', eventName: string, params?: GtagParams): void;
  (command: 'set', params: GtagParams): void;
  (command: 'consent', action: string, params?: GtagParams): void;
}

interface Window {
  dataLayer: unknown[];
  gtag: GtagFunction;
}
