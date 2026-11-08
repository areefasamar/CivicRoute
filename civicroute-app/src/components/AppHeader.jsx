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
      <div className="h-14 px-4 flex items-center justify-between w-full">
        <div className="flex items-center gap-1.5 min-w-0">
          {showBack && (
            <button
              type="button"
              aria-label={t.common.back}
              onClick={() => navigate(-1)}
              className="w-9 h-9 -ml-1 flex items-center justify-center rounded-full text-primary hover:bg-[#ebe8e2] active:scale-95 transition-all flex-shrink-0"
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
          <Logo className="h-6 w-auto flex-shrink-0" />
          <span
            className="font-bold tracking-tight text-sm truncate"
            style={{ color: '#140804' }}
          >
            {title ? title : 'CivicRoute'}
          </span>
        </div>

        {/* Language selector toggle */}
        <div
          className="flex items-center rounded-full p-0.5 gap-0.5 flex-shrink-0"
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
                className="px-2 py-0.5 rounded-full text-[11px] font-semibold transition-all duration-150"
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
