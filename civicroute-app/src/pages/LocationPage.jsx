import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AREAS, AUTHORITIES } from '../data/areas';
import AppHeader from '../components/AppHeader';
import StepBar from '../components/StepBar';

export default function LocationPage() {
  const navigate = useNavigate();
  const { state, update } = useApp();
  const [selectedAreaId, setSelectedAreaId] = useState(state.selectedArea?.id || '');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedArea = AREAS.find(a => a.id === selectedAreaId) || null;
  const authority = selectedArea ? AUTHORITIES[selectedArea.authorityId] : null;

  function handleSelectArea(area) {
    setSelectedAreaId(area.id);
    setDropdownOpen(false);
  }

  function handleContinue() {
    if (!selectedArea) return;
    update({ selectedArea });
    navigate('/report');
  }

  return (
    <div className="page-enter min-h-screen flex flex-col" style={{ background: '#fcf9f3' }}>
      <AppHeader title="Location Selection" showBack={true} />
      <main className="flex-1 max-w-[390px] w-full mx-auto pt-16 pb-10">

        {/* Demo bar */}
        <div className="px-5 pt-2 pb-1 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#4f4541' }}>verified_user</span>
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#4f4541' }}>Public Service Demo</span>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full" style={{ background: '#ebe8e2', color: '#4f4541' }}>Demo</span>
        </div>

        <StepBar currentStep={1} completedUpTo={0} />

        {/* Section header */}
        <header className="px-5 pt-3 pb-2 flex flex-col gap-1">
          <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#4f4541' }}>KNOW YOUR NEIGHBORHOOD</span>
          <h1 className="text-[26px] font-bold leading-[34px] tracking-tight" style={{ color: '#140804' }}>Who looks after your street?</h1>
          <p className="text-sm" style={{ color: '#4f4541' }}>Choose your area to find the right civic team.</p>
        </header>

        <div className="px-5 flex flex-col gap-4 mt-2">
          {/* Area dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold" style={{ color: '#140804' }} htmlFor="area-select">
              Your area in Karachi
            </label>
            <div className="relative">
              <button
                id="area-select"
                type="button"
                onClick={() => setDropdownOpen(v => !v)}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all"
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #d9d2c7',
                  boxShadow: '0 2px 8px rgba(45,30,24,0.04)',
                }}
                aria-expanded={dropdownOpen}
                aria-haspopup="listbox"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#775746' }}>location_on</span>
                  <span className="font-semibold text-sm truncate" style={{ color: selectedArea ? '#140804' : '#817470' }}>
                    {selectedArea ? selectedArea.label : 'Select an area…'}
                  </span>
                </div>
                <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#775746' }}>
                  {dropdownOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                </span>
              </button>

              {dropdownOpen && (
                <ul
                  role="listbox"
                  className="absolute z-20 w-full mt-1 rounded-xl overflow-hidden"
                  style={{ background: '#ffffff', boxShadow: '0 8px 24px rgba(45,30,24,0.12)', border: '1px solid #e5dfd5' }}
                >
                  {AREAS.map(area => (
                    <li key={area.id} role="option" aria-selected={area.id === selectedAreaId}>
                      <button
                        type="button"
                        onClick={() => handleSelectArea(area)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
                        style={{
                          background: area.id === selectedAreaId ? '#f0eee8' : 'transparent',
                          color: '#140804',
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#775746' }}>
                          {area.id === selectedAreaId ? 'location_on' : 'radio_button_unchecked'}
                        </span>
                        <div>
                          <div className="font-semibold text-sm">{area.label}</div>
                          <div className="text-xs" style={{ color: '#4f4541' }}>{area.ward} · {AUTHORITIES[area.authorityId].shortName}</div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <p className="text-xs pl-1" style={{ color: '#4f4541' }}>
              Sample areas include Gulshan-e-Iqbal, Nazimabad and Saddar.
            </p>
          </div>

          {/* Stylized map visual */}
          <div
            className="relative w-full rounded-xl overflow-hidden"
            style={{ background: '#f6f3ed', aspectRatio: '16/10', boxShadow: '0 2px 8px rgba(45,30,24,0.04)' }}
          >
            <svg className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 225">
              <path d="M-20 60 C80 50, 160 120, 240 70 C300 30, 360 90, 400 80" fill="none" stroke="#E5DFD5" strokeLinecap="round" strokeWidth="28" />
              <path d="M120 -20 C130 80, 190 140, 210 240" fill="none" stroke="#E5DFD5" strokeLinecap="round" strokeWidth="20" />
              <path d="M-10 180 C90 150, 230 190, 380 140" fill="none" stroke="#EFECE4" strokeLinecap="round" strokeWidth="14" />
              <path d="M260 -10 C240 60, 310 120, 350 200" fill="none" stroke="#EFECE4" strokeWidth="16" />
              {selectedArea && (
                <rect fill="#ffd4bd" fillOpacity="0.2" height="90" rx="10" stroke="#775746" strokeDasharray="4 4" strokeWidth="1.5" width="130" x="175" y="65" />
              )}
            </svg>

            {/* City label */}
            <div className="absolute left-6 top-8">
              <span className="text-[11px] font-bold uppercase tracking-wider opacity-75" style={{ color: '#775746' }}>Karachi</span>
            </div>

            {/* Map pins for each area */}
            {AREAS.map(area => {
              const isSelected = area.id === selectedAreaId;
              return (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => handleSelectArea(area)}
                  className="absolute flex flex-col items-center transition-all"
                  style={{
                    left: `${area.mapPinX}%`,
                    top: `${area.mapPinY}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isSelected ? 10 : 5,
                  }}
                  aria-label={`Select ${area.label}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${isSelected ? 'animate-bounce' : ''}`}
                    style={{ background: isSelected ? '#2d1e18' : '#ffffff', border: '2px solid #2d1e18' }}
                  >
                    <span className="material-symbols-outlined filled" style={{ fontSize: isSelected ? 20 : 16, color: isSelected ? '#ffffff' : '#775746', fontVariationSettings: "'FILL' 1" }}>location_on</span>
                  </div>
                  {isSelected && (
                    <div className="mt-1 px-2.5 py-1 rounded-full shadow-sm text-center" style={{ background: '#140804' }}>
                      <span className="text-[11px] font-bold tracking-tight whitespace-nowrap" style={{ color: '#ffffff' }}>
                        {area.label.split(',')[0]}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}

            {/* Map badge */}
            <div className="absolute right-3 bottom-3">
              <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.9)', color: '#4f4541' }}>
                Illustrative map only
              </span>
            </div>
          </div>

          {/* Authority card */}
          {selectedArea && authority ? (
            <div
              className="rounded-xl p-4 flex flex-col gap-3"
              style={{ background: '#ffffff', boxShadow: '0 2px 8px rgba(45,30,24,0.04)', border: '1px solid #e5dfd5' }}
            >
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#775746' }}>account_balance</span>
                <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#775746' }}>RESPONSIBLE AUTHORITY</span>
              </div>
              <div className="flex flex-col">
                <h2 className="font-semibold" style={{ color: '#140804', fontSize: 18, lineHeight: '24px' }}>{authority.shortName}</h2>
                <p className="text-xs" style={{ color: '#4f4541' }}>{authority.department} · {authority.city}</p>
              </div>
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <span className="px-2.5 py-1 rounded text-[11px] font-semibold" style={{ background: '#f0eee8', color: '#140804' }}>
                  {selectedArea.ward} · sample
                </span>
                <span className="px-2.5 py-1 rounded text-[11px]" style={{ background: '#f0eee8', color: '#4f4541' }}>
                  {selectedArea.block}
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#4f4541' }}>{authority.description}</p>
            </div>
          ) : (
            <div
              className="rounded-xl p-4 flex items-center gap-3"
              style={{ background: '#f6f3ed', border: '1px dashed #d2c3be' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#817470' }}>account_balance</span>
              <p className="text-sm" style={{ color: '#817470' }}>Select an area above to see the responsible authority.</p>
            </div>
          )}

          {/* Continue */}
          <div className="flex flex-col gap-2 pb-4">
            <button
              type="button"
              onClick={handleContinue}
              disabled={!selectedArea}
              className="w-full h-12 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-all active:scale-[0.99]"
              style={{
                background: selectedArea ? '#140804' : '#e5dfd5',
                color: selectedArea ? '#ffffff' : '#a19588',
                cursor: selectedArea ? 'pointer' : 'not-allowed',
                boxShadow: selectedArea ? '0 4px 12px rgba(45,30,24,0.2)' : 'none',
              }}
            >
              <span>Report an issue</span>
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_forward</span>
            </button>
            <p className="text-xs text-center opacity-75" style={{ color: '#4f4541' }}>
              Illustrative authority assignment. Verify before use.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
