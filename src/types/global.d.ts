declare global {
  interface Window {
    toast: (
      type: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast',
      summary: string,
      message: string,
    ) => void;
  }
}

export {};
