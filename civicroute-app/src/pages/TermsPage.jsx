import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AppHeader from '../components/AppHeader';

export default function TermsPage() {
  const navigate = useNavigate();
  const { update } = useApp();
  const [agreed, setAgreed] = useState(false);

  function handleContinue() {
    if (!agreed) return;
    update({ agreedToTerms: true });
    navigate('/location');
  }

  return (
    <div className="page-enter min-h-screen flex flex-col" style={{ background: '#fcf9f3' }}>
      <AppHeader title="Before We Begin" showBack={true} />
      <main className="flex-1 max-w-[390px] w-full mx-auto px-5 pt-20 pb-10">
        {/* Demo tag */}
        <div className="flex items-center justify-between py-1 mb-5">
          <div className="flex items-center gap-1.5" style={{ color: '#775746' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#775746' }}>verified_user</span>
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#775746' }}>Citizen Transparency</span>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full" style={{ background: '#e5e2dc', color: '#140804' }}>DEMO</span>
        </div>

        {/* Hero shield */}
        <div className="flex flex-col items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,212,189,0.6)' }}>
            <div className="w-11 h-11 rounded-full flex items-center justify-center shadow-inner" style={{ background: '#140804' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24, color: '#ffdbc9' }}>verified_user</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="self-start text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ background: '#ebe8e2', color: '#775746' }}>BEFORE WE BEGIN</span>
            <h1 className="text-[32px] font-bold leading-[40px] tracking-tight" style={{ color: '#140804' }}>
              A little trust.<br />A clear way forward.
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: '#4f4541' }}>
              Here's how CivicRoute helps you report a local issue responsibly.
            </p>
          </div>
        </div>

        {/* Feature cards */}
        <div className="flex flex-col gap-4 mb-6">
          {[
            {
              icon: 'location_on',
              title: 'Location with a purpose',
              body: 'Choose an area to find its responsible authority. Precise GPS access is optional.',
            },
            {
              icon: 'shield_person',
              title: 'Your information stays yours',
              body: 'Your email, description and photo are used to prepare your complaint. Never include CNIC numbers or sensitive personal details.',
            },
            {
              icon: 'assignment_turned_in',
              title: 'You review. You decide.',
              body: 'Check the letter and recipient before sending. CivicRoute helps route reports; it does not guarantee a response or resolution.',
            },
          ].map(({ icon, title, body }) => (
            <div
              key={title}
              className="flex items-start gap-4 p-4 rounded-xl transition-all duration-200"
              style={{ background: '#ffffff', boxShadow: '0 2px 8px rgba(45,30,24,0.04)', border: '1px solid #e5dfd5' }}
            >
              <div
                className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
                style={{ background: '#f0eee8', color: '#140804' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{icon}</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h2 className="font-semibold text-sm mb-0.5" style={{ color: '#140804', fontSize: 18, lineHeight: '24px' }}>{title}</h2>
                <p className="text-xs leading-normal" style={{ color: '#4f4541' }}>{body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Policy links */}
        <div className="flex items-center gap-2 mb-6 text-xs font-semibold" style={{ color: '#775746' }}>
          <button className="underline underline-offset-4 hover:text-[#140804] transition-colors" type="button">Read Terms</button>
          <span style={{ color: '#4f4541', fontSize: 10 }}>•</span>
          <button className="underline underline-offset-4 hover:text-[#140804] transition-colors" type="button">Read Privacy Policy</button>
        </div>

        {/* Agreement checkbox */}
        <div className="flex flex-col gap-3">
          <label
            className="flex items-start gap-3 p-4 rounded-xl cursor-pointer select-none transition-colors"
            style={{ background: agreed ? '#ffd4bd33' : '#f6f3ed', border: '1px solid #e5dfd5' }}
          >
            <div className="relative flex items-center justify-center mt-0.5 flex-shrink-0">
              <input
                type="checkbox"
                className="sr-only peer"
                id="agreement"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
              />
              <div
                className="w-5 h-5 rounded flex items-center justify-center transition-all"
                style={{
                  background: agreed ? '#2d1e18' : '#ffffff',
                  border: agreed ? 'none' : '1.5px solid #d9d2c7',
                  boxShadow: 'inset 0 1px 3px rgba(45,30,24,0.08)',
                }}
              >
                {agreed && (
                  <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#ffffff', fontVariationSettings: "'FILL' 1" }}>check</span>
                )}
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-sm" style={{ color: '#140804' }}>I agree to the Terms and Privacy Policy</span>
              <span className="text-xs mt-0.5" style={{ color: '#4f4541' }}>Acknowledges responsible civic conduct and public reporting standards.</span>
            </div>
          </label>

          {/* Hint pill */}
          <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300"
            style={{
              background: agreed ? 'rgba(255,212,189,0.3)' : '#ebe8e2',
              color: agreed ? '#140804' : '#4f4541',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 16, color: agreed ? '#140804' : '#775746', fontVariationSettings: agreed ? "'FILL' 1" : "'FILL' 0" }}
            >
              {agreed ? 'check_circle' : 'info'}
            </span>
            <span>{agreed ? 'Agreement verified. Ready to proceed.' : 'When checked, Continue becomes enabled.'}</span>
          </div>

          {/* Continue button */}
          <button
            type="button"
            onClick={handleContinue}
            disabled={!agreed}
            className="w-full h-12 flex items-center justify-center gap-2 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-[0.99]"
            style={{
              background: agreed ? '#2d1e18' : '#e5dfd5',
              color: agreed ? '#ffffff' : '#a19588',
              cursor: agreed ? 'pointer' : 'not-allowed',
              boxShadow: agreed ? '0 2px 8px rgba(45,30,24,0.2)' : 'none',
            }}
          >
            <span>Continue</span>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
          </button>

          {/* Lock note */}
          <div className="flex items-center justify-center gap-1.5 pt-1 opacity-70" style={{ color: '#4f4541' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>lock</span>
            <span className="text-[11px] tracking-wide">End-to-end civic encryption • Unbiased public routing</span>
          </div>
        </div>
      </main>
    </div>
  );
}
