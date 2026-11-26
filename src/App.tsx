import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  LayoutGrid,
  Maximize2,
  Minimize2,
  Mouse,
  RotateCcw,
  StickyNote,
  X,
} from 'lucide-react';
import { SlideRenderer } from './components/SlideRenderer';
import { SLIDES, SPEAKERS } from './data/presentationData';

function formatElapsed(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function hasScrollableParent(target: EventTarget | null, deltaY: number): boolean {
  let el = target instanceof HTMLElement ? target : null;
  while (el && el !== document.body) {
    if (el.dataset.scrollLock === 'true' || el.id === 'slide-stage') {
      const canScrollDown = el.scrollTop + el.clientHeight < el.scrollHeight - 2;
      const canScrollUp = el.scrollTop > 2;
      if ((deltaY > 0 && canScrollDown) || (deltaY < 0 && canScrollUp)) {
        return true;
      }
    }
    const style = window.getComputedStyle(el);
    const overflowY = style.overflowY;
    if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight + 4) {
      const canScrollDown = el.scrollTop + el.clientHeight < el.scrollHeight - 2;
      const canScrollUp = el.scrollTop > 2;
      if ((deltaY > 0 && canScrollDown) || (deltaY < 0 && canScrollUp)) {
        return true;
      }
    }
    el = el.parentElement;
  }
  return false;
}

export function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const lastWheelRef = useRef<number>(0);

  const currentSlide = SLIDES[currentIndex];
  const speaker = SPEAKERS[currentSlide.speaker];
  const progressPercent = ((currentIndex + 1) / SLIDES.length) * 100;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, SLIDES.length - 1));
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      // Ignore if fullscreen is blocked
    }
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'ArrowLeft' || e.key === ' ' || e.key === 'PageDown' || e.key === 'ArrowDown') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowRight' || e.key === 'PageUp' || e.key === 'ArrowUp') {
        e.preventDefault();
        goPrev();
      } else if (e.key.toLowerCase() === 'n') {
        setShowNotes((prev) => !prev);
      } else if (e.key.toLowerCase() === 'g') {
        setShowOverview((prev) => !prev);
      } else if (e.key.toLowerCase() === 'f') {
        void toggleFullscreen();
      } else if (e.key === 'Escape') {
        setShowOverview(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, toggleFullscreen]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (showOverview) return;
      if (Math.abs(e.deltaY) < 18) return;
      if (hasScrollableParent(e.target, e.deltaY)) return;

      const now = Date.now();
      if (now - lastWheelRef.current < 420) return;
      lastWheelRef.current = now;

      if (e.deltaY > 0) {
        goNext();
      } else {
        goPrev();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [goNext, goPrev, showOverview]);

  return (
    <div
      className="deck-backdrop"
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1rem 2.2rem 1.1rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient Drifting Orbs */}
      <div
        className="ambient-orb"
        style={{
          width: '360px',
          height: '360px',
          top: '-110px',
          left: '8%',
          background: 'rgba(61, 220, 132, 0.14)',
        }}
      />
      <div
        className="ambient-orb"
        style={{
          width: '340px',
          height: '340px',
          bottom: '-100px',
          right: '6%',
          background: 'rgba(56, 189, 248, 0.13)',
          animationDelay: '4s',
        }}
      />
      {/* Top Minimal Presenter Bar */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          minHeight: '38px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <span
            style={{
              padding: '0.32rem 0.85rem',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              background: `${speaker.color}1c`,
              border: `1px solid ${speaker.color}55`,
              color: speaker.color,
              whiteSpace: 'nowrap',
            }}
          >
            {speaker.name}
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            گروه هفتم • سیستم‌عامل اندروید
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <button
            type="button"
            title="ریست تایمر ارائه"
            onClick={() => setElapsedSeconds(0)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.4rem 0.7rem',
              borderRadius: '999px',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-surface)',
              color: 'var(--text-secondary)',
              fontSize: '0.76rem',
              cursor: 'pointer',
            }}
          >
            <Clock size={13} color="#3ddc84" />
            <span className="mono">{formatElapsed(elapsedSeconds)}</span>
            <RotateCcw size={11} color="#64748b" />
          </button>

          <button
            type="button"
            title="یادداشت ارائه‌دهنده (N)"
            onClick={() => setShowNotes((prev) => !prev)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.38rem',
              padding: '0.4rem 0.78rem',
              borderRadius: '999px',
              border: showNotes ? '1px solid var(--android-green)' : '1px solid var(--border-subtle)',
              background: showNotes ? 'var(--android-green-dim)' : 'var(--bg-surface)',
              color: showNotes ? '#3ddc84' : 'var(--text-secondary)',
              fontSize: '0.76rem',
              cursor: 'pointer',
            }}
          >
            <StickyNote size={14} />
            <span>اسکریپت (N)</span>
          </button>

          <button
            type="button"
            title="نمای کلی اسلایدها (G)"
            onClick={() => setShowOverview(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.38rem',
              padding: '0.4rem 0.78rem',
              borderRadius: '999px',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-surface)',
              color: 'var(--text-secondary)',
              fontSize: '0.76rem',
              cursor: 'pointer',
            }}
          >
            <LayoutGrid size={14} />
            <span>فهرست (G)</span>
          </button>

          <button
            type="button"
            title="تمام‌صفحه (F)"
            onClick={() => void toggleFullscreen()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.4rem 0.6rem',
              borderRadius: '999px',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-surface)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
        </div>
      </header>

      {/* Main Centered Presentation Stage */}
      <main
        id="slide-stage"
        key={currentSlide.id}
        className="slide-animate"
        style={{
          flex: 1,
          minHeight: 0,
          maxWidth: '1240px',
          width: '100%',
          margin: '0 auto',
          padding: '0.65rem 0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '1.15rem',
          overflowY: 'auto',
        }}
      >
        {currentSlide.id !== 'cover' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.28rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span
                className="mono"
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: speaker.color,
                  background: `${speaker.color}18`,
                  padding: '0.14rem 0.5rem',
                  borderRadius: '6px',
                }}
              >
                SLIDE {String(currentSlide.number).padStart(2, '0')}
              </span>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                {speaker.role}
              </span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.55rem, 2.7vw, 2.1rem)',
                fontWeight: 900,
                lineHeight: 1.3,
                color: '#ffffff',
              }}
            >
              {currentSlide.title}
            </h2>
            <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {currentSlide.subtitle}
            </p>
          </div>
        )}

        <div style={{ flex: currentSlide.id === 'cover' ? 1 : 'initial', minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <SlideRenderer slide={currentSlide} onStartPresentation={goNext} />
        </div>
      </main>

      {/* Speaker Notes Drawer */}
      {showNotes && (
        <aside
          style={{
            maxWidth: '1240px',
            width: '100%',
            margin: '0 auto 0.55rem',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-accent)',
            borderRadius: '16px',
            padding: '0.85rem 1.2rem',
            maxHeight: '155px',
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#3ddc84' }}>
              نکات گفتاری ({speaker.name}) — زمان پیشنهادی: {currentSlide.durationMin} دقیقه
            </span>
            <button
              type="button"
              onClick={() => setShowNotes(false)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          </div>
          <ul style={{ paddingRight: '1.1rem', fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {currentSlide.speakerNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          {currentSlide.transitionCue && (
            <p style={{ marginTop: '0.35rem', fontSize: '0.8rem', color: '#fbbf24' }}>
              <strong>جمله اتصال به بخش بعد:</strong> {currentSlide.transitionCue}
            </p>
          )}
        </aside>
      )}

      {/* Sleek Floating Bottom Navigation Dock */}
      <footer style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          className="floating-dock"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.9rem',
            padding: '0.42rem 0.6rem',
            width: 'min(760px, 100%)',
          }}
        >
          <button
            type="button"
            onClick={goPrev}
            disabled={currentIndex === 0}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.38rem 0.78rem',
              borderRadius: '999px',
              border: '1px solid var(--border-subtle)',
              background: 'rgba(255,255,255,0.04)',
              color: currentIndex === 0 ? 'var(--text-muted)' : 'var(--text-primary)',
              cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
              fontSize: '0.8rem',
            }}
          >
            <ChevronRight size={15} />
            <span>قبلی</span>
          </button>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ flex: 1, height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #38bdf8, #fbbf24, #3ddc84)',
                  transition: 'width 0.28s ease',
                }}
              />
            </div>
            <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
              {currentIndex + 1} / {SLIDES.length}
            </span>
          </div>

          <div
            title="اسکرول موس یا کلیدهای جهت‌نما"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              padding: '0 0.25rem',
            }}
          >
            <Mouse size={13} />
            <span>اسکرول</span>
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={currentIndex === SLIDES.length - 1}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.38rem 0.85rem',
              borderRadius: '999px',
              border: '1px solid var(--border-accent)',
              background: currentIndex === SLIDES.length - 1 ? 'rgba(255,255,255,0.04)' : 'var(--android-green-dim)',
              color: currentIndex === SLIDES.length - 1 ? 'var(--text-muted)' : '#3ddc84',
              cursor: currentIndex === SLIDES.length - 1 ? 'not-allowed' : 'pointer',
              fontSize: '0.8rem',
              fontWeight: 700,
            }}
          >
            <span>بعدی</span>
            <ChevronLeft size={15} />
          </button>
        </div>
      </footer>

      {/* Slide Overview Modal */}
      {showOverview && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 8, 13, 0.92)',
            backdropFilter: 'blur(12px)',
            zIndex: 50,
            padding: '1.75rem 2.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>نقشه ۳۴ اسلاید ارائه (گروه هفتم)</h3>
            <button
              type="button"
              onClick={() => setShowOverview(false)}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                borderRadius: '999px',
                padding: '0.45rem 0.9rem',
                cursor: 'pointer',
              }}
            >
              بستن (Esc)
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '0.85rem',
              overflowY: 'auto',
            }}
          >
            {SLIDES.map((s, idx) => {
              const sSpeaker = SPEAKERS[s.speaker];
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setCurrentIndex(idx);
                    setShowOverview(false);
                  }}
                  style={{
                    textAlign: 'right',
                    padding: '0.95rem',
                    borderRadius: '16px',
                    border: isCurrent ? '1.5px solid #3ddc84' : '1px solid var(--border-subtle)',
                    background: isCurrent ? 'var(--bg-elevated)' : 'var(--bg-surface)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="mono" style={{ fontSize: '0.78rem', color: sSpeaker.color }}>
                      #{s.number}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: sSpeaker.color }}>{sSpeaker.name}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{s.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {s.subtitle}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
