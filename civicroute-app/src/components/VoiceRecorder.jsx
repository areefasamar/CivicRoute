import { useState, useRef, useEffect } from 'react';

export default function VoiceRecorder({
  lang = 'en',
  t,
  onTranscript,
  voiceNoteUrl,
  voiceDuration = 0,
  onVoiceRecorded,
  onRemoveVoice,
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const recognitionRef = useRef(null);
  const audioPlayerRef = useRef(null);
  const streamRef = useRef(null);

  // Format seconds as mm:ss
  function formatTime(sec) {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch { /* ignore */ }
      }
    };
  }, []);

  async function startRecording() {
    setErrorMsg('');
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setErrorMsg(t?.notSupported || 'Audio recording is not supported in this browser.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioChunksRef.current = [];

      let mimeType = 'audio/webm';
      if (!MediaRecorder.isTypeSupported('audio/webm')) {
        if (MediaRecorder.isTypeSupported('audio/mp4')) {
          mimeType = 'audio/mp4';
        } else {
          mimeType = '';
        }
      }

      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = e => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const finalBlob = new Blob(audioChunksRef.current, {
          type: recorder.mimeType || 'audio/webm',
        });
        const url = URL.createObjectURL(finalBlob);
        if (onVoiceRecorded) {
          onVoiceRecorded({ blob: finalBlob, url, duration: recordingSeconds });
        }
      };

      recorder.start(250);
      setIsRecording(true);
      setRecordingSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);

      // Start Speech Recognition if supported
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognitionRef.current = recognition;
          recognition.continuous = true;
          recognition.interimResults = true;

          // Language selection for speech-to-text
          if (lang === 'sd') {
            recognition.lang = 'sd-PK';
          } else if (lang === 'ur') {
            recognition.lang = 'ur-PK';
          } else {
            recognition.lang = 'en-PK';
          }

          recognition.onresult = event => {
            let fullTranscript = '';
            for (let i = 0; i < event.results.length; i++) {
              fullTranscript += event.results[i][0].transcript + ' ';
            }
            if (fullTranscript.trim() && onTranscript) {
              onTranscript(fullTranscript.trim());
            }
          };

          recognition.onerror = e => {
            // If Sindhi language code fails in certain browsers, retry with Urdu fallback
            if (lang === 'sd' && (e.error === 'language-not-supported' || e.error === 'no-speech')) {
              try {
                recognition.lang = 'ur-PK';
                recognition.start();
              } catch {
                /* ignore */
              }
            }
          };

          recognition.start();
        } catch {
          // Non-blocking: speech-to-text may not be available on all devices, audio recorder will still work!
        }
      }
    } catch {
      setErrorMsg(t?.micBlocked || 'Microphone access denied. Please allow microphone permissions.');
      setIsRecording(false);
    }
  }

  function stopRecording() {
    if (timerRef.current) clearInterval(timerRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch { /* ignore */ }
    }
    setIsRecording(false);
  }

  function togglePlay() {
    if (!audioPlayerRef.current) return;
    if (isPlaying) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    } else {
      audioPlayerRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }

  function handleAudioTimeUpdate() {
    if (!audioPlayerRef.current) return;
    const current = audioPlayerRef.current.currentTime;
    const dur = audioPlayerRef.current.duration || voiceDuration || 1;
    setPlaybackProgress((current / dur) * 100);
  }

  function handleAudioEnded() {
    setIsPlaying(false);
    setPlaybackProgress(0);
  }

  return (
    <div className="flex flex-col gap-2">
      {/* If recording is actively running */}
      {isRecording ? (
        <div
          className="flex items-center justify-between p-3.5 rounded-xl border transition-all"
          style={{
            background: 'rgba(255,212,189,0.25)',
            borderColor: '#775746',
            boxShadow: '0 2px 10px rgba(119,87,70,0.12)',
          }}
        >
          <div className="flex items-center gap-3">
            {/* Pulsing recording light */}
            <div className="relative flex items-center justify-center">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-ping absolute" />
              <span className="w-3 h-3 rounded-full bg-red-600 relative" />
            </div>

            {/* Audio wave animation */}
            <div className="flex items-center gap-0.5 h-5">
              {[60, 100, 40, 80, 50, 90].map((h, i) => (
                <span
                  key={i}
                  className="w-1 bg-[#775746] rounded-full"
                  style={{
                    height: `${h}%`,
                    animation: `pulse 0.7s infinite alternate ${i * 0.12}s`,
                  }}
                />
              ))}
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-bold" style={{ color: '#140804' }}>
                {t?.recording || 'Recording voice note…'}
              </span>
              <span className="text-[11px] font-mono font-semibold" style={{ color: '#775746' }}>
                {formatTime(recordingSeconds)} · {t?.listening || 'Speak now'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={stopRecording}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 shadow-sm"
            style={{ background: '#140804', color: '#ffffff' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>stop</span>
            <span>{t?.stop || 'Done'}</span>
          </button>
        </div>
      ) : voiceNoteUrl ? (
        /* Audio playback preview card */
        <div
          className="flex items-center justify-between p-3 rounded-xl border transition-all"
          style={{
            background: '#ffffff',
            borderColor: '#e5dfd5',
            boxShadow: '0 2px 8px rgba(45,30,24,0.04)',
          }}
        >
          <audio
            ref={audioPlayerRef}
            src={voiceNoteUrl}
            onTimeUpdate={handleAudioTimeUpdate}
            onEnded={handleAudioEnded}
            className="hidden"
          />

          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              type="button"
              onClick={togglePlay}
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-transform active:scale-95 shadow-sm"
              style={{ background: '#2d1e18', color: '#ffffff' }}
              aria-label={isPlaying ? t?.pause : t?.play}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>

            <div className="flex flex-col min-w-0 flex-1 pr-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold truncate" style={{ color: '#140804' }}>
                  {t?.voiceAttached || 'Voice note attached'}
                </span>
                <span className="text-[11px] font-mono text-[#817470]">
                  {formatTime(voiceDuration || recordingSeconds || 0)}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#f0eee8] h-1.5 rounded-full overflow-hidden mt-1.5">
                <div
                  className="h-full bg-[#775746] transition-all duration-150 rounded-full"
                  style={{ width: `${playbackProgress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              type="button"
              onClick={startRecording}
              className="p-1.5 rounded-lg hover:bg-[#f0eee8] text-[#775746] transition-colors"
              title={t?.reRecord || 'Re-record'}
              aria-label="Re-record voice"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>refresh</span>
            </button>
            <button
              type="button"
              onClick={onRemoveVoice}
              className="p-1.5 rounded-lg hover:bg-[#f0eee8] text-[#ba1a1a] transition-colors"
              title={t?.remove || 'Remove'}
              aria-label="Remove voice note"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>delete</span>
            </button>
          </div>
        </div>
      ) : (
        /* Idle button to start recording */
        <button
          type="button"
          onClick={startRecording}
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-dashed transition-all hover:border-[#775746] active:scale-[0.99]"
          style={{
            background: 'rgba(255,212,189,0.15)',
            borderColor: '#d2c3be',
          }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 shadow-xs"
              style={{ background: '#ffd4bd', color: '#7a5a48' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 17 }}>mic</span>
            </div>
            <div className="flex flex-col text-left rtl:text-right">
              <span className="text-xs font-bold" style={{ color: '#140804' }}>
                {t?.speakOrRecord || 'Speak or record audio'}
              </span>
              <span className="text-[11px]" style={{ color: '#817470' }}>
                {t?.tapToSpeak || 'Tap mic to speak or record voice'}
              </span>
            </div>
          </div>

          <span
            className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1 flex-shrink-0"
            style={{ background: '#ffffff', color: '#775746', border: '1px solid #e5dfd5' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 13 }}>record_voice_over</span>
            {t?.voiceNote || 'Voice'}
          </span>
        </button>
      )}

      {/* Error message if microphone is blocked */}
      {errorMsg && (
        <div
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs"
          style={{ background: '#ffdad6', color: '#93000a' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>error</span>
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
}

