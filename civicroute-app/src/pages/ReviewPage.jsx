import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AUTHORITIES } from '../data/areas';
import { generateLetter } from '../lib/generateLetter';
import { translations } from '../data/translations';
import AppHeader from '../components/AppHeader';
import StepBar from '../components/StepBar';

function generateRefNumber() {
  const rand = String(Math.floor(Math.random() * 9000) + 1000);
  const now = new Date();
  const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  return `CR-${dateStr}-${rand}`;
}

export default function ReviewPage() {
  const navigate = useNavigate();
  const { state, update } = useApp();
  const appLang = state.lang || 'en';
  const [lang, setLang] = useState(state.letterLang || appLang);
  const [letterText, setLetterText] = useState('');
  const [sending, setSending] = useState(false);
  const [editing, setEditing] = useState(false);

  const t = translations[appLang] || translations.en;
  const authority = state.selectedArea ? AUTHORITIES[state.selectedArea.authorityId] : null;

  // Generate letter whenever deps change
  useEffect(() => {
    if (!state.selectedArea || !state.selectedIssue) return;
    const text = generateLetter({
      date: new Date(),
      email: state.email,
      area: state.selectedArea,
      issue: state.selectedIssue,
      description: state.description,
      hasVoice: !!state.voiceNoteUrl,
      hasPhoto: !!state.photoPreviewUrl,
      lang,
    });
    setLetterText(text);
  }, [lang, state.selectedArea, state.selectedIssue, state.description, state.email, state.voiceNoteUrl, state.photoPreviewUrl]);

  function handleSend() {
    if (sending) return;
    setSending(true);
    const sentAt = new Date();
    const refNumber = generateRefNumber();
    update({ letterText, letterLang: lang, sentAt, refNumber });
    setTimeout(() => {
      navigate('/sent');
    }, 1500);
  }

  const isUrdu = lang === 'ur';
  const isSindhi = lang === 'sd';
  const isLetterRtl = isUrdu || isSindhi;
  const letterFont = isSindhi
    ? "'Noto Sans Arabic', system-ui, sans-serif"
    : isUrdu
    ? "'Noto Nastaliq Urdu', serif"
    : 'inherit';

  const langs = [
    { code: 'en', label: 'English' },
    { code: 'ur', label: 'اردو' },
    { code: 'sd', label: 'سنڌي' },
  ];

  function getLangDisplay(code) {
    if (code === 'sd') return 'سنڌي';
    if (code === 'ur') return 'Urdu';
    return 'English';
  }

  return (
    <div className="page-enter min-h-screen flex flex-col" style={{ background: '#fcf9f3' }}>
      <AppHeader title={t.headers.review} showBack={!sending} />
      <main className="flex-1 max-w-[390px] w-full mx-auto pt-16 pb-10">
        <div className="pb-10">
          <StepBar currentStep={3} completedUpTo={2} />

          {/* Section badge */}
          <section className="px-5 pt-2 pb-4">
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full mb-1.5"
              style={{ background: 'rgba(255,212,189,0.5)' }}
            >
              <span className="material-symbols-outlined filled" style={{ fontSize: 14, color: '#7a5a48', fontVariationSettings: "'FILL' 1" }}>verified</span>
              <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#7a5a48' }}>
                {t.review.badge}
              </span>
            </div>
            <h1 className="text-[26px] font-bold leading-[34px] tracking-tight" style={{ color: '#140804' }}>
              {t.review.heading}
            </h1>
            <p className="text-sm mt-0.5" style={{ color: '#4f4541' }}>
              {t.review.subtitle}
            </p>
          </section>

          {/* Language + "To:" */}
          <section className="px-5 flex flex-col gap-3 mb-4">
            {/* Language toggle: English, Urdu, Sindhi */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold" style={{ color: '#4f4541' }}>
                {t.review.letterLang}
              </span>
              <div
                className="inline-flex p-1 rounded-xl gap-1"
                style={{ background: '#f0eee8', boxShadow: 'inset 0 1px 3px rgba(45,30,24,0.08)' }}
                role="tablist"
              >
                {langs.map(l => (
                  <button
                    key={l.code}
                    type="button"
                    role="tab"
                    aria-selected={lang === l.code}
                    onClick={() => setLang(l.code)}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200"
                    style={{
                      background: lang === l.code ? '#140804' : 'transparent',
                      color: lang === l.code ? '#ffffff' : '#4f4541',
                      boxShadow: lang === l.code ? '0 1px 3px rgba(45,30,24,0.15)' : 'none',
                    }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* To: field */}
            <div
              className="p-3.5 rounded-xl flex flex-col gap-1"
              style={{ background: '#ffffff', border: '1px solid #e5dfd5', boxShadow: '0 2px 8px rgba(45,30,24,0.04)' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#4f4541' }}>
                  {t.review.toLabel}
                </span>
                <span
                  className="text-[11px] font-medium px-2 py-0.5 rounded"
                  style={{ background: 'rgba(244,188,117,0.2)', color: '#643f00' }}
                >
                  {t.review.sampleContact}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: '#ffd4bd', color: '#7a5a48' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 15 }}>alternate_email</span>
                </div>
                <span className="font-semibold text-sm break-all" style={{ color: '#140804' }}>
                  {authority?.email || 'authority@example.com'}
                </span>
              </div>
            </div>
          </section>

          {/* Letter container */}
          <section className="px-5 mb-5">
            <div
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{
                background: '#ffffff',
                border: '1px solid #e5dfd5',
                boxShadow: '0 4px 16px rgba(45,30,24,0.08)',
              }}
            >
              {/* Decorative top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ background: 'linear-gradient(90deg, #775746, #140804, #775746)' }}
              />

              {/* Letter ribbon */}
              <div className="flex items-center justify-between pb-4 pt-1">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#140804' }}>description</span>
                  <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#140804' }}>
                    {t.review.complaintLetter}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                    style={{ background: '#f0eee8', color: '#4f4541' }}
                  >
                    {t.review.draft} · {getLangDisplay(lang)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditing(v => !v)}
                    className="text-[11px] font-semibold px-2 py-0.5 rounded hover:bg-[#f0eee8] transition-colors"
                    style={{ color: '#775746' }}
                    aria-label={editing ? t.review.done : t.review.edit}
                  >
                    {editing ? t.review.done : t.review.edit}
                  </button>
                </div>
              </div>

              {/* Letter body */}
              {editing ? (
                <textarea
                  className="w-full text-sm leading-relaxed resize-none outline-none rounded-lg p-3 font-mono"
                  style={{
                    background: '#f6f3ed',
                    color: '#140804',
                    minHeight: 300,
                    direction: isLetterRtl ? 'rtl' : 'ltr',
                    fontFamily: letterFont,
                  }}
                  value={letterText}
                  onChange={e => setLetterText(e.target.value)}
                  aria-label="Edit complaint letter"
                />
              ) : (
                <article
                  dir={isLetterRtl ? 'rtl' : 'ltr'}
                  style={{ fontFamily: letterFont }}
                >
                  <pre
                    className="text-sm leading-relaxed whitespace-pre-wrap"
                    style={{ color: '#1c1c18', fontFamily: 'inherit', margin: 0 }}
                  >
                    {letterText}
                  </pre>
                </article>
              )}
            </div>
          </section>

          {/* Photo attachment chip */}
          {state.photoPreviewUrl && (
            <section className="px-5 mb-3">
              <div
                className="flex items-center justify-between p-3.5 rounded-xl"
                style={{ background: '#ffffff', border: '1px solid #e5dfd5', boxShadow: '0 2px 8px rgba(45,30,24,0.04)' }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={state.photoPreviewUrl}
                    alt="Attached photo"
                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-sm truncate" style={{ color: '#140804' }}>
                      {state.photoFile?.name || 'photo.jpg'}
                    </span>
                    <span className="text-xs" style={{ color: '#4f4541' }}>
                      {t.review.photoAttached}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 pl-2 flex-shrink-0">
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#4f4541' }}>photo_camera</span>
                  <span className="text-xs font-semibold" style={{ color: '#775746' }}>{t.common.attached}</span>
                </div>
              </div>
            </section>
          )}

          {/* Voice Note attachment chip */}
          {state.voiceNoteUrl && (
            <section className="px-5 mb-5">
              <div
                className="flex items-center justify-between p-3.5 rounded-xl"
                style={{ background: '#ffffff', border: '1px solid #e5dfd5', boxShadow: '0 2px 8px rgba(45,30,24,0.04)' }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: '#ffd4bd', color: '#7a5a48' }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>mic</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-sm truncate" style={{ color: '#140804' }}>
                      {t.review.voiceAttached}
                    </span>
                    <span className="text-xs" style={{ color: '#4f4541' }}>
                      {state.voiceDuration ? `${state.voiceDuration}s audio` : 'Audio clip'} · {t.common.attached}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 pl-2 flex-shrink-0">
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#4f4541' }}>graphic_eq</span>
                  <span className="text-xs font-semibold" style={{ color: '#775746' }}>{t.common.attached}</span>
                </div>
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="px-5 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleSend}
              disabled={sending}
              className="w-full h-12 rounded-xl flex items-center justify-center gap-2.5 font-semibold text-sm transition-all active:scale-[0.99]"
              style={{
                background: sending ? '#ebe8e2' : '#140804',
                color: sending ? '#817470' : '#ffffff',
                cursor: sending ? 'not-allowed' : 'pointer',
                boxShadow: sending ? 'none' : '0 4px 12px rgba(45,30,24,0.2)',
              }}
            >
              {sending ? (
                <>
                  <span className="material-symbols-outlined animate-spin" style={{ fontSize: 19 }}>progress_activity</span>
                  <span>{t.review.sending}</span>
                </>
              ) : (
                <>
                  <span>{t.review.sendComplaint}</span>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 19, transform: t.dir === 'rtl' ? 'scaleX(-1)' : 'none' }}
                  >
                    send
                  </span>
                </>
              )}
            </button>

            <div className="flex flex-col items-center gap-2 pt-1">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
                style={{ background: '#f0eee8', color: '#4f4541' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 15, color: '#775746' }}>
                  {sending ? 'progress_activity' : 'check_circle'}
                </span>
                <span className="text-[11px] font-medium">
                  {sending ? t.review.dispatching : t.review.readyToSend}
                </span>
              </div>
              <p className="text-xs text-center px-4" style={{ color: '#817470' }}>
                {t.review.demoDisclaimer}
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
