import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import Logo from './Logo';

export default function AppHeader({ title, showBack = true }) {
  const navigate = useNavigate();
  const { state, setLang } = useApp();
  const currentLang = state.lang || 'en';
  const t = translations[currentLang] || translations.en;
  const isRtl = t.dir === 'rtl';

  const langs = [
    { code: 'en', label: 'EN' },
    { code: 'ur', label: 'اردو' },
    { code: 'sd', label: 'سنڌي' },
  ];

  return (
    <header
      className="sticky top-0 w-full z-40"
      style={{
        background: 'rgba(252,249,243,0.92)',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 1px 8px rgba(45,30,24,0.05)',
      }}
    >
      <div className="h-14 ps-3.5 pe-3.5 flex items-center justify-between gap-2 w-full">
        {/* Logo and Back/Title Section */}
        <div className="flex items-center gap-1.5 min-w-0 flex-shrink overflow-hidden">
          {showBack && (
            <button
              type="button"
              aria-label={t.common.back}
              onClick={() => navigate(-1)}
              className="w-8 h-8 -ms-1 flex items-center justify-center rounded-full text-primary hover:bg-[#ebe8e2] active:scale-95 transition-all flex-shrink-0"
              style={{ color: '#140804' }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 20, transform: isRtl ? 'scaleX(-1)' : 'none' }}
              >
                arrow_back
              </span>
            </button>
          )}

          <div className="flex-shrink-0 whitespace-nowrap flex items-center">
            <Logo className="h-6 w-auto flex-shrink-0 whitespace-nowrap" />
          </div>

          {title && (
            <span
              className="font-bold tracking-tight text-xs truncate min-w-0 ms-1"
              style={{ color: '#140804' }}
            >
              {title}
            </span>
          )}
        </div>

        {/* Language selector toggle */}
        <div
          className="flex items-center rounded-full p-0.5 gap-0.5 flex-shrink min-w-0"
          style={{ background: '#ebe8e2', boxShadow: 'inset 0 1px 2px rgba(45,30,24,0.06)' }}
          role="radiogroup"
          aria-label="Language selection"
        >
          {langs.map(l => {
            const isSelected = currentLang === l.code;
            return (
              <button
                key={l.code}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setLang(l.code)}
                className="px-1.5 sm:px-2 py-0.5 rounded-full text-[10.5px] sm:text-[11px] font-semibold transition-all duration-150 whitespace-nowrap flex-shrink-0"
                style={{
                  background: isSelected ? '#ffffff' : 'transparent',
                  color: isSelected ? '#140804' : '#775746',
                  boxShadow: isSelected ? '0 1px 3px rgba(45,30,24,0.1)' : 'none',
                }}
              >
                {l.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
