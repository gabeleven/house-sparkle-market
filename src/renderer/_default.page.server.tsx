
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import { PageShell } from './PageShell';
import type { PageContextServer } from './types';

export { render };
export { passToClient };

const passToClient = ['pageProps', 'urlPathname'];

async function render(pageContext: PageContextServer) {
  const { Page, pageProps } = pageContext;
  
  let pageHtml = '';
  
  try {
    pageHtml = ReactDOMServer.renderToString(
      <PageShell pageContext={pageContext}>
        <Page {...pageProps} />
      </PageShell>
    );
  } catch (error) {
    console.error('SSR render error:', error);
    // Fallback to minimal HTML structure
    pageHtml = `
      <div class="min-h-screen">
        <header>HOUSIE - Professional Service Providers</header>
        <main>Loading...</main>
        <footer>© 2024 HOUSIE</footer>
      </div>
    `;
  }

  const { documentHtml } = pageContext;
  
  return {
    documentHtml: documentHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${pageHtml}</div>`
    ),
    pageContext: {
      // Pass minimal context to client
    }
  };
}
