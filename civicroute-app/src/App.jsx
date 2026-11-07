import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { translations } from './data/translations';
import { RequireAuth, RequireTerms, RequireArea, RequireIssue, RequireSent } from './components/Guards';

import LoginPage from './pages/LoginPage';
import TermsPage from './pages/TermsPage';
import LocationPage from './pages/LocationPage';
import ReportPage from './pages/ReportPage';
import ReviewPage from './pages/ReviewPage';
import SentPage from './pages/SentPage';

// Desktop phone-frame wrapper with dynamic RTL / font styling
function PhoneFrame({ children }) {
  const { state } = useApp();
  const currentLang = state.lang || 'en';
  const t = translations[currentLang] || translations.en;
  const isRtl = t.dir === 'rtl';
  const isSindhi = currentLang === 'sd';
  const isUrdu = currentLang === 'ur';

  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [currentLang, isRtl]);

  const fontStyle = isSindhi
    ? "'Noto Sans Arabic', system-ui, sans-serif"
    : isUrdu
    ? "'Noto Nastaliq Urdu', serif"
    : 'inherit';

  return (
    <div
      className="min-h-screen flex items-start justify-center transition-colors"
      style={{ background: '#e5dfd5' }}
    >
      <div
        dir={isRtl ? 'rtl' : 'ltr'}
        className="w-full max-w-[390px] min-h-screen relative"
        style={{
          background: '#fcf9f3',
          boxShadow: '0 0 60px rgba(45,30,24,0.15)',
          fontFamily: fontStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function AppContent() {
  return (
    <PhoneFrame>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/terms"
          element={
            <RequireAuth>
              <TermsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/location"
          element={
            <RequireTerms>
              <LocationPage />
            </RequireTerms>
          }
        />
        <Route
          path="/report"
          element={
            <RequireArea>
              <ReportPage />
            </RequireArea>
          }
        />
        <Route
          path="/review"
          element={
            <RequireIssue>
              <ReviewPage />
            </RequireIssue>
          }
        />
        <Route
          path="/sent"
          element={
            <RequireSent>
              <SentPage />
            </RequireSent>
          }
        />
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </PhoneFrame>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}
