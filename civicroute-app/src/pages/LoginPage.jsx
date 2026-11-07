import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import Logo from '../components/Logo';

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { state, update, setLang } = useApp();
  const lang = state.lang || 'en';
  const t = translations[lang] || translations.en;
  const isRtl = t.dir === 'rtl';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const langs = [
    { code: 'en', label: 'English' },
    { code: 'ur', label: 'اردو' },
    { code: 'sd', label: 'سنڌي' },
  ];

  function validate() {
    const e = {};
    if (!email.trim()) e.email = t.login.errors.emailRequired;
    else if (!validateEmail(email)) e.email = t.login.errors.emailInvalid;
    if (!password.trim()) e.password = t.login.errors.passwordRequired;
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      update({ email });
      navigate('/terms');
    }, 800);
  }

  function handleGoogle() {
    update({ email: 'user@google.example.com' });
    navigate('/terms');
  }

  return (
    <div
      className="page-enter min-h-screen flex flex-col"
      style={{ background: '#fcf9f3', direction: isRtl ? 'rtl' : 'ltr' }}
    >
      <main className="flex-1 max-w-[390px] w-full mx-auto px-5 flex flex-col pb-10">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          <Logo className="h-8 w-auto" />
          {/* Language toggle: 3 options */}
          <div
            className="flex items-center rounded-full p-0.5 gap-0.5"
            style={{ background: '#ebe8e2' }}
            role="radiogroup"
            aria-label="Language selection"
          >
            {langs.map(l => (
              <button
                key={l.code}
                type="button"
                role="radio"
                aria-checked={lang === l.code}
                onClick={() => setLang(l.code)}
                className="px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  background: lang === l.code ? '#ffffff' : 'transparent',
                  color: lang === l.code ? '#140804' : '#4f4541',
                  boxShadow: lang === l.code ? '0 1px 3px rgba(45,30,24,0.08)' : 'none',
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Illustration */}
        <div
          className="w-full relative mt-2 mb-5 flex justify-center items-center overflow-hidden rounded-xl py-4"
          style={{ background: '#f6f3ed' }}
        >
          <svg className="w-full max-w-[290px] h-36" fill="none" viewBox="0 0 290 144">
            <circle cx="145" cy="85" fill="#EBD9C7" fillOpacity="0.45" r="62" />
            <path d="M42 98V76C42 76 46 64 56 64C66 64 70 76 70 76V98H42Z" fill="#D4C4B0" fillOpacity="0.6" />
            <rect fill="#B39F88" height="7" rx="1.5" width="4" x="54" y="58" />
            <path d="M198 98V68C198 68 204 55 218 55C232 55 238 68 238 68V98H198Z" fill="#D4C4B0" fillOpacity="0.55" />
            <rect fill="#B39F88" height="8" rx="1.5" width="4" x="216" y="49" />
            <circle cx="84" cy="74" fill="#879679" fillOpacity="0.5" r="14" />
            <circle cx="94" cy="70" fill="#758567" fillOpacity="0.65" r="11" />
            <circle cx="180" cy="73" fill="#879679" fillOpacity="0.55" r="16" />
            <circle cx="170" cy="77" fill="#758567" fillOpacity="0.7" r="11" />
            <rect fill="#FFFFFF" height="40" rx="3" width="38" x="96" y="58" />
            <rect fill="#C9AF98" height="5" rx="1.5" width="38" x="96" y="54" />
            <rect fill="#3D261D" height="12" rx="2" width="9" x="103" y="66" />
            <rect fill="#3D261D" height="12" rx="2" width="9" x="119" y="66" />
            <rect fill="#FBF9F4" height="52" rx="2" width="34" x="131" y="46" />
            <path d="M131 46H165V42C165 42 160 38 148 38C136 38 131 42 131 42V46Z" fill="#775746" />
            <rect fill="#3D261D" height="22" rx="9" width="18" x="139" y="52" />
            <rect fill="#E5DFD5" height="18" rx="2" width="8" x="144" y="80" />
            <rect fill="#FFFFFF" height="37" rx="2" width="34" x="162" y="61" />
            <rect fill="#A89481" height="4" rx="1.5" width="34" x="162" y="58" />
            <rect fill="#3D261D" height="10" rx="2" width="10" x="174" y="69" />
            <rect fill="#FFFFFF" height="22" rx="2" width="22" x="34" y="76" />
            <path d="M32 76L45 66L58 76H32Z" fill="#A89481" />
            <rect fill="#3D261D" height="14" rx="1" width="7" x="41" y="84" />
            <rect fill="#E3DDD1" height="4" rx="2" width="250" x="20" y="98" />
            <path d="M28 128C75 128 92 112 142 112C195 112 214 102 258 102" stroke="#4F6D55" strokeLinecap="round" strokeWidth="5" />
            <path d="M28 128C75 128 92 112 142 112C195 112 214 102 258 102" stroke="#FFFFFF" strokeDasharray="3 4" strokeLinecap="round" strokeWidth="1.8" />
            <circle cx="56" cy="125" fill="#2D1E18" r="4.5" />
            <circle cx="56" cy="125" fill="#FFFFFF" r="2" />
            <circle cx="132" cy="113" fill="#2D1E18" r="5" />
            <circle cx="132" cy="113" fill="#FFFFFF" r="2.2" />
            <circle cx="218" cy="104" fill="#2D1E18" r="5" />
            <circle cx="218" cy="104" fill="#FFFFFF" r="2.2" />
          </svg>
        </div>

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-[26px] font-bold leading-[34px] tracking-tight" style={{ color: '#140804' }}>
            {t.login.headline}
          </h1>
          <p className="text-sm mt-1 leading-relaxed" style={{ color: '#4f4541' }}>
            {t.login.subtitle}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          {/* Email input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold" style={{ color: '#140804' }} htmlFor="email">
              {t.login.emailLabel}
            </label>
            <div
              className="flex items-center px-3.5 py-3 rounded-xl transition-all"
              style={{
                background: '#ffffff',
                border: errors.email ? '1.5px solid #ba1a1a' : '1.5px solid #d9d2c7',
                boxShadow: '0 2px 8px rgba(45,30,24,0.04)',
              }}
            >
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: '' })); }}
                placeholder={t.login.emailPlaceholder}
                className="w-full bg-transparent text-sm outline-none placeholder:opacity-50"
                style={{ color: '#140804' }}
              />
            </div>
            {errors.email && (
              <p className="text-xs mt-0.5" style={{ color: '#ba1a1a' }}>{errors.email}</p>
            )}
          </div>

          {/* Password input */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold" style={{ color: '#140804' }} htmlFor="password">
                {t.login.passwordLabel}
              </label>
              <button
                type="button"
                onClick={() => alert('Password reset demo')}
                className="text-xs font-medium hover:underline"
                style={{ color: '#775746' }}
              >
                {t.login.forgotPassword}
              </button>
            </div>
            <div
              className="flex items-center px-3.5 py-3 rounded-xl transition-all"
              style={{
                background: '#ffffff',
                border: errors.password ? '1.5px solid #ba1a1a' : '1.5px solid #d9d2c7',
                boxShadow: '0 2px 8px rgba(45,30,24,0.04)',
              }}
            >
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={e => { setPassword(e.target.value); if (errors.password) setErrors(prev => ({ ...prev, password: '' })); }}
                placeholder={t.login.passwordPlaceholder}
                className="w-full bg-transparent text-sm outline-none placeholder:opacity-50"
                style={{ color: '#140804' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="text-xs ml-2 font-medium"
                style={{ color: '#817470' }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
            {errors.password && (
              <p className="text-xs mt-0.5" style={{ color: '#ba1a1a' }}>{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl flex items-center justify-center font-semibold text-sm transition-all duration-150 active:scale-[0.99] mt-1"
            style={{
              background: '#2d1e18',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(45,30,24,0.2)',
            }}
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin" style={{ fontSize: 20 }}>
                progress_activity
              </span>
            ) : (
              t.login.login
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-[1px]" style={{ background: '#e5dfd5' }} />
          <span className="text-xs uppercase tracking-wider" style={{ color: '#817470' }}>{t.login.or}</span>
          <div className="flex-1 h-[1px]" style={{ background: '#e5dfd5' }} />
        </div>

        {/* Google sign-in */}
        <button
          type="button"
          onClick={handleGoogle}
          className="w-full h-12 rounded-xl flex items-center justify-center gap-2.5 font-semibold text-sm transition-all duration-150 active:scale-[0.99]"
          style={{
            background: '#ffffff',
            border: '1.5px solid #d9d2c7',
            color: '#140804',
            boxShadow: '0 2px 8px rgba(45,30,24,0.04)',
          }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.43 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.98 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.57 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>{t.login.google}</span>
        </button>

        {/* Sign up prompt */}
        <p className="text-center text-xs mt-6" style={{ color: '#4f4541' }}>
          {t.login.newUser}{' '}
          <button
            type="button"
            onClick={() => alert('Sign up demo')}
            className="font-bold underline"
            style={{ color: '#140804' }}
          >
            {t.login.signUp}
          </button>
        </p>
      </main>
    </div>
  );
}
