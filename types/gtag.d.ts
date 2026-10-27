interface Window {
  dataLayer: Record<string, unknown>[];
  gtag: (
    command: 'config' | 'event' | 'js' | 'set' | 'consent',
    targetIdOrAction: string,
    params?: Record<string, unknown>
  ) => void;
}
