
import type { ComponentType } from 'react';

export type PageProps = Record<string, unknown>;

export type PageContext = {
  Page: ComponentType<PageProps>;
  pageProps: PageProps;
  urlPathname: string;
  documentHtml?: string;
};

export type PageContextServer = PageContext & {
  documentHtml: string;
};

export type PageContextClient = PageContext & {
  isHydration: boolean;
};
