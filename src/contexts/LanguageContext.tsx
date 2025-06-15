
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
    // Check if we're in the browser before accessing localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('housie-language');
      return (saved as Language) || 'fr'; // Default to French for Quebec
    }
    return 'fr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Save to localStorage only in browser
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('housie-language', lang);
    }
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
    'hero.subtitle': 'Connect with verified cleaners in your area. Book instantly, track income, stay compliant.',
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
    'providers.benefit1.title': 'Compliance Status Built-In',
    'providers.benefit1.desc': 'Automatic tax tracking and reporting to meet Canada\'s new 2025 legal requirements',
    'providers.benefit2.title': 'Save on Accounting Fees',
    'providers.benefit2.desc': 'Advanced tax features save $500-$2,000+ annually compared to hiring accountants',
    'providers.benefit3.title': 'Grow Your Client Base',
    'providers.benefit3.desc': 'Access thousands of potential clients in your area',
    'providers.benefit4.title': 'Legal Protection',
    'providers.benefit4.desc': 'Stay compliant with reporting requirements - avoid penalties and audits',

    // Analytics & Dashboard
    'analytics.intelligence': 'Intelligence',
    'analytics.insights': 'Insights',
    'analytics.reports': 'Reports',
    'analytics.performance': 'Performance',
    'analytics.complianceStatus': 'Compliance Status',
    'dashboard.businessInsights': 'Business Insights',
    'dashboard.revenue': 'Revenue',
    'dashboard.bookings': 'Bookings',
    'dashboard.avgRate': 'Avg. Rate',
    'dashboard.rating': 'Rating',
    'dashboard.revenueVsLastMonth': 'vs last month',
    'dashboard.peakHours': 'Peak Hours',
    'dashboard.customerSatisfaction': 'Customer Satisfaction',
    'dashboard.overallSatisfaction': 'Overall satisfaction',
    'dashboard.bookingSources': 'Booking Sources',
    'dashboard.directBookings': 'Direct bookings',
    'dashboard.searchResults': 'Search results',
    'dashboard.referrals': 'Referrals',
    'dashboard.revenueTrend': 'Revenue Trend',
    'dashboard.serviceDistribution': 'Service Distribution',

    // Messages & Chat
    'messages.title': 'Messages',
    'messages.noMessages': 'No messages yet.',
    'messages.startConversation': 'Start the conversation!',
    'messages.typeMessage': 'Type a message...',
    'messages.send': 'Send',
    'messages.online': 'Online',
    'messages.offline': 'Offline',
    'messages.lastSeen': 'Last seen',
    'messages.newConversation': 'New Conversation',
    'messages.searchMessages': 'Search messages...',
    'messages.loading': 'Loading messages...',
    'messages.welcomeTitle': 'Welcome to Housie Messages',
    'messages.selectConversation': 'Select a conversation to start messaging',
    'messages.loginRequired': 'Please log in to view messages.',
    'messages.unknownUser': 'Unknown User',

    // Chatbot
    'chatbot.greeting': 'Hello! How can I help you today?',
    'chatbot.typeMessage': 'Type your message here...',
    'chatbot.send': 'Send',
    'chatbot.thinking': 'AI is thinking...',
    'chatbot.error': 'Sorry, I encountered an error. Please try again.',
    'chatbot.restart': 'Restart conversation',
    'chatbot.minimize': 'Minimize chat',
    'chatbot.maximize': 'Open chat',

    // Forms & Buttons
    'form.save': 'Save',
    'form.cancel': 'Cancel',
    'form.submit': 'Submit',
    'form.edit': 'Edit',
    'form.delete': 'Delete',
    'form.confirm': 'Confirm',
    'form.back': 'Back',
    'form.next': 'Next',
    'form.previous': 'Previous',
    'form.search': 'Search',
    'form.filter': 'Filter',
    'form.clear': 'Clear',
    'form.upload': 'Upload',
    'form.download': 'Download',
    'form.print': 'Print',
    'form.share': 'Share',

    // Service Types
    'service.regularCleaning': 'Regular Cleaning',
    'service.deepCleaning': 'Deep Cleaning',
    'service.moveInOut': 'Move-in/out',
    'service.commercial': 'Commercial',
    'service.postConstruction': 'Post-Construction',
    'service.windowCleaning': 'Window Cleaning',

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
    'loading': 'Loading...',
    'error': 'Error',
    'success': 'Success',
    'warning': 'Warning',
    'info': 'Information',
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
    'hero.subtitle': 'Connectez-vous avec des professionnels vérifiés dans votre région. Réservez instantanément, suivez vos revenus, restez conforme.',
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
    'providers.benefit1.title': 'Statut de Conformité Intégré',
    'providers.benefit1.desc': 'Suivi et déclaration fiscale automatiques pour respecter les nouvelles exigences légales 2025 du Canada',
    'providers.benefit2.title': 'Économisez sur les Frais Comptables',
    'providers.benefit2.desc': 'Les fonctionnalités fiscales avancées permettent d\'économiser 500 $ à 2 000 $ et plus annuellement par rapport à l\'embauche de comptables',
    'providers.benefit3.title': 'Développez votre Clientèle',
    'providers.benefit3.desc': 'Accédez à des milliers de clients potentiels dans votre région',
    'providers.benefit4.title': 'Protection Juridique',
    'providers.benefit4.desc': 'Restez conforme aux exigences de déclaration - évitez les pénalités et vérifications',

    // Analytics & Dashboard - Professional business terms
    'analytics.intelligence': 'Intelligence',
    'analytics.insights': 'Analyses',
    'analytics.reports': 'Rapports',
    'analytics.performance': 'Performance',
    'analytics.complianceStatus': 'Statut de Conformité',
    'dashboard.businessInsights': 'Analyses d\'Affaires',
    'dashboard.revenue': 'Revenus',
    'dashboard.bookings': 'Réservations',
    'dashboard.avgRate': 'Taux Moyen',
    'dashboard.rating': 'Note',
    'dashboard.revenueVsLastMonth': 'vs mois dernier',
    'dashboard.peakHours': 'Heures de Pointe',
    'dashboard.customerSatisfaction': 'Satisfaction Client',
    'dashboard.overallSatisfaction': 'Satisfaction globale',
    'dashboard.bookingSources': 'Sources de Réservation',
    'dashboard.directBookings': 'Réservations directes',
    'dashboard.searchResults': 'Résultats de recherche',
    'dashboard.referrals': 'Références',
    'dashboard.revenueTrend': 'Tendance des Revenus',
    'dashboard.serviceDistribution': 'Répartition des Services',

    // Messages & Chat - Professional communication terms
    'messages.title': 'Messages',
    'messages.noMessages': 'Aucun message pour le moment.',
    'messages.startConversation': 'Commencez la conversation !',
    'messages.typeMessage': 'Tapez votre message...',
    'messages.send': 'Envoyer',
    'messages.online': 'En ligne',
    'messages.offline': 'Hors ligne',
    'messages.lastSeen': 'Vu pour la dernière fois',
    'messages.newConversation': 'Nouvelle Conversation',
    'messages.searchMessages': 'Rechercher dans les messages...',
    'messages.loading': 'Chargement des messages...',
    'messages.welcomeTitle': 'Bienvenue dans Housie Messages',
    'messages.selectConversation': 'Sélectionnez une conversation pour commencer à échanger',
    'messages.loginRequired': 'Veuillez vous connecter pour voir les messages.',
    'messages.unknownUser': 'Utilisateur Inconnu',

    // Chatbot - Professional assistance terms
    'chatbot.greeting': 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
    'chatbot.typeMessage': 'Tapez votre message ici...',
    'chatbot.send': 'Envoyer',
    'chatbot.thinking': 'L\'IA réfléchit...',
    'chatbot.error': 'Désolé, j\'ai rencontré une erreur. Veuillez réessayer.',
    'chatbot.restart': 'Redémarrer la conversation',
    'chatbot.minimize': 'Réduire le chat',
    'chatbot.maximize': 'Ouvrir le chat',

    // Forms & Buttons - Standard business French
    'form.save': 'Enregistrer',
    'form.cancel': 'Annuler',
    'form.submit': 'Soumettre',
    'form.edit': 'Modifier',
    'form.delete': 'Supprimer',
    'form.confirm': 'Confirmer',
    'form.back': 'Retour',
    'form.next': 'Suivant',
    'form.previous': 'Précédent',
    'form.search': 'Rechercher',
    'form.filter': 'Filtrer',
    'form.clear': 'Effacer',
    'form.upload': 'Télécharger',
    'form.download': 'Télécharger',
    'form.print': 'Imprimer',
    'form.share': 'Partager',

    // Service Types - Professional cleaning services
    'service.regularCleaning': 'Ménage Régulier',
    'service.deepCleaning': 'Grand Ménage',
    'service.moveInOut': 'Ménage Déménagement',
    'service.commercial': 'Commercial',
    'service.postConstruction': 'Post-Construction',
    'service.windowCleaning': 'Nettoyage de Vitres',

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
    'loading': 'Chargement...',
    'error': 'Erreur',
    'success': 'Succès',
    'warning': 'Avertissement',
    'info': 'Information',
  }
};
