import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AUTHORITIES } from '../data/areas';
import { generateLetter } from '../lib/generateLetter';
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
  const [lang, setLang] = useState(state.letterLang || 'en');
  const [letterText, setLetterText] = useState('');
  const [sending, setSending] = useState(false);
  const [editing, setEditing] = useState(false);

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
      lang,
    });
    setLetterText(text);
  }, [lang, state.selectedArea, state.selectedIssue, state.description, state.email]);

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

  return (
    <div className="page-enter min-h-screen flex flex-col" style={{ background: '#fcf9f3' }}>
      <AppHeader title="Formal Letter Preview" showBack={!sending} />
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
              <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#7a5a48' }}>Your voice, clearly put</span>
            </div>
            <h1 className="text-[26px] font-bold leading-[34px] tracking-tight" style={{ color: '#140804' }}>Review your letter</h1>
            <p className="text-sm mt-0.5" style={{ color: '#4f4541' }}>Check the details before the final step.</p>
          </section>

          {/* Language + "To:" */}
          <section className="px-5 flex flex-col gap-3 mb-4">
            {/* Language toggle */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold" style={{ color: '#4f4541' }}>Letter language</span>
              <div
                className="inline-flex p-1 rounded-xl gap-1"
                style={{ background: '#f0eee8', boxShadow: 'inset 0 1px 3px rgba(45,30,24,0.08)' }}
                role="tablist"
              >
                {['en', 'ur'].map(l => (
                  <button
                    key={l}
                    type="button"
                    role="tab"
                    aria-selected={lang === l}
                    onClick={() => setLang(l)}
                    className="px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200"
                    style={{
                      background: lang === l ? '#140804' : 'transparent',
                      color: lang === l ? '#ffffff' : '#4f4541',
                      boxShadow: lang === l ? '0 1px 3px rgba(45,30,24,0.15)' : 'none',
                    }}
                  >
                    {l === 'en' ? 'English' : 'اردو'}
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
                <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#4f4541' }}>To:</span>
                <span
                  className="text-[11px] font-medium px-2 py-0.5 rounded"
                  style={{ background: 'rgba(244,188,117,0.2)', color: '#643f00' }}
                >
                  Sample contact · not deliverable
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
                  <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#140804' }}>Complaint Letter</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                    style={{ background: '#f0eee8', color: '#4f4541' }}
                  >
                    Draft · {lang === 'en' ? 'English' : 'Urdu'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditing(v => !v)}
                    className="text-[11px] font-semibold px-2 py-0.5 rounded"
                    style={{ color: '#775746' }}
                    aria-label={editing ? 'Stop editing' : 'Edit letter'}
                  >
                    {editing ? 'Done' : 'Edit'}
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
                    direction: isUrdu ? 'rtl' : 'ltr',
                    fontFamily: isUrdu ? "'Noto Nastaliq Urdu', serif" : 'inherit',
                  }}
                  value={letterText}
                  onChange={e => setLetterText(e.target.value)}
                  aria-label="Edit complaint letter"
                />
              ) : (
                <article
                  dir={isUrdu ? 'rtl' : 'ltr'}
                  style={{ fontFamily: isUrdu ? "'Noto Nastaliq Urdu', serif" : 'inherit' }}
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
            <section className="px-5 mb-5">
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
                      1 photo attached
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 pl-2 flex-shrink-0">
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#4f4541' }}>attach_file</span>
                  <span className="text-xs font-semibold" style={{ color: '#775746' }}>View</span>
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
                  <span>Sending…</span>
                </>
              ) : (
                <>
                  <span>Send complaint</span>
                  <span className="material-symbols-outlined" style={{ fontSize: 19 }}>send</span>
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
                  {sending ? 'Dispatching simulated complaint…' : 'Ready to send'}
                </span>
              </div>
              <p className="text-xs text-center px-4" style={{ color: '#817470' }}>
                Demo only. No email will be sent to an authority.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
