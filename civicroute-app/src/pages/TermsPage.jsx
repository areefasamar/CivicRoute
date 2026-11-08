import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import AppHeader from '../components/AppHeader';

export default function TermsPage() {
  const navigate = useNavigate();
  const { state, update } = useApp();
  const [agreed, setAgreed] = useState(false);

  const lang = state.lang || 'en';
  const t = translations[lang] || translations.en;

  function handleContinue() {
    if (!agreed) return;
    update({ agreedToTerms: true });
    navigate('/location');
  }

  const features = [
    {
      icon: 'location_on',
      title: t.terms.card1Title,
      body: t.terms.card1Body,
    },
    {
      icon: 'shield_person',
      title: t.terms.card2Title,
      body: t.terms.card2Body,
    },
    {
      icon: 'mail',
      title: t.terms.card3Title,
      body: t.terms.card3Body,
    },
  ];

  return (
    <div className="page-enter min-h-screen flex flex-col" style={{ background: '#fcf9f3' }}>
      <AppHeader title={t.headers.terms} showBack={true} />
      <main className="flex-1 w-full mx-auto px-5 pt-3 pb-10">
        {/* Demo tag */}
        <div className="flex items-center justify-between py-1 mb-5">
          <div className="flex items-center gap-1.5" style={{ color: '#775746' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#775746' }}>verified_user</span>
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#775746' }}>
              {t.terms.demoTag}
            </span>
          </div>
          <span
            className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
            style={{ background: '#e5e2dc', color: '#140804' }}
          >
            {t.common.demo}
          </span>
        </div>

        {/* Hero shield */}
        <div className="flex flex-col items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,212,189,0.6)' }}>
            <div className="w-11 h-11 rounded-full flex items-center justify-center shadow-inner" style={{ background: '#140804' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24, color: '#ffdbc9' }}>verified_user</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="self-start text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ background: '#ebe8e2', color: '#775746' }}>
              {t.terms.badge}
            </span>
            <h1 className="text-[30px] font-bold leading-[38px] tracking-tight whitespace-pre-line" style={{ color: '#140804' }}>
              {t.terms.heading}
            </h1>
            <p className="text-sm leading-relaxed mt-1" style={{ color: '#4f4541' }}>
              {t.terms.subtitle}
            </p>
          </div>
        </div>

        {/* Feature cards */}
        <div className="flex flex-col gap-4 mb-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-start gap-3.5 p-4 rounded-xl"
              style={{
                background: '#ffffff',
                border: '1px solid #e5dfd5',
                boxShadow: '0 2px 8px rgba(45,30,24,0.04)',
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: '#f6f3ed', color: '#775746' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{f.icon}</span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-sm" style={{ color: '#140804' }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#4f4541' }}>{f.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Agreement checkbox */}
        <div
          className="p-4 rounded-xl flex items-start gap-3 mb-6 transition-all"
          style={{
            background: '#ffffff',
            border: agreed ? '1.5px solid #2d1e18' : '1px solid #e5dfd5',
            boxShadow: '0 2px 8px rgba(45,30,24,0.04)',
          }}
        >
          <input
            id="terms-check"
            type="checkbox"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            className="mt-0.5 w-5 h-5 rounded cursor-pointer accent-[#2d1e18] flex-shrink-0"
          />
          <label htmlFor="terms-check" className="text-xs leading-relaxed cursor-pointer select-none" style={{ color: '#140804' }}>
            {t.terms.checkbox}
          </label>
        </div>

        {/* Continue button */}
        <button
          type="button"
          onClick={handleContinue}
          disabled={!agreed}
          className="w-full h-12 rounded-xl flex items-center justify-center font-semibold text-sm transition-all duration-150 active:scale-[0.99]"
          style={{
            background: agreed ? '#2d1e18' : '#ebe8e2',
            color: agreed ? '#ffffff' : '#817470',
            cursor: agreed ? 'pointer' : 'not-allowed',
            boxShadow: agreed ? '0 4px 12px rgba(45,30,24,0.2)' : 'none',
          }}
        >
          {t.terms.continueBtn}
        </button>
      </main>
    </div>
  );
}
