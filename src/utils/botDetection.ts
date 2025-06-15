
export const isBotUserAgent = (userAgent?: string): boolean => {
  if (!userAgent) return false;
  
  const botPatterns = [
    'googlebot',
    'bingbot',
    'slurp',
    'duckduckbot',
    'baiduspider',
    'yandexbot',
    'facebookexternalhit',
    'twitterbot',
    'rogerbot',
    'linkedinbot',
    'embedly',
    'quora link preview',
    'showyoubot',
    'outbrain',
    'pinterest',
    'developers.google.com/+/web/snippet',
    'claude'
  ];
  
  return botPatterns.some(pattern => 
    userAgent.toLowerCase().includes(pattern)
  );
};

export const addBotFriendlyContent = () => {
  // Add structured data for better bot understanding
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "HOUSIE",
    "description": "Professional Service Provider Marketplace for Canada",
    "url": "https://housie.ca",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "category": "Service",
      "areaServed": "Canada"
    }
  };
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
};
