
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = "HOUSIE - Professional Service Providers Across Canada",
  description = "Find trusted, verified service providers across Canada. From cleaning services to home maintenance, connect with professionals in your area through HOUSIE's secure platform.",
  keywords = "service providers Canada, cleaning services, home maintenance, professional services, trusted providers, verified cleaners",
  url = "https://housie.ca",
  image = "https://raw.githubusercontent.com/gabeleven/Housie_Media/main/header_logo.png"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};
