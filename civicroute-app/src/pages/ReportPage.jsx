import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ISSUE_TYPES, AUTHORITIES } from '../data/areas';
import { translations } from '../data/translations';
import AppHeader from '../components/AppHeader';
import StepBar from '../components/StepBar';
import VoiceRecorder from '../components/VoiceRecorder';

export default function ReportPage() {
  const navigate = useNavigate();
  const { state, update } = useApp();
  const lang = state.lang || 'en';
  const t = translations[lang] || translations.en;
  const isRtl = t.dir === 'rtl';

  const [selectedIssueId, setSelectedIssueId] = useState(state.selectedIssue?.id || '');
  const [description, setDescription] = useState(state.description || '');
  const [photoFile, setPhotoFile] = useState(state.photoFile || null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState(state.photoPreviewUrl || null);
  const [voiceNoteBlob, setVoiceNoteBlob] = useState(state.voiceNoteBlob || null);
  const [voiceNoteUrl, setVoiceNoteUrl] = useState(state.voiceNoteUrl || null);
  const [voiceDuration, setVoiceDuration] = useState(state.voiceDuration || 0);
  const [issueError, setIssueError] = useState('');
  const fileInputRef = useRef(null);

  const selectedIssue = ISSUE_TYPES.find(i => i.id === selectedIssueId) || null;
  const authority = state.selectedArea ? AUTHORITIES[state.selectedArea.authorityId] : null;

  // Check if authority handles this issue
  const issueNotHandled =
    selectedIssue && authority && !authority.handles.includes(selectedIssue.label);

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
    const url = URL.createObjectURL(file);
    setPhotoFile(file);
    setPhotoPreviewUrl(url);
  }

  function handleRemovePhoto() {
    if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
    setPhotoFile(null);
    setPhotoPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function handleVoiceTranscript(transcript) {
    setDescription(prev => {
      const trimmed = prev ? prev.trim() : '';
      if (!trimmed) return transcript;
      // If previous text already ends with this transcript, don't duplicate
      if (trimmed.endsWith(transcript)) return trimmed;
      return `${trimmed} ${transcript}`;
    });
  }

  function handleVoiceRecorded({ blob, url, duration }) {
    setVoiceNoteBlob(blob);
    setVoiceNoteUrl(url);
    setVoiceDuration(duration);
  }

  function handleRemoveVoice() {
    if (voiceNoteUrl) URL.revokeObjectURL(voiceNoteUrl);
    setVoiceNoteBlob(null);
    setVoiceNoteUrl(null);
    setVoiceDuration(0);
  }

  function handleContinue() {
    if (!selectedIssue) {
      setIssueError(t.report.issueError);
      return;
    }
    setIssueError('');
    update({
      selectedIssue,
      description,
      photoFile,
      photoPreviewUrl,
      voiceNoteBlob,
      voiceNoteUrl,
      voiceDuration,
    });
    navigate('/review');
  }

  return (
    <div className="page-enter min-h-screen flex flex-col" style={{ background: '#fcf9f3' }}>
      <AppHeader title={t.headers.report} showBack={true} />
      <main className="flex-1 max-w-[390px] w-full mx-auto pt-16 pb-10">
        <div className="px-5 flex flex-col gap-5 pb-4">
          <StepBar currentStep={2} completedUpTo={1} />

          {/* Section badge + heading */}
          <div className="flex flex-col gap-1 mt-1">
            <span
              className="self-start text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
              style={{ background: '#ffd4bd', color: '#7a5a48' }}
            >
              {t.report.badge}
            </span>
            <h1 className="text-[26px] font-bold leading-[34px] tracking-tight" style={{ color: '#140804' }}>
              {t.report.heading}
            </h1>
            <p className="text-sm" style={{ color: '#4f4541' }}>
              {t.report.subtitle}
            </p>
          </div>

          {/* Current location pill */}
          <div
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl"
            style={{ background: '#f6f3ed', boxShadow: '0 1px 4px rgba(45,30,24,0.04)' }}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined flex-shrink-0" style={{ fontSize: 20, color: '#775746' }}>location_on</span>
              <span className="font-semibold text-sm truncate" style={{ color: '#140804' }}>
                {state.selectedArea?.label || t.report.noAreaSelected}
              </span>
            </div>
            <button
              type="button"
              onClick={() => navigate('/location')}
              className="font-semibold text-sm flex-shrink-0 ml-2 hover:underline"
              style={{ color: '#775746' }}
            >
              {t.common.change}
            </button>
          </div>

          {/* Issue selection grid */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-sm" style={{ color: '#140804' }}>
                {t.report.chooseIssue}
              </label>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {ISSUE_TYPES.map(issue => {
                const isSelected = issue.id === selectedIssueId;
                const translatedLabel = t.issues[issue.id] || issue.label;
                return (
                  <button
                    key={issue.id}
                    type="button"
                    onClick={() => { setSelectedIssueId(issue.id); setIssueError(''); }}
                    className="flex flex-col justify-between p-3.5 h-24 rounded-xl text-left rtl:text-right transition-all relative"
                    style={{
                      background: isSelected ? '#ebe8e2' : '#ffffff',
                      border: isSelected ? '2px solid #2d1e18' : '1.5px solid #e5dfd5',
                      boxShadow: '0 2px 8px rgba(45,30,24,0.04)',
                    }}
                    aria-pressed={isSelected}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: 24, color: isSelected ? '#140804' : '#4f4541' }}
                      >
                        {issue.icon}
                      </span>
                      {isSelected && (
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background: '#2d1e18' }}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: 13, color: '#ffffff' }}>check</span>
                        </div>
                      )}
                    </div>
                    <span
                      className="text-xs leading-tight"
                      style={{ color: '#140804', fontWeight: isSelected ? 700 : 600 }}
                    >
                      {translatedLabel}
                    </span>
                  </button>
                );
              })}
            </div>
            {issueError && (
              <p className="text-xs" style={{ color: '#ba1a1a' }}>{issueError}</p>
            )}
          </div>

          {/* Issue not handled note */}
          {issueNotHandled && (
            <div
              className="flex items-start gap-2 px-4 py-3 rounded-xl"
              style={{ background: '#ffddb6', border: '1px solid #f4bc75' }}
            >
              <span className="material-symbols-outlined flex-shrink-0" style={{ fontSize: 18, color: '#643f00' }}>info</span>
              <p className="text-xs leading-relaxed" style={{ color: '#643f00' }}>
                {t.report.unhandledWarning(
                  authority?.shortName || '',
                  authority?.handles.join(' and ') || '',
                  t.issues[selectedIssue?.id] || selectedIssue?.label || ''
                )}
              </p>
            </div>
          )}

          {/* Photo upload */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-sm" style={{ color: '#140804' }}>
                {t.report.addPhoto}
              </label>
              <span className="text-xs" style={{ color: '#817470' }}>{t.report.photoTip}</span>
            </div>

            {photoPreviewUrl ? (
              <div
                className="rounded-xl overflow-hidden flex flex-col gap-2.5 p-3"
                style={{ background: '#ffffff', border: '1px solid #e5dfd5', boxShadow: '0 2px 8px rgba(45,30,24,0.04)' }}
              >
                <div className="relative w-full h-36 rounded-lg overflow-hidden" style={{ background: '#ebe8e2' }}>
                  <img
                    src={photoPreviewUrl}
                    alt="Issue photo preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: 'rgba(20,8,4,0.08)' }} />
                  <span
                    className="absolute bottom-2 left-2 rtl:left-auto rtl:right-2 px-2 py-0.5 rounded flex items-center gap-1 text-[11px] font-semibold"
                    style={{ background: 'rgba(45,30,24,0.75)', color: '#ffffff' }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>photo_camera</span>
                    {t.common.attached}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-0.5 px-0.5">
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-sm truncate" style={{ color: '#140804' }}>{photoFile?.name || 'photo.jpg'}</span>
                    <span className="text-xs" style={{ color: '#4f4541' }}>
                      {photoFile ? `${(photoFile.size / (1024 * 1024)).toFixed(1)} MB` : ''} · {t.report.photoAdded}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="font-semibold text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors"
                    style={{ background: '#f0eee8', color: '#775746' }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>delete</span>
                    {t.common.remove}
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex flex-col items-center justify-center gap-2 py-6 rounded-xl transition-all"
                style={{
                  background: '#ffffff',
                  border: '2px dashed #d9d2c7',
                  color: '#775746',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 28, color: '#775746' }}>add_photo_alternate</span>
                <span className="font-semibold text-sm" style={{ color: '#775746' }}>{t.report.tapToAddPhoto}</span>
                <span className="text-xs" style={{ color: '#817470' }}>{t.report.photoFormats}</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handlePhotoChange}
              aria-label="Upload issue photo"
            />
          </div>

          {/* Description + Voice Option */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-sm" style={{ color: '#140804' }} htmlFor="description">
                {t.report.tellMore}
              </label>
              <span className="text-xs" style={{ color: '#817470' }}>{t.common.optional}</span>
            </div>

            {/* Voice recording & speech input component */}
            <VoiceRecorder
              lang={lang}
              t={t.voice}
              onTranscript={handleVoiceTranscript}
              voiceNoteUrl={voiceNoteUrl}
              voiceDuration={voiceDuration}
              onVoiceRecorded={handleVoiceRecorded}
              onRemoveVoice={handleRemoveVoice}
            />

            {/* Textarea for written or transcribed description */}
            <div
              className="rounded-xl p-3 transition-all"
              style={{
                background: '#ffffff',
                border: '1.5px solid #d9d2c7',
                boxShadow: '0 2px 8px rgba(45,30,24,0.04)',
              }}
            >
              <textarea
                id="description"
                className="w-full bg-transparent text-sm placeholder:opacity-50 resize-none outline-none leading-relaxed"
                style={{ color: '#140804' }}
                placeholder={t.report.placeholder}
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-1 px-1" style={{ color: '#817470' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 15 }}>info</span>
              <span className="text-xs">{t.report.privacyTip}</span>
            </div>
          </div>

          {/* Generate letter CTA */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleContinue}
              className="w-full h-12 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-all active:scale-[0.99]"
              style={{
                background: '#2d1e18',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(45,30,24,0.2)',
              }}
            >
              <span>{t.report.generateLetter}</span>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>description</span>
            </button>
            <p className="text-center text-[11px] mt-2" style={{ color: '#817470' }}>
              {t.report.stepIndicator}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
