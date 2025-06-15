
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = "HOUSIE - Professional Service Providers Across Canada",
  description = "Find trusted, verified service providers across Canada. From cleaning services to home maintenance, connect with professionals in your area through HOUSIE's platform.",
  keywords = "service providers, cleaning services, home maintenance, Canada, professional services, trusted providers",
  image = "https://housie.ca/og-image.png",
  url = "https://housie.ca",
  type = "website"
}) => {
  const fullTitle = title.includes("HOUSIE") ? title : `${title} | HOUSIE`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="HOUSIE" />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="HOUSIE" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en-CA" />
      <meta name="geo.region" content="CA" />
      <meta name="geo.placename" content="Canada" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data for Local Business */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "HOUSIE",
          "description": description,
          "url": url,
          "logo": "https://housie.ca/logo.png",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "CA"
          },
          "areaServed": "Canada",
          "serviceType": "Professional Service Marketplace"
        })}
      </script>
    </Helmet>
  );
};
