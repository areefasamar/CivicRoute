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

// Realistic Mobile Phone Mockup Frame
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
    <div
      className="min-h-screen py-3 sm:py-8 px-2 sm:px-6 flex flex-col items-center justify-center transition-colors"
      style={{
        background: 'radial-gradient(ellipse at 50% 25%, #f4eee6 0%, #dfd6c8 100%)',
      }}
    >
      {/* Outer Mobile Phone Chassis (Hardware Body) */}
      <div className="relative group flex flex-col items-center">
        {/* Left Hardware Buttons (Action + Volume Up + Volume Down) */}
        <div className="hidden sm:block absolute -left-[14px] top-[110px] w-[4px] h-[28px] bg-[#3a3530] rounded-l-[3px] shadow-xs" />
        <div className="hidden sm:block absolute -left-[14px] top-[156px] w-[4px] h-[52px] bg-[#3a3530] rounded-l-[3px] shadow-xs" />
        <div className="hidden sm:block absolute -left-[14px] top-[222px] w-[4px] h-[52px] bg-[#3a3530] rounded-l-[3px] shadow-xs" />

        {/* Right Hardware Button (Power / Lock) */}
        <div className="hidden sm:block absolute -right-[14px] top-[175px] w-[4px] h-[76px] bg-[#3a3530] rounded-r-[3px] shadow-xs" />

        {/* Main Phone Boundary */}
        <div
          className="relative w-full sm:w-[393px] h-screen sm:h-[830px] sm:max-h-[88vh] bg-[#1e1b18] sm:rounded-[52px] p-0 sm:p-[11px] sm:shadow-[0_25px_70px_-15px_rgba(20,8,4,0.45),0_0_0_1px_rgba(255,255,255,0.12)_inset,0_0_0_4px_#2b2723,0_0_0_6px_#181512] transition-all"
        >
          {/* Inner Phone Screen Display */}
          <div
            className="w-full h-full sm:rounded-[42px] overflow-hidden bg-[#fcf9f3] flex flex-col relative shadow-inner select-none"
            style={{
              fontFamily: fontStyle,
            }}
          >
            {/* Top Phone Hardware / Status Bar */}
            <div
              className="w-full h-11 px-6 pt-2 pb-1 flex items-center justify-between flex-shrink-0 z-50 bg-[#fcf9f3] select-none"
              dir="ltr"
            >
              {/* Digital Clock */}
              <span className="text-[12px] font-bold tracking-tight text-[#140804] w-12 text-left">
                {time}
              </span>

              {/* Dynamic Island Pill */}
              <div
                className="w-[110px] h-[26px] bg-[#000000] rounded-full flex items-center justify-between px-2.5 shadow-sm"
              >
                {/* Camera Lens */}
                <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a14] ring-1 ring-[#1e1e30] flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-[#1e2040]" />
                </div>
                {/* Sensor indicator */}
                <div className="w-1.5 h-1.5 rounded-full bg-[#080808]" />
              </div>

              {/* Network / Wi-Fi / Battery Icons */}
              <div className="flex items-center gap-1.5 text-[#140804] w-12 justify-end">
                {/* Cellular Signal (4 bars) */}
                <div className="flex items-end gap-[1.5px] h-2.5">
                  <span className="w-[2px] h-[3px] bg-[#140804] rounded-xs" />
                  <span className="w-[2px] h-[5px] bg-[#140804] rounded-xs" />
                  <span className="w-[2px] h-[7px] bg-[#140804] rounded-xs" />
                  <span className="w-[2px] h-[9px] bg-[#140804] rounded-xs" />
                </div>

                {/* Wi-Fi Icon */}
                <span className="material-symbols-outlined text-[13px] leading-none" style={{ fontSize: 13 }}>
                  wifi
                </span>

                {/* Battery Icon */}
                <div className="flex items-center gap-[1px]">
                  <div className="w-[18px] h-[9px] rounded-[2.5px] border border-[#140804] p-[1px] flex items-center">
                    <div className="w-[11px] h-full bg-[#140804] rounded-[1.5px]" />
                  </div>
                  <div className="w-[1px] h-[3px] bg-[#140804] rounded-r-xs" />
                </div>
              </div>
            </div>

            {/* Scrollable App Screen Content */}
            <div
              dir={isRtl ? 'rtl' : 'ltr'}
              className="flex-1 w-full overflow-y-auto overflow-x-hidden flex flex-col relative select-text"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {children}
            </div>

            {/* Bottom Home Indicator Bar */}
            <div
              className="w-full h-5 flex items-center justify-center flex-shrink-0 z-50 bg-[#fcf9f3] pointer-events-none select-none"
            >
              <div className="w-32 h-[4px] bg-[#140804]/35 rounded-full" />
            </div>

            {/* Subtle Screen Gloss Overlay */}
            <div
              className="pointer-events-none absolute inset-0 z-40 rounded-[42px] bg-gradient-to-tr from-transparent via-white/[0.025] to-transparent"
            />
          </div>
        </div>

        {/* Desktop Presentation Caption */}
        <div className="hidden sm:flex items-center gap-2 mt-4 text-[#775746] text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-[#775746]/60 animate-pulse" />
          <span>CivicRoute Mobile Experience • Karachi Municipal Services</span>
        </div>
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
