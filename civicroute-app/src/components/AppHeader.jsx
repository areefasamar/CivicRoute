import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

export default function AppHeader({ title, showBack = true }) {
  const navigate = useNavigate();
  return (
    <header
      className="fixed top-0 w-full z-50 pt-safe"
      style={{
        background: 'rgba(252,249,243,0.85)',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 1px 8px rgba(45,30,24,0.05)',
      }}
    >
      <div className="h-16 px-5 flex items-center justify-between max-w-[390px] mx-auto">
        <div className="flex items-center gap-2">
          {showBack && (
            <button
              aria-label="Go back"
              onClick={() => navigate(-1)}
              className="w-11 h-11 -ml-1 flex items-center justify-center rounded-full text-primary hover:bg-surface-container active:scale-95 transition-all"
              style={{ color: '#140804' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 22 }}>arrow_back</span>
            </button>
          )}
          <Logo className="h-7 w-auto" />
          <span
            className="font-semibold tracking-tight ml-1 text-sm"
            style={{ color: '#140804' }}
          >
            CivicRoute
          </span>
        </div>
        {title && (
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-semibold truncate max-w-[120px]"
              style={{ color: '#4f4541' }}
            >
              {title}
            </span>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: '#140804' }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 18, color: '#ffffff' }}
              >
                person
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
