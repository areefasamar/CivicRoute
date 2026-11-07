import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AUTHORITIES } from '../data/areas';
import AppHeader from '../components/AppHeader';
import StepBar from '../components/StepBar';

export default function SentPage() {
  const navigate = useNavigate();
  const { state, resetFlow } = useApp();
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const authority = state.selectedArea ? AUTHORITIES[state.selectedArea.authorityId] : null;

  const sentAt = state.sentAt ? new Date(state.sentAt) : new Date();
  const timeStr = sentAt.toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit', hour12: true }) + ' PKT';
  const dateStr = sentAt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  function showToast(msg) {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2800);
  }

  function handleCopy(text, label) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => showToast(`${label} copied!`));
    } else {
      showToast(`${label} copied!`);
    }
  }

  function handleReportAnother() {
    resetFlow();
    navigate('/location');
  }

  return (
    <div className="page-enter min-h-screen flex flex-col" style={{ background: '#fcf9f3' }}>
      <AppHeader title="Submission Receipt" showBack={false} />
      <main className="flex-1 max-w-[390px] w-full mx-auto pt-16 pb-10">
        <div className="flex flex-col w-full">
          {/* Demo mode bar */}
          <div className="px-5 pt-2 pb-1 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: '#775746' }}
              />
              <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#775746' }}>Simulation Complete</span>
            </div>
            <span
              className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{ background: '#ebe8e2', color: '#4f4541' }}
            >
              Demo Mode
            </span>
          </div>

          <StepBar currentStep={4} completedUpTo={4} />

          {/* Success hero */}
          <div className="px-5 pt-5 pb-4 text-center flex flex-col items-center">
            <div className="relative mb-5">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-md"
                style={{ background: '#2d1e18' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 32, color: '#fcf9f3', fontVariationSettings: "'FILL' 1" }}>check</span>
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center shadow-sm"
                style={{ background: '#ffd4bd' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#7a5a48', fontVariationSettings: "'FILL' 1" }}>mark_email_read</span>
              </div>
            </div>
            <h1 className="text-[26px] font-bold leading-[34px] tracking-tight mb-2" style={{ color: '#140804' }}>
              Complaint sent
            </h1>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#4f4541' }}>
              You've reached the end of the sample journey. No email was actually sent.
            </p>
          </div>

          <div className="px-5 flex flex-col gap-4 pb-5">
            {/* Receipt card */}
            <div
              className="rounded-xl p-5 flex flex-col gap-4"
              style={{ background: '#ffffff', border: '1px solid #e5dfd5', boxShadow: '0 2px 8px rgba(45,30,24,0.04)' }}
            >
              {/* Receipt header */}
              <div className="flex items-center justify-between pb-1" style={{ borderBottom: '1px solid #f0eee8' }}>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#775746' }}>receipt_long</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#775746' }}>Complaint Receipt</span>
                </div>
                <span
                  className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                  style={{ background: '#f0eee8', color: '#4f4541' }}
                >
                  Simulated
                </span>
              </div>

              {/* Reference number */}
              <div className="rounded-lg p-3 flex flex-col" style={{ background: '#f6f3ed' }}>
                <span className="text-[11px] uppercase tracking-wide" style={{ color: '#4f4541' }}>Reference Number</span>
                <div className="flex items-center justify-between mt-0.5">
                  <span
                    className="font-bold tracking-wider"
                    style={{ color: '#140804', fontSize: 13, lineHeight: '18px', letterSpacing: '0.05em' }}
                  >
                    {state.refNumber || 'CR-20261107-0001'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(state.refNumber || 'CR-20261107-0001', 'Reference')}
                    className="flex items-center gap-1 text-[11px] font-semibold active:scale-95 transition-transform"
                    style={{ color: '#775746' }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 15 }}>content_copy</span>
                    <span>Copy</span>
                  </button>
                </div>
              </div>

              {/* Metadata */}
              <div className="flex flex-col gap-3 pt-1">
                <div className="flex justify-between items-start gap-3">
                  <span className="text-xs font-semibold shrink-0" style={{ color: '#4f4541' }}>Timestamp</span>
                  <span className="text-xs font-medium text-right" style={{ color: '#140804' }}>{dateStr} · {timeStr}</span>
                </div>
                <div className="flex justify-between items-start gap-3">
                  <span className="text-xs font-semibold shrink-0" style={{ color: '#4f4541' }}>Issue Type</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: '#775746' }} />
                    <span className="text-xs font-semibold" style={{ color: '#140804' }}>{state.selectedIssue?.label || '—'}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold" style={{ color: '#4f4541' }}>Location</span>
                  <div
                    className="flex items-start gap-1.5 rounded-lg p-2.5"
                    style={{ background: 'rgba(246,243,237,0.6)' }}
                  >
                    <span className="material-symbols-outlined shrink-0 mt-0.5" style={{ fontSize: 18, color: '#775746' }}>location_on</span>
                    <span className="text-xs leading-snug" style={{ color: '#140804' }}>
                      {state.selectedArea ? `${state.selectedArea.block}, ${state.selectedArea.label.split(',')[0]}, ${state.selectedArea.ward} (sample) · Karachi` : '—'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Authority contact card */}
            {authority && (
              <div
                className="rounded-xl p-5 flex flex-col gap-4"
                style={{ background: '#ffffff', border: '1px solid #e5dfd5', boxShadow: '0 2px 8px rgba(45,30,24,0.04)' }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: '#f0eee8' }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#140804' }}>account_balance</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h2 className="font-semibold text-sm" style={{ color: '#140804', fontSize: 18, lineHeight: '24px' }}>{authority.shortName}</h2>
                    <span className="text-xs" style={{ color: '#4f4541' }}>{authority.department} · Sample contacts</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {/* Portal */}
                  <button
                    type="button"
                    onClick={() => handleCopy(authority.portal, 'Portal URL')}
                    className="flex items-center justify-between p-3 rounded-lg transition-colors group"
                    style={{ background: '#f6f3ed' }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="material-symbols-outlined shrink-0" style={{ fontSize: 20, color: '#775746' }}>language</span>
                      <span className="text-xs font-medium truncate" style={{ color: '#140804' }}>{authority.portal}</span>
                    </div>
                    <span className="material-symbols-outlined shrink-0" style={{ fontSize: 16, color: '#4f4541' }}>content_copy</span>
                  </button>

                  {/* Email */}
                  <button
                    type="button"
                    onClick={() => handleCopy(authority.email, 'Email')}
                    className="flex items-center justify-between p-3 rounded-lg transition-colors group"
                    style={{ background: '#f6f3ed' }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="material-symbols-outlined shrink-0" style={{ fontSize: 20, color: '#775746' }}>mail</span>
                      <span className="text-xs font-medium truncate" style={{ color: '#140804' }}>{authority.email}</span>
                    </div>
                    <span className="material-symbols-outlined shrink-0" style={{ fontSize: 16, color: '#4f4541' }}>content_copy</span>
                  </button>

                  {/* Helpline */}
                  <button
                    type="button"
                    onClick={() => handleCopy(authority.helpline, 'Helpline number')}
                    className="flex items-center justify-between p-3 rounded-lg transition-colors group"
                    style={{ background: '#f6f3ed' }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="material-symbols-outlined shrink-0" style={{ fontSize: 20, color: '#775746' }}>call</span>
                      <span className="text-xs font-medium truncate" style={{ color: '#140804' }}>{authority.helpline}</span>
                    </div>
                    <span className="text-[11px] font-semibold shrink-0" style={{ color: '#4f4541' }}>Helpline</span>
                  </button>
                </div>

                {/* Disclaimer */}
                <div
                  className="flex items-start gap-2 p-3 rounded-lg"
                  style={{ background: '#f6f3ed' }}
                >
                  <span className="material-symbols-outlined shrink-0 mt-0.5" style={{ fontSize: 16, color: '#4f4541' }}>info</span>
                  <p className="text-xs leading-relaxed" style={{ color: '#4f4541' }}>
                    These demonstration contacts are not operational. Verify official contact details before following up.
                  </p>
                </div>
              </div>
            )}

            {/* Draft saved note */}
            <div
              className="rounded-xl p-4 flex items-center justify-between"
              style={{ background: '#f6f3ed' }}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#140804', fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="text-xs" style={{ color: '#4f4541' }}>Formal draft saved locally to your device</span>
              </div>
            </div>

            {/* Report another + footer */}
            <div className="flex flex-col gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleReportAnother}
                className="w-full h-12 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-all active:scale-[0.99] hover:opacity-95"
                style={{
                  background: '#2d1e18',
                  color: '#ffffff',
                  boxShadow: '0 2px 8px rgba(45,30,24,0.15)',
                }}
              >
                <span>Report another issue</span>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
              </button>
              <p className="text-[11px] text-center tracking-wide pt-1" style={{ color: '#4f4541' }}>
                Sample data for demonstration
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Toast */}
      <div
        className="fixed bottom-6 left-1/2 max-w-sm w-[calc(100%-2.5rem)] py-3 px-4 rounded-xl flex items-center justify-between z-50 transition-all duration-300"
        style={{
          transform: 'translateX(-50%)',
          background: '#2d1e18',
          color: '#ffffff',
          boxShadow: '0 8px 24px rgba(45,30,24,0.25)',
          opacity: toastVisible ? 1 : 0,
          pointerEvents: toastVisible ? 'auto' : 'none',
        }}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#ffd4bd', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          <span className="text-sm font-medium">{toastMsg}</span>
        </div>
        <button
          type="button"
          onClick={() => setToastVisible(false)}
          style={{ color: 'rgba(255,255,255,0.7)' }}
          aria-label="Close notification"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
        </button>
      </div>
    </div>
  );
}
