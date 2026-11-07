import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Logo from '../components/Logo';

const translations = {
  en: {
    headline: 'Find out who is responsible for your street.',
    subtitle: 'Your neighborhood. The right authority. A clearer way to get things moving.',
    emailLabel: 'Email address',
    emailPlaceholder: 'you@example.com',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Enter your password',
    forgotPassword: 'Forgot password?',
    login: 'Log in',
    or: 'or',
    google: 'Continue with Google',
    newUser: 'New to CivicRoute?',
    signUp: 'Sign up',
  },
  ur: {
    headline: 'جانیں کہ آپ کی گلی کا ذمہ دار کون ہے۔',
    subtitle: 'آپ کا محلہ۔ صحیح ادارہ۔ مسائل حل کرنے کا واضح راستہ۔',
    emailLabel: 'ای میل پتہ',
    emailPlaceholder: 'آپ@مثال.com',
    passwordLabel: 'پاس ورڈ',
    passwordPlaceholder: 'پاس ورڈ درج کریں',
    forgotPassword: 'پاس ورڈ بھول گئے؟',
    login: 'لاگ ان کریں',
    or: 'یا',
    google: 'گوگل سے جاری رکھیں',
    newUser: 'CivicRoute میں نئے ہیں؟',
    signUp: 'اکاؤنٹ بنائیں',
  },
};

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { update } = useApp();
  const [lang, setLang] = useState('en');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const t = translations[lang];
  const isRtl = lang === 'ur';

  function validate() {
    const e = {};
    if (!email.trim()) e.email = 'Email is required';
    else if (!validateEmail(email)) e.email = 'Enter a valid email address';
    if (!password.trim()) e.password = 'Password is required';
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
          {/* Language toggle */}
          <div
            className="flex items-center rounded-full p-0.5 gap-0.5"
            style={{ background: '#ebe8e2' }}
          >
            {['en', 'ur'].map(l => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className="px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  background: lang === l ? '#ffffff' : 'transparent',
                  color: lang === l ? '#140804' : '#4f4541',
                  boxShadow: lang === l ? '0 1px 3px rgba(45,30,24,0.08)' : 'none',
                }}
              >
                {l === 'en' ? 'English' : 'اردو'}
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
            {t.headline}
          </h1>
          <p className="text-sm mt-1 leading-relaxed" style={{ color: '#4f4541' }}>
            {t.subtitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold tracking-wide" style={{ color: '#4f4541' }} htmlFor="email">
              {t.emailLabel}
            </label>
            <div className="relative flex items-center">
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className="w-full py-3.5 pl-4 pr-11 rounded-xl text-sm outline-none transition-all duration-150"
                style={{
                  background: '#ffffff',
                  color: '#140804',
                  border: errors.email ? '1.5px solid #ba1a1a' : '1.5px solid #d9d2c7',
                }}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              <span className="material-symbols-outlined absolute right-3.5 pointer-events-none" style={{ fontSize: 20, color: '#775746' }}>mail</span>
            </div>
            {errors.email && (
              <p id="email-error" className="text-xs" style={{ color: '#ba1a1a' }}>{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold tracking-wide" style={{ color: '#4f4541' }} htmlFor="password">
              {t.passwordLabel}
            </label>
            <div className="relative flex items-center">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={t.passwordPlaceholder}
                className="w-full py-3.5 pl-4 pr-11 rounded-xl text-sm outline-none transition-all duration-150"
                style={{
                  background: '#ffffff',
                  color: '#140804',
                  border: errors.password ? '1.5px solid #ba1a1a' : '1.5px solid #d9d2c7',
                }}
                aria-describedby={errors.password ? 'pw-error' : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3.5 flex items-center justify-center p-1"
                aria-label="Toggle password visibility"
                style={{ color: '#775746' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                  {showPassword ? 'visibility' : 'visibility_off'}
                </span>
              </button>
            </div>
            {errors.password && (
              <p id="pw-error" className="text-xs" style={{ color: '#ba1a1a' }}>{errors.password}</p>
            )}
            <div className="flex justify-end pt-1">
              <a href="#" className="text-xs font-semibold" style={{ color: '#775746' }}>{t.forgotPassword}</a>
            </div>
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-all duration-150 active:scale-[0.99]"
            style={{
              background: loading ? '#e5dfd5' : '#2d1e18',
              color: loading ? '#a19588' : '#ffffff',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 2px 8px rgba(45,30,24,0.2)',
            }}
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin" style={{ fontSize: 18 }}>progress_activity</span>
                <span>Signing in…</span>
              </>
            ) : (
              <>
                <span>{t.login}</span>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-6">
          <div className="w-full h-px" style={{ background: '#e5e2dc' }} />
          <span className="absolute px-3 text-xs uppercase tracking-wider" style={{ background: '#fcf9f3', color: '#817470' }}>{t.or}</span>
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={handleGoogle}
          className="w-full py-3.5 px-4 rounded-xl flex items-center justify-center gap-3 font-semibold text-sm transition-colors duration-150"
          style={{ background: '#ffffff', color: '#140804', border: '1.5px solid #d9d2c7' }}
        >
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
          </svg>
          <span>{t.google}</span>
        </button>

        {/* Sign up link */}
        <div className="mt-6 text-center">
          <p className="text-xs" style={{ color: '#4f4541' }}>
            {t.newUser}{' '}
            <a href="#" className="text-xs font-bold" style={{ color: '#140804' }}>{t.signUp}</a>
          </p>
        </div>
      </main>
    </div>
  );
}
