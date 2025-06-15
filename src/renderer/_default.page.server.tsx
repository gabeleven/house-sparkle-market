
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import { PageShell } from './PageShell';
import type { PageContextServer } from './types';

export { render };
export { passToClient };

const passToClient = ['pageProps', 'urlPathname'];

async function render(pageContext: PageContextServer) {
  const { Page, pageProps } = pageContext;
  
  const pageHtml = ReactDOMServer.renderToString(
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  );

  const { documentHtml } = pageContext;
  
  return {
    documentHtml: documentHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${pageHtml}</div>`
    ),
    pageContext: {
      // Pass page context to client
    }
  };
}
