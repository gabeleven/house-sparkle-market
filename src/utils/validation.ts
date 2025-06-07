
// Input validation utilities
export const validatePhone = (phone: string): boolean => {
  if (!phone || phone.trim() === '') return true; // Optional field
  const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$|^\d{3}-\d{3}-\d{4}$|^\d{10}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validatePostalCode = (postalCode: string): boolean => {
  if (!postalCode || postalCode.trim() === '') return true; // Optional field
  const canadianPostalRegex = /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/;
  return canadianPostalRegex.test(postalCode);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateHourlyRate = (rate: number | undefined): boolean => {
  if (rate === undefined || rate === null) return false;
  return rate > 0 && rate <= 1000; // Reasonable bounds
};

export const validateYearsExperience = (years: number | undefined): boolean => {
  if (years === undefined || years === null) return true; // Optional field
  return years >= 0 && years <= 50; // Reasonable bounds
};

export const validateServiceRadius = (radius: number | undefined): boolean => {
  if (radius === undefined || radius === null) return false;
  return radius >= 1 && radius <= 100; // 1-100 km seems reasonable
};

export const formatPhoneNumber = (value: string): string => {
  const digitsOnly = value.replace(/\D/g, '');
  if (digitsOnly.length <= 3) return digitsOnly;
  if (digitsOnly.length <= 6) return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3)}`;
  return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6, 10)}`;
};

export const formatPostalCode = (value: string): string => {
  const cleaned = value.replace(/\s/g, '').toUpperCase();
  if (cleaned.length <= 3) return cleaned;
  return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)}`;
};
