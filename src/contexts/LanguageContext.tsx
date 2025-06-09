
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('housie-language');
    return (saved as Language) || 'fr'; // Default to French for Quebec
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('housie-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation object with standard France French (professional tone)
const translations = {
  en: {
    // Header
    'nav.howItWorks': 'How it Works',
    'nav.findService': 'Find a Service',
    'nav.housePro': 'HOUSIE Pro',
    'nav.support': 'Support',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.logout': 'Logout',
    'nav.messages': 'Messages',
    'nav.profile': 'My Profile',
    'nav.calendar': 'Calendar',
    'nav.bookmarks': 'Bookmarks',
    'nav.earnings': 'My Earnings',
    'nav.position': 'Position',
    'nav.dashboard': 'My Dashboard',

    // Homepage
    'hero.title': 'Find trusted cleaning services in Quebec',
    'hero.subtitle': 'Connect with verified cleaners in your area. Book instantly, track income, stay CRA compliant.',
    'hero.cta': 'Find a Cleaner',
    'hero.ctaProvider': 'Become a Provider',

    // Service Providers Page
    'providers.badge': '🚨 New 2025 Tax Laws - Compliance Required',
    'providers.title': 'Finally, a cleaning platform built for Canada\'s new tax laws',
    'providers.subtitle': 'The only platform that makes tax compliance automatic, not optional. Every cleaning business in Canada now needs income tracking - we\'ve built it as our foundation.',
    'providers.requirement1': 'Income tracking for 30+ transactions OR $2,800+ annually',
    'providers.requirement2': 'Annual CRA reporting by January 31st',
    'providers.requirement3': 'Collection of SIN, address, and transaction details',
    'providers.requirement4': 'Providing tax documents to service providers',
    'providers.whyTitle': 'Why HOUSIE is now essential, not optional',
    'providers.benefit1.title': 'CRA Compliance Built-In',
    'providers.benefit1.desc': 'Automatic tax tracking and reporting to meet Canada\'s new 2025 legal requirements',
    'providers.benefit2.title': 'Save on Accounting Fees',
    'providers.benefit2.desc': 'Advanced tax features save $500-$2,000+ annually compared to hiring accountants',
    'providers.benefit3.title': 'Grow Your Client Base',
    'providers.benefit3.desc': 'Access thousands of potential clients in your area',
    'providers.benefit4.title': 'Legal Protection',
    'providers.benefit4.desc': 'Stay compliant with CRA reporting requirements - avoid penalties and audits',

    // Free Plan
    'plan.free.name': 'CRA Ready',
    'plan.free.tagline': 'Essential tax compliance for new cleaners',
    'plan.free.desc': 'Stay legally compliant with Canada\'s new 2025 tax reporting requirements',
    'plan.free.cta': 'Start Free - Stay Compliant',

    // Starter Plan
    'plan.starter.name': 'Tax Basics',
    'plan.starter.tagline': 'Professional tax tracking without the complexity',
    'plan.starter.desc': 'Everything you need for tax compliance plus professional features',
    'plan.starter.savings': 'Saves $500+ annually vs basic accounting services',
    'plan.starter.cta': 'Choose Tax Basics',

    // Professional Plan
    'plan.professional.name': 'Tax Professional',
    'plan.professional.tagline': 'Complete tax mastery + business optimization',
    'plan.professional.desc': 'Advanced tax features that turn compliance into competitive advantage',
    'plan.professional.savings': 'Saves $2,000+ annually vs professional accounting services',
    'plan.professional.cta': 'Choose Tax Professional',
    'plan.professional.popular': '🎯 Most Popular',

    // Premium Plan
    'plan.premium.name': 'Business Intelligence',
    'plan.premium.tagline': 'Market domination through data insights',
    'plan.premium.desc': 'Complete business intelligence suite for market leaders',
    'plan.premium.savings': 'Complete business optimization - priceless competitive advantage',
    'plan.premium.cta': 'Choose Premium',

    // Common
    'month': 'month',
    'currency': 'CAD',
    'features': 'Features',
    'getStarted': 'Get Started',
    'learnMore': 'Learn More',
  },
  fr: {
    // Header - Professional France French
    'nav.howItWorks': 'Comment ça fonctionne',
    'nav.findService': 'Trouver un service',
    'nav.housePro': 'HOUSIE Pro',
    'nav.support': 'Assistance',
    'nav.login': 'Connexion',
    'nav.signup': 'S\'inscrire',
    'nav.logout': 'Déconnexion',
    'nav.messages': 'Messages',
    'nav.profile': 'Mon Profil',
    'nav.calendar': 'Calendrier',
    'nav.bookmarks': 'Favoris',
    'nav.earnings': 'Mes Revenus',
    'nav.position': 'Position',
    'nav.dashboard': 'Mon Tableau de Bord',

    // Homepage - Professional tone
    'hero.title': 'Trouvez des services de ménage de confiance au Québec',
    'hero.subtitle': 'Connectez-vous avec des professionnels vérifiés dans votre région. Réservez instantanément, suivez vos revenus, restez conforme à l\'ARC.',
    'hero.cta': 'Trouver un Professionnel',
    'hero.ctaProvider': 'Devenir Prestataire',

    // Service Providers Page - Professional business French
    'providers.badge': '🚨 Nouvelles Lois Fiscales 2025 - Conformité Obligatoire',
    'providers.title': 'Enfin, une plateforme de ménage conçue pour les nouvelles lois fiscales du Canada',
    'providers.subtitle': 'La seule plateforme qui rend la conformité fiscale automatique, non optionnelle. Chaque entreprise de ménage au Canada doit maintenant effectuer le suivi des revenus - nous l\'avons intégré dans nos fondations.',
    'providers.requirement1': 'Suivi des revenus pour 30+ transactions OU 2 800 $ et plus annuellement',
    'providers.requirement2': 'Déclaration annuelle à l\'ARC avant le 31 janvier',
    'providers.requirement3': 'Collecte du NAS, adresse et détails des transactions',
    'providers.requirement4': 'Fourniture de documents fiscaux aux prestataires de services',
    'providers.whyTitle': 'Pourquoi HOUSIE est maintenant essentiel, non optionnel',
    'providers.benefit1.title': 'Conformité ARC Intégrée',
    'providers.benefit1.desc': 'Suivi et déclaration fiscale automatiques pour respecter les nouvelles exigences légales 2025 du Canada',
    'providers.benefit2.title': 'Économisez sur les Frais Comptables',
    'providers.benefit2.desc': 'Les fonctionnalités fiscales avancées permettent d\'économiser 500 $ à 2 000 $ et plus annuellement par rapport à l\'embauche de comptables',
    'providers.benefit3.title': 'Développez votre Clientèle',
    'providers.benefit3.desc': 'Accédez à des milliers de clients potentiels dans votre région',
    'providers.benefit4.title': 'Protection Juridique',
    'providers.benefit4.desc': 'Restez conforme aux exigences de déclaration ARC - évitez les pénalités et vérifications',

    // Free Plan - Professional business language
    'plan.free.name': 'Conforme ARC',
    'plan.free.tagline': 'Conformité fiscale essentielle pour nouveaux professionnels',
    'plan.free.desc': 'Restez légalement conforme aux nouvelles exigences de déclaration fiscale 2025 du Canada',
    'plan.free.cta': 'Commencer Gratuitement - Rester Conforme',

    // Starter Plan
    'plan.starter.name': 'Fiscalité de Base',
    'plan.starter.tagline': 'Suivi fiscal professionnel sans complexité',
    'plan.starter.desc': 'Tout ce dont vous avez besoin pour la conformité fiscale plus des fonctionnalités professionnelles',
    'plan.starter.savings': 'Économise 500 $ et plus annuellement vs services comptables de base',
    'plan.starter.cta': 'Choisir Fiscalité de Base',

    // Professional Plan
    'plan.professional.name': 'Professionnel Fiscal',
    'plan.professional.tagline': 'Maîtrise fiscale complète + optimisation des affaires',
    'plan.professional.desc': 'Fonctionnalités fiscales avancées qui transforment la conformité en avantage concurrentiel',
    'plan.professional.savings': 'Économise 2 000 $ et plus annuellement vs services comptables professionnels',
    'plan.professional.cta': 'Choisir Professionnel Fiscal',
    'plan.professional.popular': '🎯 Plus Populaire',

    // Premium Plan
    'plan.premium.name': 'Intelligence d\'Affaires',
    'plan.premium.tagline': 'Domination du marché grâce aux insights de données',
    'plan.premium.desc': 'Suite complète d\'intelligence d\'affaires pour les leaders du marché',
    'plan.premium.savings': 'Optimisation d\'affaires complète - avantage concurrentiel inestimable',
    'plan.premium.cta': 'Choisir Premium',

    // Common
    'month': 'mois',
    'currency': 'CAD',
    'features': 'Fonctionnalités',
    'getStarted': 'Commencer',
    'learnMore': 'En Savoir Plus',
  }
};
