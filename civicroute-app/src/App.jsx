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

// Realistic Front View Smartphone Mockup (Deep Purple Frame matching user reference)
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
      className="min-h-screen w-full flex items-center justify-center p-2 sm:p-6 select-none transition-colors"
      style={{
        background: '#1a191c', // Sleek dark studio presentation background matching the mockup viewer
      }}
    >
      {/* White Presentation Card (matches the uploaded mockup showcase stage) */}
      <div
        className="w-full max-w-[480px] sm:bg-[#ffffff] sm:rounded-[36px] p-2 sm:p-8 flex flex-col items-center justify-center sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)] relative"
      >
        {/* The Smartphone Device */}
        <div className="relative flex flex-col items-center w-full max-w-[340px] sm:max-w-[350px]">
          {/* Left Hardware Buttons (Mute / Action + Volume Up + Volume Down) */}
          <div
            className="hidden sm:block absolute -left-[5px] top-[95px] w-[4px] h-[22px] rounded-l-[3px] shadow-xs"
            style={{ background: '#392a4a' }}
          />
          <div
            className="hidden sm:block absolute -left-[5px] top-[135px] w-[4px] h-[45px] rounded-l-[3px] shadow-xs"
            style={{ background: '#392a4a' }}
          />
          <div
            className="hidden sm:block absolute -left-[5px] top-[192px] w-[4px] h-[45px] rounded-l-[3px] shadow-xs"
            style={{ background: '#392a4a' }}
          />

          {/* Right Hardware Button (Power / Lock) */}
          <div
            className="hidden sm:block absolute -right-[5px] top-[150px] w-[4px] h-[68px] rounded-r-[3px] shadow-xs"
            style={{ background: '#392a4a' }}
          />

          {/* Phone Outer Chassis (Metallic Deep Purple Frame) */}
          <div
            className="w-full h-screen sm:h-[720px] sm:max-h-[82vh] rounded-none sm:rounded-[46px] p-0 sm:p-[8px] relative transition-all"
            style={{
              background: 'linear-gradient(155deg, #4b3961 0%, #20172c 45%, #3d2d50 100%)',
              boxShadow:
                '0 20px 50px -12px rgba(25, 12, 38, 0.5), inset 0 0 0 1px rgba(255,255,255,0.22), 0 0 0 2px #261a35',
            }}
          >
            {/* Inner Phone Screen Display ("The Glass") */}
            <div
              className="w-full h-full sm:rounded-[38px] overflow-hidden bg-[#fcf9f3] flex flex-col relative select-none shadow-inner"
              style={{
                fontFamily: fontStyle,
              }}
            >
              {/* Top Phone Status Bar + Dynamic Island */}
              <div
                className="w-full h-10 px-5 pt-2 pb-1 flex items-center justify-between flex-shrink-0 z-50 bg-[#fcf9f3]"
                dir="ltr"
              >
                {/* Time */}
                <span className="text-[12px] font-bold tracking-tight text-[#140804] w-12 text-left">
                  {time}
                </span>

                {/* Dynamic Island (Pill Cutout) */}
                <div
                  className="w-[94px] h-[22px] bg-[#000000] rounded-full flex items-center justify-between px-2.5 shadow-xs"
                >
                  {/* Camera Lens */}
                  <div className="w-2 h-2 rounded-full bg-[#0a0a14] ring-1 ring-[#232338] flex items-center justify-center">
                    <div className="w-0.5 h-0.5 rounded-full bg-[#202048]" />
                  </div>
                  {/* Sensor dot */}
                  <div className="w-1 h-1 rounded-full bg-[#080808]" />
                </div>

                {/* Status Icons */}
                <div className="flex items-center gap-1.5 text-[#140804] w-12 justify-end">
                  {/* Cellular 4 bars */}
                  <div className="flex items-end gap-[1px] h-2">
                    <span className="w-[2px] h-[2.5px] bg-[#140804] rounded-xs" />
                    <span className="w-[2px] h-[4px] bg-[#140804] rounded-xs" />
                    <span className="w-[2px] h-[6px] bg-[#140804] rounded-xs" />
                    <span className="w-[2px] h-[8px] bg-[#140804] rounded-xs" />
                  </div>

                  {/* Wi-Fi Icon */}
                  <span className="material-symbols-outlined leading-none" style={{ fontSize: 13 }}>
                    wifi
                  </span>

                  {/* Battery Icon */}
                  <div className="flex items-center gap-[1px]">
                    <div className="w-[17px] h-[9px] rounded-[2.5px] border border-[#140804] p-[1px] flex items-center">
                      <div className="w-[10px] h-full bg-[#140804] rounded-[1px]" />
                    </div>
                    <div className="w-[1px] h-[3px] bg-[#140804] rounded-r-xs" />
                  </div>
                </div>
              </div>

              {/* Scrollable App Viewport */}
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

              {/* Bottom Home Indicator */}
              <div
                className="w-full h-5 flex items-center justify-center flex-shrink-0 z-50 bg-[#fcf9f3] pointer-events-none"
              >
                <div className="w-28 h-[3.5px] bg-[#140804]/35 rounded-full" />
              </div>
            </div>
          </div>

          {/* Realistic Ellipse Ground Drop Shadow (matching the vector mockup in the image) */}
          <div
            className="hidden sm:block w-48 h-3.5 rounded-[100%] blur-sm mt-3.5 transition-all"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(30,15,45,0.45) 0%, rgba(30,15,45,0) 70%)',
            }}
          />
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
