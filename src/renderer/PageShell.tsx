
import React from 'react';
import App from '../App';

export { PageShell };

function PageShell({ children, pageContext }: { children: React.ReactNode; pageContext: any }) {
  return (
    <App>
      {children}
    </App>
  );
}
