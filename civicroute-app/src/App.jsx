import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { RequireAuth, RequireTerms, RequireArea, RequireIssue, RequireSent } from './components/Guards';

import LoginPage from './pages/LoginPage';
import TermsPage from './pages/TermsPage';
import LocationPage from './pages/LocationPage';
import ReportPage from './pages/ReportPage';
import ReviewPage from './pages/ReviewPage';
import SentPage from './pages/SentPage';

// Desktop phone-frame wrapper
function PhoneFrame({ children }) {
  return (
    <div
      className="min-h-screen flex items-start justify-center"
      style={{ background: '#e5dfd5' }}
    >
      <div
        className="w-full max-w-[390px] min-h-screen relative"
        style={{ background: '#fcf9f3', boxShadow: '0 0 60px rgba(45,30,24,0.15)' }}
      >
        {children}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </AppProvider>
  );
}
