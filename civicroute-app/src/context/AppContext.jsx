import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, setState] = useState({
    email: '',
    agreedToTerms: false,
    selectedArea: null,       // area object from AREAS
    selectedIssue: null,      // issue object from ISSUE_TYPES
    photoFile: null,
    photoPreviewUrl: null,
    description: '',
    letterText: '',
    letterLang: 'en',
    sentAt: null,
    refNumber: null,
  });

  function update(patch) {
    setState(prev => ({ ...prev, ...patch }));
  }

  function resetFlow() {
    setState(prev => ({
      email: prev.email,
      agreedToTerms: false,
      selectedArea: null,
      selectedIssue: null,
      photoFile: null,
      photoPreviewUrl: null,
      description: '',
      letterText: '',
      letterLang: 'en',
      sentAt: null,
      refNumber: null,
    }));
  }

  return (
    <AppContext.Provider value={{ state, update, resetFlow }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
