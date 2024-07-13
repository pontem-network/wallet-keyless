/// <reference types="vite/client" />

interface Window {
  pontem?: {
    addKeylessAccount: (payload: { jwt: string }) => Promise<{ result: { status: 'OK', redirectTo: string } }>
  }
}

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.svg' {
  import * as React from 'react';

  const ReactComponent: React.FunctionComponent<React.ComponentProps<'svg'> & { title?: string }>;
  export { ReactComponent };
  export default string;
}
  