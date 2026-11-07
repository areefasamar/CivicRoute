import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, setState] = useState({
    lang: 'en',               // 'en' | 'ur' | 'sd'
    email: '',
    agreedToTerms: false,
    selectedArea: null,       // area object from AREAS
    selectedIssue: null,      // issue object from ISSUE_TYPES
    photoFile: null,
    photoPreviewUrl: null,
    voiceNoteBlob: null,      // recorded audio Blob
    voiceNoteUrl: null,       // object URL for playback
    voiceDuration: 0,         // seconds
    description: '',
    letterText: '',
    letterLang: 'en',
    sentAt: null,
    refNumber: null,
  });

  function update(patch) {
    setState(prev => {
      const next = { ...prev, ...patch };
      // Keep letterLang synced with lang if letterLang wasn't explicitly patched
      if (patch.lang && !patch.letterLang) {
        next.letterLang = patch.lang;
      }
      return next;
    });
  }

  function setLang(newLang) {
    update({ lang: newLang, letterLang: newLang });
  }

  function resetFlow() {
    setState(prev => ({
      lang: prev.lang,
      email: prev.email,
      agreedToTerms: false,
      selectedArea: null,
      selectedIssue: null,
      photoFile: null,
      photoPreviewUrl: null,
      voiceNoteBlob: null,
      voiceNoteUrl: null,
      voiceDuration: 0,
      description: '',
      letterText: '',
      letterLang: prev.lang,
      sentAt: null,
      refNumber: null,
    }));
  }

  return (
    <AppContext.Provider value={{ state, update, setLang, resetFlow }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
