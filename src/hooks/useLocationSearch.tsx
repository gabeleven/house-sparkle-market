
import { useMemo } from 'react';

interface LocationComponents {
  street?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  fullText: string;
}

interface CanadianProvince {
  name: string;
  abbreviation: string;
  variations: string[];
}

const CANADIAN_PROVINCES: CanadianProvince[] = [
  { name: 'Ontario', abbreviation: 'ON', variations: ['ontario', 'ont', 'on'] },
  { name: 'Quebec', abbreviation: 'QC', variations: ['quebec', 'québec', 'que', 'qc', 'pq'] },
  { name: 'British Columbia', abbreviation: 'BC', variations: ['british columbia', 'bc', 'b.c.'] },
  { name: 'Alberta', abbreviation: 'AB', variations: ['alberta', 'alta', 'ab'] },
  { name: 'Manitoba', abbreviation: 'MB', variations: ['manitoba', 'man', 'mb'] },
  { name: 'Saskatchewan', abbreviation: 'SK', variations: ['saskatchewan', 'sask', 'sk'] },
  { name: 'Nova Scotia', abbreviation: 'NS', variations: ['nova scotia', 'n.s.', 'ns'] },
  { name: 'New Brunswick', abbreviation: 'NB', variations: ['new brunswick', 'n.b.', 'nb'] },
  { name: 'Newfoundland and Labrador', abbreviation: 'NL', variations: ['newfoundland', 'labrador', 'nfld', 'nl'] },
  { name: 'Prince Edward Island', abbreviation: 'PE', variations: ['prince edward island', 'pei', 'p.e.i.', 'pe'] },
  { name: 'Northwest Territories', abbreviation: 'NT', variations: ['northwest territories', 'nwt', 'nt'] },
  { name: 'Yukon', abbreviation: 'YT', variations: ['yukon', 'yt'] },
  { name: 'Nunavut', abbreviation: 'NU', variations: ['nunavut', 'nu'] }
];

const MAJOR_CANADIAN_CITIES = [
  'Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg',
  'Mississauga', 'Brampton', 'Hamilton', 'Quebec City', 'Surrey', 'Laval',
  'Halifax', 'London', 'Markham', 'Vaughan', 'Gatineau', 'Longueuil', 'Burnaby',
  'Saskatoon', 'Kitchener', 'Windsor', 'Regina', 'Richmond', 'Richmond Hill',
  'Oakville', 'Burlington', 'Sherbrooke', 'Oshawa', 'Saguenay', 'Lévis',
  'Barrie', 'Abbotsford', 'Coquitlam', 'St. Catharines', 'Trois-Rivières',
  'Guelph', 'Cambridge', 'Whitby', 'Ajax', 'Langley', 'Saanich', 'Terrebonne',
  'Milton', 'St. John\'s', 'Moncton', 'Thunder Bay', 'Dieppe', 'Waterloo',
  'Delta', 'Chatham-Kent', 'Red Deer', 'Kamloops', 'Brantford', 'Cape Breton',
  'Lethbridge', 'Saint-Jean-sur-Richelieu', 'Clarington', 'Pickering',
  'Nanaimo', 'Sudbury', 'North Vancouver', 'Brossard', 'Repentigny',
  'Newmarket', 'Chilliwack', 'White Rock', 'Maple Ridge', 'Peterborough',
  'Kawartha Lakes', 'Prince George', 'Sault Ste. Marie', 'Sarnia', 'Wood Buffalo',
  'New Westminster', 'Châteauguay', 'Saint-Jérôme', 'Drummondville',
  'Saint-Hyacinthe', 'Shawinigan', 'Joliette', 'Granby', 'Blainville'
];

export const useLocationSearch = () => {
  const parseLocationQuery = (query: string): LocationComponents => {
    const cleanQuery = query.trim().toLowerCase();
    
    // Canadian postal code regex (A1A 1A1 format)
    const postalCodeRegex = /\b[a-z]\d[a-z]\s*\d[a-z]\d\b/i;
    const postalCodeMatch = query.match(postalCodeRegex);
    
    // Extract postal code if found
    let postalCode: string | undefined;
    let remainingQuery = cleanQuery;
    if (postalCodeMatch) {
      postalCode = postalCodeMatch[0].replace(/\s/g, '').toUpperCase();
      remainingQuery = cleanQuery.replace(postalCodeRegex, '').trim();
    }
    
    // Check for province mentions
    let province: string | undefined;
    for (const prov of CANADIAN_PROVINCES) {
      for (const variation of prov.variations) {
        const regex = new RegExp(`\\b${variation}\\b`, 'i');
        if (regex.test(remainingQuery)) {
          province = prov.name;
          remainingQuery = remainingQuery.replace(regex, '').trim();
          break;
        }
      }
      if (province) break;
    }
    
    // Check for major city mentions
    let city: string | undefined;
    for (const majorCity of MAJOR_CANADIAN_CITIES) {
      const regex = new RegExp(`\\b${majorCity.toLowerCase()}\\b`, 'i');
      if (regex.test(remainingQuery)) {
        city = majorCity;
        remainingQuery = remainingQuery.replace(regex, '').trim();
        break;
      }
    }
    
    // What's left could be street or additional city info
    const street = remainingQuery.length > 0 ? remainingQuery : undefined;
    
    return {
      street,
      city,
      province,
      postalCode,
      fullText: query.trim()
    };
  };

  const generateSearchQueries = (locationComponents: LocationComponents): string[] => {
    const queries: string[] = [];
    
    // Add the original full text
    queries.push(locationComponents.fullText);
    
    // Add individual components
    if (locationComponents.postalCode) {
      queries.push(locationComponents.postalCode);
      // Also add formatted version with space
      const formatted = locationComponents.postalCode.replace(/(.{3})(.{3})/, '$1 $2');
      queries.push(formatted);
    }
    
    if (locationComponents.city) {
      queries.push(locationComponents.city);
    }
    
    if (locationComponents.province) {
      queries.push(locationComponents.province);
      // Add abbreviation
      const provinceData = CANADIAN_PROVINCES.find(p => p.name === locationComponents.province);
      if (provinceData) {
        queries.push(provinceData.abbreviation);
      }
    }
    
    if (locationComponents.street) {
      queries.push(locationComponents.street);
    }
    
    // Add combined queries
    if (locationComponents.city && locationComponents.province) {
      queries.push(`${locationComponents.city}, ${locationComponents.province}`);
    }
    
    return [...new Set(queries)]; // Remove duplicates
  };

  const buildLocationFilter = (searchQueries: string[]) => {
    // Create OR conditions for address field matching
    return searchQueries
      .map(query => `address.ilike.%${query}%`)
      .join(',');
  };

  return {
    parseLocationQuery,
    generateSearchQueries,
    buildLocationFilter,
    CANADIAN_PROVINCES,
    MAJOR_CANADIAN_CITIES
  };
};
