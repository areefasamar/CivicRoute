import { useEffect, useState } from 'react';
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

// Desktop Phone-Frame Wrapper with Proportional Sizing
function PhoneFrame({ children }) {
  const { state } = useApp();
  const currentLang = state.lang || 'en';
  const t = translations[currentLang] || translations.en;
  const isRtl = t.dir === 'rtl';
  const isSindhi = currentLang === 'sd';
  const isUrdu = currentLang === 'ur';

  const [time, setTime] = useState(() => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setTime(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, 15000);
    return () => clearInterval(timer);
  }, []);

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
    <div className="phone-viewport-container select-none">
      <div className="phone-device-wrapper">
        {/* Hardware side buttons */}
        <div className="phone-hardware-buttons">
          <div className="phone-btn-action" />
          <div className="phone-btn-volup" />
          <div className="phone-btn-voldown" />
          <div className="phone-btn-power" />
        </div>

        {/* Smartphone Chassis */}
        <div className="phone-device-chassis">
          {/* Inner Phone Screen Display */}
          <div className="phone-screen-display" style={{ fontFamily: fontStyle }}>
            {/* Fixed Status Bar */}
            <div className="phone-status-bar" dir="ltr">
              <span className="text-[12px] font-bold tracking-tight text-[#140804] w-12 text-left">
                {time}
              </span>

              {/* Dynamic Island Notch */}
              <div className="phone-notch-island">
                <div className="w-2 h-2 rounded-full bg-[#0a0a14] ring-1 ring-[#232338] flex items-center justify-center">
                  <div className="w-0.5 h-0.5 rounded-full bg-[#202048]" />
                </div>
                <div className="w-1 h-1 rounded-full bg-[#080808]" />
              </div>

              {/* Status Icons */}
              <div className="flex items-center gap-1.5 text-[#140804] w-12 justify-end">
                <div className="flex items-end gap-[1px] h-2">
                  <span className="w-[2px] h-[2.5px] bg-[#140804] rounded-xs" />
                  <span className="w-[2px] h-[4px] bg-[#140804] rounded-xs" />
                  <span className="w-[2px] h-[6px] bg-[#140804] rounded-xs" />
                  <span className="w-[2px] h-[8px] bg-[#140804] rounded-xs" />
                </div>
                <span className="material-symbols-outlined leading-none" style={{ fontSize: 13 }}>
                  wifi
                </span>
                <div className="flex items-center gap-[1px]">
                  <div className="w-[17px] h-[9px] rounded-[2.5px] border border-[#140804] p-[1px] flex items-center">
                    <div className="w-[10px] h-full bg-[#140804] rounded-[1px]" />
                  </div>
                  <div className="w-[1px] h-[3px] bg-[#140804] rounded-r-xs" />
                </div>
              </div>
            </div>

            {/* Scrollable Screen Content */}
            <div dir={isRtl ? 'rtl' : 'ltr'} className="phone-scroll-content select-text">
              {children}
            </div>

            {/* Fixed Bottom Home Indicator */}
            <div className="phone-home-indicator">
              <div className="phone-home-pill" />
            </div>
          </div>
        </div>

        {/* Soft Ground Shadow */}
        <div className="phone-ground-shadow" />
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
