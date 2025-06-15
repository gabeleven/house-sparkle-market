
// Safe storage utilities that work in both client and server environments
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.warn('localStorage.getItem failed:', error);
        return null;
      }
    }
    return null;
  },
  
  setItem: (key: string, value: string): void => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.warn('localStorage.setItem failed:', error);
      }
    }
  },
  
  removeItem: (key: string): void => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.warn('localStorage.removeItem failed:', error);
      }
    }
  }
};

export const safeSessionStorage = {
  getItem: (key: string): string | null => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        return sessionStorage.getItem(key);
      } catch (error) {
        console.warn('sessionStorage.getItem failed:', error);
        return null;
      }
    }
    return null;
  },
  
  setItem: (key: string, value: string): void => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        sessionStorage.setItem(key, value);
      } catch (error) {
        console.warn('sessionStorage.setItem failed:', error);
      }
    }
  },
  
  removeItem: (key: string): void => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        sessionStorage.removeItem(key);
      } catch (error) {
        console.warn('sessionStorage.removeItem failed:', error);
      }
    }
  }
};
