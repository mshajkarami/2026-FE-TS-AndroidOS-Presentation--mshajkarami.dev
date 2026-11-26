import { useEffect, useState } from 'react';
import {
  Activity,
  ArrowLeft,
  BatteryCharging,
  CheckCircle2,
  Clock,
  Cpu,
  FileCode2,
  GitFork,
  HardDrive,
  HelpCircle,
  Layers,
  Lock,
  MemoryStick,
  MonitorSmartphone,
  Play,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Terminal,
  Zap,
} from 'lucide-react';
import {
  OS_STACK_LAYERS,
  SECTION_FRAMES,
  TAP_ANATOMY_STEPS,
} from '../data/presentationData';
import type { SectionFrameContent } from '../data/presentationData';
import type { SlideDefinition } from '../types/presentation';
import { ClassQuiz } from './ClassQuiz';
import { LmkSimulator } from './LmkSimulator';
import { PhoneSimulator } from './PhoneSimulator';

interface SlideRendererProps {
  slide: SlideDefinition;
  onStartPresentation?: () => void;
}

function SectionFrameCard({ frame }: { frame: SectionFrameContent }) {
  const isIntro = frame.kind === 'intro';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
      <div
        className="glass-card stagger-1"
        style={{
          borderTop: `3px solid ${frame.color}`,
          background: `linear-gradient(135deg, ${frame.color}1a, rgba(13, 20, 30, 0.92))`,
          padding: '1.5rem 1.75rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
          <span
            style={{
              padding: '0.3rem 0.9rem',
              borderRadius: '999px',
              background: `${frame.color}22`,
              border: `1px solid ${frame.color}55`,
              color: frame.color,
              fontSize: '0.84rem',
              fontWeight: 800,
            }}
          >
            {frame.partLabel} • {frame.presenter}
          </span>
          <span className="mono" style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
            {isIntro ? 'SECTION INTRO' : 'SECTION SUMMARY'}
          </span>
        </div>

        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem', color: '#ffffff' }}>
          {frame.headline}
        </h3>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          {frame.lead}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.95rem' }}>
        {frame.bullets.map((b, idx) => (
          <div
            key={b.title}
            className={`glass-card glass-card-hover stagger-${idx + 2}`}
            style={{ borderRight: `3px solid ${frame.color}` }}
          >
            <div style={{ fontWeight: 800, fontSize: '0.98rem', color: frame.color, marginBottom: '0.35rem' }}>
              {b.title}
            </div>
            <div style={{ fontSize: '0.87rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
              {b.detail}
            </div>
          </div>
        ))}
      </div>

      <div
        className="stagger-5"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '0.88rem 1.25rem',
          borderRadius: '14px',
          background: 'rgba(255,255,255,0.035)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          <strong style={{ color: frame.color }}>{frame.handoffLabel}: </strong>
          {frame.handoffText}
        </span>
        <ArrowLeft size={18} color={frame.color} />
      </div>
    </div>
  );
}

export function SlideRenderer({ slide, onStartPresentation }: SlideRendererProps) {
  const [selectedTapStep, setSelectedTapStep] = useState<number>(1);
  const [autoPlayingTap, setAutoPlayingTap] = useState<boolean>(false);
  const [selectedLayerId, setSelectedLayerId] = useState<string>('kernel');
  const [hookGuess, setHookGuess] = useState<string | null>(null);
  const [easMode, setEasMode] = useState<'idle' | 'gaming'>('idle');
  const [activeSlot, setActiveSlot] = useState<'A' | 'B'>('A');

  useEffect(() => {
    if (!autoPlayingTap) return;
    let current = 1;
    const id = window.setInterval(() => {
      current += 1;
      if (current > 5) {
        setAutoPlayingTap(false);
        window.clearInterval(id);
      } else {
        setSelectedTapStep(current);
      }
    }, 900);
    return () => window.clearInterval(id);
  }, [autoPlayingTap]);

  const activeStep =
    TAP_ANATOMY_STEPS.find((s) => s.step === selectedTapStep) ?? TAP_ANATOMY_STEPS[0];
  const activeLayer =
    OS_STACK_LAYERS.find((l) => l.id === selectedLayerId) ?? OS_STACK_LAYERS[4];

  if (slide.id in SECTION_FRAMES) {
    return <SectionFrameCard frame={SECTION_FRAMES[slide.id]} />;
  }

  switch (slide.id) {
    case 'cover':
      return (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.22fr 0.95fr',
            alignItems: 'center',
            gap: '2.5rem',
            width: '100%',
            padding: '0.5rem 0',
          }}
        >
          {/* Right Column (RTL): Headline, Copy, Team & CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem', textAlign: 'right' }}>
            <div className="stagger-1" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
              <span
                style={{
                  padding: '0.38rem 1rem',
                  borderRadius: '999px',
                  background: 'rgba(61, 220, 132, 0.14)',
                  border: '1px solid rgba(61, 220, 132, 0.45)',
                  color: '#3ddc84',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                }}
              >
                گروه هفتم • درس سیستم‌عامل
              </span>
              <span
                className="mono"
                style={{
                  padding: '0.38rem 0.85rem',
                  borderRadius: '999px',
                  background: 'rgba(56, 189, 248, 0.12)',
                  border: '1px solid rgba(56, 189, 248, 0.35)',
                  color: '#38bdf8',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}
              >
                تاریخ ارائه: ۹/۱۰
              </span>
            </div>

            <div className="stagger-2" style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              <h1
                style={{
                  fontSize: 'clamp(2.8rem, 5vw, 4.4rem)',
                  fontWeight: 900,
                  lineHeight: 1.12,
                  background: 'linear-gradient(100deg, #ffffff 25%, #3ddc84 78%, #38bdf8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {slide.title}
              </h1>
              <div style={{ fontSize: 'clamp(1.2rem, 1.9vw, 1.55rem)', fontWeight: 800, color: '#e2e8f0' }}>
                کالبدشکافی یک کلیک: <span style={{ color: '#3ddc84' }}>از لمس نمایشگر تا قلب کرنل لینوکس</span>
              </div>
              <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '640px', marginTop: '0.2rem' }}>
                سفر کامل مهندسی از وقفه سخت‌افزاری تاچ و <span className="code-pill">Binder IPC</span> تا{' '}
                <span className="code-pill">Zygote / ART</span>، شبیه‌ساز زنده فشار رم (<span className="code-pill">lmkd</span>)، امنیت{' '}
                <span className="code-pill">Rust / pKVM</span> و آزمایش عملی روی شبیه‌ساز گوشی موبایل.
              </p>
            </div>

            {/* 3 Presenter Cards */}
            <div
              className="stagger-3"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.85rem',
              }}
            >
              {[
                { name: 'مهندس حسنپور', tag: 'بخش ۱: کرنل، EAS و HAL', color: '#38bdf8' },
                { name: 'مهندس ریسمانی', tag: 'بخش ۲: Zygote، ART و حافظه', color: '#fbbf24' },
                { name: 'مهندس حاج کرمی', tag: 'بخش ۳: امنیت، گرافیک و دمو', color: '#3ddc84' },
              ].map((member) => (
                <div
                  key={member.name}
                  className="glass-card glass-card-hover"
                  style={{
                    padding: '0.85rem 1rem',
                    borderTop: `2.5px solid ${member.color}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                  }}
                >
                  <span style={{ fontWeight: 900, fontSize: '1rem', color: member.color }}>
                    {member.name}
                  </span>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>{member.tag}</span>
                </div>
              ))}
            </div>

            {/* Primary CTA + Quick Hints */}
            <div className="stagger-4" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.2rem' }}>
              <button
                type="button"
                onClick={onStartPresentation}
                className="pulse-green"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  padding: '0.78rem 1.65rem',
                  borderRadius: '999px',
                  border: '1.5px solid #3ddc84',
                  background: 'linear-gradient(135deg, rgba(61,220,132,0.26), rgba(56,189,248,0.16))',
                  color: '#ffffff',
                  fontSize: '0.98rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                <Play size={16} fill="#3ddc84" color="#3ddc84" />
                <span>شروع ارائه تعاملی</span>
              </button>

              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                جابجایی با اسکرول موس، کلیدهای جهت‌نما یا دکمه Space
              </span>
            </div>
          </div>

          {/* Left Column: Animated Android OS Core Hologram */}
          <div
            className="stagger-2"
            style={{
              position: 'relative',
              height: '440px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Outer rotating dashed orbit */}
            <div
              className="spin-slow"
              style={{
                position: 'absolute',
                width: '370px',
                height: '370px',
                borderRadius: '50%',
                border: '1px dashed rgba(61, 220, 132, 0.28)',
              }}
            />
            {/* Inner reverse rotating orbit */}
            <div
              className="spin-reverse-slow"
              style={{
                position: 'absolute',
                width: '270px',
                height: '270px',
                borderRadius: '50%',
                border: '1px dashed rgba(56, 189, 248, 0.32)',
              }}
            />

            {/* Central Glowing Core Device */}
            <div className="float-slow" style={{ position: 'relative', zIndex: 2 }}>
              <div
                className="pulse-green"
                style={{
                  width: '132px',
                  height: '132px',
                  borderRadius: '34px',
                  background: 'linear-gradient(145deg, rgba(22,35,52,0.96), rgba(9,15,24,0.98))',
                  border: '2px solid rgba(61, 220, 132, 0.65)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                }}
              >
                <Smartphone size={48} color="#3ddc84" />
                <span className="mono" style={{ fontSize: '0.72rem', fontWeight: 700, color: '#3ddc84' }}>
                  ANDROID OS
                </span>
              </div>
            </div>

            {/* 4 Floating Architecture Nodes */}
            <div
              className="glass-card"
              style={{
                position: 'absolute',
                top: '20px',
                right: '14px',
                padding: '0.65rem 0.9rem',
                borderRadius: '14px',
                borderColor: 'rgba(251, 113, 133, 0.45)',
                zIndex: 3,
              }}
            >
              <div className="mono" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fb7185' }}>
                Kernel 6.6 + EAS
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Binder 1-Copy • Wakelock</div>
            </div>

            <div
              className="glass-card"
              style={{
                position: 'absolute',
                top: '48px',
                left: '6px',
                padding: '0.65rem 0.9rem',
                borderRadius: '14px',
                borderColor: 'rgba(251, 191, 36, 0.45)',
                zIndex: 3,
              }}
            >
              <div className="mono" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fbbf24' }}>
                Zygote + ART
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Copy-on-Write • lmkd</div>
            </div>

            <div
              className="glass-card"
              style={{
                position: 'absolute',
                bottom: '34px',
                right: '6px',
                padding: '0.65rem 0.9rem',
                borderRadius: '14px',
                borderColor: 'rgba(56, 189, 248, 0.45)',
                zIndex: 3,
              }}
            >
              <div className="mono" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8' }}>
                UID + SELinux + pKVM
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Rust Safety • Verified Boot</div>
            </div>

            <div
              className="glass-card"
              style={{
                position: 'absolute',
                bottom: '18px',
                left: '22px',
                padding: '0.65rem 0.9rem',
                borderRadius: '14px',
                borderColor: 'rgba(61, 220, 132, 0.45)',
                zIndex: 3,
              }}
            >
              <div className="mono" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3ddc84' }}>
                SurfaceFlinger 120Hz
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>شبیه‌ساز زنده گوشی + ADB</div>
            </div>
          </div>
        </div>
      );

    case 'agenda':
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.15rem', alignItems: 'stretch' }}>
          {[
            {
              part: 'بخش اول • مهندس حسنپور',
              title: 'زیرساخت، کرنل و انتزاع سخت‌افزار',
              color: '#38bdf8',
              time: '۱۰ دقیقه',
              points: [
                'مقدمه بخش + چالش لینوکس دسکتاپ در برابر اندروید',
                'معماری ۵ لایه و سفر ۲۵۰ میلی‌ثانیه‌ای یک کلیک',
                'Binder IPC و زمان‌بندی انرژی‌آگاه CPU (EAS / big.LITTLE)',
                'Wakelocks/Doze، لایه HAL و آپدیت بدون وقفه A/B + نتیجه‌گیری',
              ],
            },
            {
              part: 'بخش دوم • مهندس ریسمانی',
              title: 'اجرای کد، چرخه حیات و حافظه',
              color: '#fbbf24',
              time: '۹ دقیقه',
              points: [
                'مقدمه بخش + زنجیره Boot و جادوی Zygote',
                'تکامل Dalvik تا ART مدرن و خط لوله .dex تا .oat',
                'چرخه حیات، تایمر ۵ ثانیه‌ای ANR و Standby Buckets',
                'نبود Swap، معیار PSS، شبیه‌ساز lmkd و نتیجه‌گیری',
              ],
            },
            {
              part: 'بخش سوم • مهندس حاج کرمی',
              title: 'امنیت، گرافیک، AI و تست زنده',
              color: '#3ddc84',
              time: '۱۲ دقیقه',
              points: [
                'ایزوله‌سازی UID، SELinux، TrustZone (TEE) و Scoped Storage',
                'آینده سیستم‌عامل: Rust در کرنل، pKVM و Project Mainline',
                'گرافیک SurfaceFlinger، هوش مصنوعی روی NPU و معماری ADB/Perfetto',
                'شبیه‌ساز زنده گوشی موبایل + نتیجه‌گیری و مسابقه کلاسی',
              ],
            },
          ].map((sec, idx) => (
            <div
              key={sec.part}
              className={`glass-card glass-card-hover stagger-${idx + 1}`}
              style={{ borderTop: `3px solid ${sec.color}`, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: sec.color }}>{sec.part}</span>
                <span
                  className="mono"
                  style={{
                    fontSize: '0.72rem',
                    color: sec.color,
                    background: `${sec.color}18`,
                    padding: '0.15rem 0.5rem',
                    borderRadius: '999px',
                  }}
                >
                  {sec.time}
                </span>
              </div>
              <h3 style={{ fontSize: '1.12rem', fontWeight: 900 }}>{sec.title}</h3>
              <ul style={{ paddingRight: '1.15rem', fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.88 }}>
                {sec.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

    case 'hook':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.05rem' }}>
          <div
            className="glass-card stagger-1"
            style={{
              background: 'linear-gradient(135deg, rgba(56,189,248,0.14), rgba(61,220,132,0.08))',
              borderColor: 'rgba(56,189,248,0.42)',
              padding: '1.15rem 1.45rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <HelpCircle size={22} color="#38bdf8" />
                <span style={{ fontSize: '1.08rem', fontWeight: 800 }}>
                  چالش کلاسی: اگر فایل اجرایی اوبونتو (مثل VLC یا Python) را روی گوشی اندروید بریزیم، اجرا می‌شود؟
                </span>
              </div>
              {hookGuess && (
                <span
                  className="slide-animate"
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    padding: '0.25rem 0.7rem',
                    borderRadius: '999px',
                    background: hookGuess === 'bionic' ? 'rgba(61,220,132,0.18)' : 'rgba(251,113,133,0.18)',
                    color: hookGuess === 'bionic' ? '#3ddc84' : '#fb7185',
                  }}
                >
                  {hookGuess === 'bionic'
                    ? 'آفرین! دقیقاً به خاطر Bionic libc و نبود X11 اجرا نمی‌شود.'
                    : 'تله مهندسی! کرنل یکی است، ولی کتابخانه‌های فضای کاربر متفاوت‌اند!'}
                </span>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem' }}>
              {[
                { id: 'yes', label: 'بله؛ چون هسته هر دو لینوکس است!' },
                { id: 'bionic', label: 'خیر؛ چون glibc و X11 در اندروید وجود ندارد' },
                { id: 'cpu', label: 'خیر؛ فقط به خاطر فرق معماری CPU است' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setHookGuess(opt.id)}
                  style={{
                    padding: '0.55rem 0.85rem',
                    borderRadius: '10px',
                    border:
                      hookGuess === opt.id
                        ? `1.5px solid ${opt.id === 'bionic' ? '#3ddc84' : '#fb7185'}`
                        : '1px solid var(--border-subtle)',
                    background:
                      hookGuess === opt.id
                        ? opt.id === 'bionic'
                          ? 'rgba(61,220,132,0.16)'
                          : 'rgba(251,113,133,0.16)'
                        : 'rgba(255,255,255,0.04)',
                    color: '#f8fafc',
                    fontSize: '0.83rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'right',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.9rem' }}>
            {[
              {
                icon: <FileCode2 size={24} color="#a78bfa" />,
                title: 'Bionic به جای glibc',
                color: '#a78bfa',
                desc: 'کتابخانه استاندارد C لینوکس برای سرورها سنگین است؛ گوگل Bionic libc را برای مصرف رم کمتر و سرعت بالا نوشت.',
                pill: 'libc: Bionic (BSD)',
              },
              {
                icon: <BatteryCharging size={24} color="#3ddc84" />,
                title: 'خواب عمیق پیش‌فرض',
                color: '#3ddc84',
                desc: 'لینوکس دسکتاپ فرض می‌کند برق وصل است؛ در اندروید CPU پیش‌فرض می‌خوابد مگر با Wakelock بیدار بماند.',
                pill: 'Power: Suspend First',
              },
              {
                icon: <MemoryStick size={24} color="#fbbf24" />,
                title: 'نبود Swap دیسک',
                color: '#fbbf24',
                desc: 'نوشتن Swap روی حافظه فلش آن را فرسوده و کند می‌کند؛ پس zRAM و Low Memory Killer جایگزین شدند.',
                pill: 'Memory: zRAM + lmkd',
              },
              {
                icon: <ShieldCheck size={24} color="#38bdf8" />,
                title: 'یک UID برای هر اپ',
                color: '#38bdf8',
                desc: 'در دسکتاپ همه برنامه‌ها با UID کاربر اجرا می‌شوند؛ در اندروید هر اپلیکیشن یک کاربر لینوکسی مجزا است.',
                pill: 'Security: 1 App = 1 UID',
              },
            ].map((card, idx) => (
              <div
                key={card.title}
                className={`glass-card glass-card-hover stagger-${idx + 2}`}
                style={{ borderTop: `2.5px solid ${card.color}`, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}
              >
                {card.icon}
                <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>{card.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.83rem', lineHeight: 1.72, flex: 1 }}>
                  {card.desc}
                </p>
                <div className="terminal-box" style={{ fontSize: '0.72rem', padding: '0.45rem 0.65rem', color: card.color }}>
                  {card.pill}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'os-stack':
      return (
        <div style={{ display: 'grid', gridTemplateColumns: '1.08fr 1fr', gap: '1.35rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.58rem' }}>
            {OS_STACK_LAYERS.map((layer, idx) => {
              const isSelected = layer.id === activeLayer.id;
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setSelectedLayerId(layer.id)}
                  className={`stagger-${idx + 1}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.88rem 1.15rem',
                    borderRadius: '14px',
                    border: isSelected ? `1.5px solid ${layer.color}` : '1px solid var(--border-subtle)',
                    background: isSelected
                      ? `linear-gradient(90deg, ${layer.color}26, rgba(16,24,36,0.95))`
                      : 'var(--bg-surface)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    textAlign: 'right',
                    transform: isSelected ? 'translateX(-8px)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: isSelected ? layer.color : '#f1f5f9' }}>
                      {layer.faName}
                    </div>
                    <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {layer.name}
                    </div>
                  </div>
                  <span
                    className="mono"
                    style={{
                      fontSize: '0.7rem',
                      padding: '0.22rem 0.58rem',
                      borderRadius: '999px',
                      background: `${layer.color}1a`,
                      color: layer.color,
                      border: `1px solid ${layer.color}44`,
                    }}
                  >
                    {layer.space}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            key={activeLayer.id}
            className="glass-card slide-animate"
            style={{ borderColor: `${activeLayer.color}55`, padding: '1.55rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span style={{ color: activeLayer.color, fontWeight: 900, fontSize: '1.25rem' }}>
                {activeLayer.faName}
              </span>
              <span className="mono" style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                {activeLayer.space}
              </span>
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '1.05rem' }}>
              {activeLayer.summary}
            </p>

            <div style={{ marginBottom: '1.05rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                اجزای کلیدی این لایه:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {activeLayer.components.map((comp) => (
                  <span
                    key={comp}
                    className="mono"
                    style={{
                      fontSize: '0.76rem',
                      padding: '0.28rem 0.65rem',
                      borderRadius: '8px',
                      background: `${activeLayer.color}16`,
                      border: `1px solid ${activeLayer.color}38`,
                      color: activeLayer.color,
                    }}
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>

            <div
              style={{
                padding: '0.8rem 1rem',
                borderRadius: '11px',
                background: 'rgba(255,255,255,0.035)',
                borderRight: `3px solid ${activeLayer.color}`,
                fontSize: '0.87rem',
                color: '#e2e8f0',
              }}
            >
              <strong>نقش در سیستم‌عامل:</strong> {activeLayer.osRole}
            </div>
          </div>
        </div>
      );

    case 'tap-anatomy':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
              روی هر مرحله کلیک کنید یا دکمه پخش خودکار را بزنید تا مسیر ۲۵۰ میلی‌ثانیه‌ای اجرا شود:
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedTapStep(1);
                setAutoPlayingTap(true);
              }}
              disabled={autoPlayingTap}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.95rem',
                borderRadius: '999px',
                border: '1px solid #3ddc84',
                background: 'var(--android-green-dim)',
                color: '#3ddc84',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: autoPlayingTap ? 'wait' : 'pointer',
              }}
            >
              <Play size={14} fill="#3ddc84" />
              <span>{autoPlayingTap ? 'در حال ردیابی کلیک...' : 'پخش انیمیشن کلیک'}</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.8rem' }}>
            {TAP_ANATOMY_STEPS.map((item, idx) => {
              const isSelected = item.step === activeStep.step;
              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => setSelectedTapStep(item.step)}
                  className={`glass-card stagger-${idx + 1}`}
                  style={{
                    textAlign: 'right',
                    padding: '1.05rem',
                    borderColor: isSelected ? item.color : 'var(--border-subtle)',
                    background: isSelected ? 'var(--bg-elevated)' : 'var(--bg-surface)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    transform: isSelected ? 'translateY(-6px) scale(1.02)' : 'none',
                    boxShadow: isSelected ? `0 16px 32px -12px ${item.color}55` : undefined,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.55rem' }}>
                    <span
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        background: `${item.color}24`,
                        color: item.color,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.88rem',
                      }}
                    >
                      {item.step}
                    </span>
                    <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {item.timeOffset}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: item.color, fontWeight: 700, marginBottom: '0.25rem' }}>
                    {item.layer}
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, lineHeight: 1.45 }}>{item.title}</div>
                </button>
              );
            })}
          </div>

          <div
            key={activeStep.step}
            className="glass-card slide-animate"
            style={{
              borderColor: `${activeStep.color}55`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1.5rem',
              padding: '1.4rem 1.75rem',
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.45rem' }}>
                <span style={{ color: activeStep.color, fontWeight: 900, fontSize: '1.18rem' }}>
                  گام {activeStep.step}: {activeStep.title}
                </span>
                <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  ({activeStep.timeOffset})
                </span>
              </div>
              <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.85 }}>
                {activeStep.detail}
              </p>
            </div>
            <div
              className="mono"
              style={{
                padding: '0.68rem 1.05rem',
                borderRadius: '11px',
                background: `${activeStep.color}18`,
                border: `1px solid ${activeStep.color}44`,
                color: activeStep.color,
                fontSize: '0.86rem',
                whiteSpace: 'nowrap',
              }}
            >
              {activeStep.techTag}
            </div>
          </div>
        </div>
      );

    case 'kernel-binder':
      return (
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: '1.25rem', alignItems: 'stretch' }}>
          <div className="glass-card stagger-1" style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <Zap size={22} color="#a78bfa" />
                <h3 style={{ fontSize: '1.12rem', fontWeight: 800 }}>چرا Binder جایگزین Pipe و Socket شد؟</h3>
              </div>
              <span className="big-stat" style={{ color: '#3ddc84', fontSize: '1.2rem' }}>1-COPY</span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.78 }}>
              در اندروید تقریباً تمام تعاملات از طریق تماس بین‌پروسه‌ای با سرویس‌های <span className="code-pill">SystemServer</span> انجام می‌شود. روش‌های سنتی لینوکس برای این حجم تراکنش زیادی کند بودند.
            </p>

            <div style={{ padding: '0.85rem 1rem', borderRadius: '12px', background: 'rgba(251, 113, 133, 0.08)', border: '1px solid rgba(251, 113, 133, 0.25)', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <div style={{ fontWeight: 700, color: '#fb7185', fontSize: '0.88rem' }}>
                روش سنتی لینوکس (Pipe / Socket): ۲ بار کپی حافظه (کند)
              </div>
              <div className="flow-track"><div className="flow-packet-slow" /></div>
              <div className="mono" style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                Process A —(copy 1)→ Kernel Buffer —(copy 2)→ Process B
              </div>
            </div>

            <div style={{ padding: '0.85rem 1rem', borderRadius: '12px', background: 'rgba(61, 220, 132, 0.09)', border: '1px solid rgba(61, 220, 132, 0.35)', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <div style={{ fontWeight: 700, color: '#3ddc84', fontSize: '0.88rem' }}>
                معماری Binder در اندروید: فقط ۱ بار کپی با <span className="mono">mmap()</span> (فوق‌سریع)
              </div>
              <div className="flow-track"><div className="flow-packet-fast" /></div>
              <div className="mono" style={{ fontSize: '0.75rem', color: '#e2e8f0' }}>
                Process A —(1 copy)→ Shared mmap ← Process B (Zero-copy read)
              </div>
            </div>
          </div>

          <div className="glass-card stagger-2" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: '#38bdf8' }}>۳ مزیت کلیدی درایور <span className="mono">/dev/binder</span></h3>
            {[
              {
                t: '۱. سرعت بالا و Thread Pool آماده',
                d: 'هر سرویس یک استخر نخ (Binder Thread Pool) دارد که همزمان به درخواست‌های چند اپلیکیشن پاسخ می‌دهد.',
              },
              {
                t: '۲. امنیت ذاتی (بدون جعل هویت)',
                d: 'کرنل هنگام ارسال بسته، UID و PID واقعی پروسه فرستنده را به تراکنش می‌چسباند تا امکان جعل هویت نباشد.',
              },
              {
                t: '۳. ارتباط شیءگرا (AIDL)',
                d: 'برنامه‌نویس با تعریف رابط AIDL متدهای پروسه دیگر را طوری صدا می‌زند که انگار یک متد محلی است.',
              },
            ].map((item) => (
              <div key={item.t} style={{ padding: '0.72rem 0.95rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', borderRight: '3px solid #a78bfa' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#e2e8f0', marginBottom: '0.25rem' }}>{item.t}</div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{item.d}</div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'cpu-eas':
      return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: '1.25rem', alignItems: 'stretch' }}>
          <div className="glass-card stagger-1" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <Cpu size={22} color="#38bdf8" />
              <h3 style={{ fontSize: '1.12rem', fontWeight: 800 }}>معماری ناهمگن <span className="mono">big.LITTLE</span> و زمان‌بند EAS</h3>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              زمان‌بند کلاسیک لینوکس (<span className="code-pill">CFS</span>) فرض می‌کرد همه هسته‌های CPU یکسان‌اند؛ اما پردازنده موبایل هسته‌های <strong>کم‌مصرف (LITTLE)</strong> و <strong>پرقدرت (Prime/Big)</strong> دارد.
            </p>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              زمان‌بند <strong>EAS (Energy Aware Scheduling)</strong> به همراه <span className="code-pill">Schedutil</span> قبل از سپردن نخ به یک هسته، مدل انرژی را چک می‌کند تا بهترین تعادل کارایی بر وات به دست آید.
            </p>
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: 'auto' }}>
              <button
                type="button"
                onClick={() => setEasMode('idle')}
                style={{
                  flex: 1,
                  padding: '0.55rem',
                  borderRadius: '10px',
                  border: easMode === 'idle' ? '1.5px solid #3ddc84' : '1px solid var(--border-subtle)',
                  background: easMode === 'idle' ? 'var(--android-green-dim)' : 'rgba(255,255,255,0.03)',
                  color: easMode === 'idle' ? '#3ddc84' : '#cbd5e1',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                }}
              >
                حالت کار سبک (پخش موزیک)
              </button>
              <button
                type="button"
                onClick={() => setEasMode('gaming')}
                style={{
                  flex: 1,
                  padding: '0.55rem',
                  borderRadius: '10px',
                  border: easMode === 'gaming' ? '1.5px solid #fb7185' : '1px solid var(--border-subtle)',
                  background: easMode === 'gaming' ? 'rgba(251,113,133,0.16)' : 'rgba(255,255,255,0.03)',
                  color: easMode === 'gaming' ? '#fb7185' : '#cbd5e1',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                }}
              >
                حالت سنگین (دوربین / بازی)
              </button>
            </div>
          </div>

          <div className="glass-card stagger-2" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ fontWeight: 800, fontSize: '0.96rem', color: easMode === 'idle' ? '#3ddc84' : '#fb7185' }}>
              {easMode === 'idle'
                ? 'پاسخ EAS: رشته‌ها روی هسته‌های LITTLE می‌مانند (صرفه‌جویی ۷۰٪ باتری)'
                : 'پاسخ EAS: نخ UI فوری به هسته Prime 3.2GHz مهاجرت می‌کند (بدون افت فریم)'}
            </div>

            {[
              { name: '۴× هسته LITTLE (Cortex-A520)', freq: easMode === 'idle' ? '1.1 GHz (Active)' : '1.4 GHz (Background)', load: easMode === 'idle' ? 35 : 48, color: '#3ddc84' },
              { name: '۳× هسته Performance (Cortex-A720)', freq: easMode === 'idle' ? 'Sleep (0 GHz)' : '2.6 GHz (Render)', load: easMode === 'idle' ? 4 : 78, color: '#fbbf24' },
              { name: '۱× هسته Prime (Cortex-X4)', freq: easMode === 'idle' ? 'Deep Idle' : '3.2 GHz (UI/Game)', load: easMode === 'idle' ? 0 : 92, color: '#fb7185' },
            ].map((core) => (
              <div key={core.name} style={{ padding: '0.7rem 0.9rem', borderRadius: '11px', background: 'rgba(255,255,255,0.03)', borderRight: `3px solid ${core.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '0.4rem' }}>
                  <span style={{ fontWeight: 700 }}>{core.name}</span>
                  <span className="mono" style={{ color: core.color, fontSize: '0.76rem' }}>{core.freq}</span>
                </div>
                <div style={{ height: '7px', background: 'rgba(255,255,255,0.07)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: `${core.load}%`, height: '100%', background: core.color, transition: 'width 0.35s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'kernel-power':
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.05rem', alignItems: 'stretch' }}>
          <div className="glass-card glass-card-hover stagger-1" style={{ borderTop: '2.5px solid #3ddc84', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <BatteryCharging size={26} color="#3ddc84" />
            <h3 style={{ fontSize: '1.08rem', fontWeight: 800 }}>مکانیزم Wakelocks</h3>
            <p style={{ fontSize: '0.87rem', color: 'var(--text-secondary)', lineHeight: 1.78, flex: 1 }}>
              به محض خاموش شدن نمایشگر، کرنل به حالت <span className="code-pill">Deep Sleep</span> می‌رود. اپ‌ها برای کارهایی مثل پخش صدا یا دانلود باید از طریق <span className="code-pill">PowerManager</span> یک <strong>Partial Wakelock</strong> بگیرند و پس از پایان آزادش کنند.
            </p>
            <div className="terminal-box" style={{ fontSize: '0.73rem' }}>
              echo "my_lock" &gt; /sys/power/wake_lock
            </div>
          </div>

          <div className="glass-card glass-card-hover stagger-2" style={{ borderTop: '2.5px solid #fbbf24', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <Zap size={26} color="#fbbf24" />
            <h3 style={{ fontSize: '1.08rem', fontWeight: 800 }}>Doze Mode و App Standby</h3>
            <p style={{ fontSize: '0.87rem', color: 'var(--text-secondary)', lineHeight: 1.78, flex: 1 }}>
              وقتی گوشی ثابت روی میز است، سیستم وارد <strong>Doze</strong> می‌شود: شبکه و Jobهای پس‌زمینه مسدود شده و فقط در پنجره‌های زمانی کوتاه (Maintenance Windows) به‌صورت دسته‌ای اجرا می‌شوند.
            </p>
            <div className="terminal-box" style={{ fontSize: '0.73rem', color: '#fbbf24' }}>
              Idle → Batch Sync Windows
            </div>
          </div>

          <div className="glass-card glass-card-hover stagger-3" style={{ borderTop: '2.5px solid #38bdf8', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <MemoryStick size={26} color="#38bdf8" />
            <h3 style={{ fontSize: '1.08rem', fontWeight: 800 }}>Ashmem (حافظه اشتراکی پویا)</h3>
            <p style={{ fontSize: '0.87rem', color: 'var(--text-secondary)', lineHeight: 1.78, flex: 1 }}>
              جایگزین <span className="code-pill">shmget</span> لینوکس برای انتقال حجم بالای داده (مثل بافرهای صوتی/تصویری). در زمان کمبود رم، کرنل می‌تواند صفحات قفل‌نشده (Unpinned) را فوراً بازپس بگیرد.
            </p>
            <div className="terminal-box" style={{ fontSize: '0.73rem', color: '#38bdf8' }}>
              /dev/ashmem (Pin / Unpin)
            </div>
          </div>
        </div>
      );

    case 'hal-treble':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
            <div className="glass-card stagger-1" style={{ borderTop: '2.5px solid #fb7185', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: '#fb7185' }}>۱. چرا HAL وجود دارد؟</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                کرنل لینوکس تحت لایسنس <span className="code-pill">GPLv2</span> است؛ یعنی هر کدی داخل کرنل برود باید متن‌باز شود. سازندگان سخت‌افزار (کوالکام، سونی، سامسونگ) برای حفظ اسرار تجاری دوربین یا مودم، کدهای اختصاصی خود را در فضای کاربر و در قالب کتابخانه‌های <strong>HAL</strong> قرار می‌دهند.
              </p>
            </div>

            <div className="glass-card stagger-2" style={{ borderTop: '2.5px solid #3ddc84', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Layers size={20} color="#3ddc84" />
                <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: '#3ddc84' }}>۲. انقلاب Project Treble (اندروید ۸ به بعد)</h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                گوگل با تعریف یک رابط باینری استاندارد (ابتدا <span className="code-pill">HIDL</span> و اکنون <span className="code-pill">AIDL HAL</span>)، پارتیشن سیستم‌عامل (<span className="code-pill">/system</span>) را از پارتیشن سخت‌افزار (<span className="code-pill">/vendor</span>) جدا کرد تا آپدیت اندروید بدون بازنویسی درایورها انجام شود.
              </p>
            </div>
          </div>

          <div className="glass-card stagger-3" style={{ padding: '1.05rem 1.35rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#38bdf8' }}>
              جریان ارتباط استاندارد پس از Project Treble:
            </div>
            <div className="flow-track"><div className="flow-packet-fast" /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="terminal-box" style={{ color: '#fb7185' }}>
                قبل: [Android Framework] ⇄ (In-Process C++) ⇄ [Vendor Blob]
              </div>
              <div className="terminal-box" style={{ color: '#3ddc84' }}>
                بعد: [Android OS (/system)] ══(Binder / AIDL HAL)══▶ [Vendor (/vendor)]
              </div>
            </div>
          </div>
        </div>
      );

    case 'partitions-ab':
      return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: '1.25rem', alignItems: 'stretch' }}>
          <div className="glass-card stagger-1" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <HardDrive size={22} color="#38bdf8" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>پارتیشن‌های اصلی اندروید (Read-Only vs RW)</h3>
            </div>
            {[
              { part: '/boot', desc: 'شامل کرنل لینوکس و ramdisk اولیه برای شروع سیستم', ro: 'Read-Only', color: '#fb7185' },
              { part: '/system', desc: 'فریم‌ورک اندروید، ART و اپلیکیشن‌های سیستمی', ro: 'Read-Only', color: '#38bdf8' },
              { part: '/vendor', desc: 'درایورها و پیاده‌سازی HAL سازنده چیپ‌ست', ro: 'Read-Only', color: '#a78bfa' },
              { part: '/data', desc: 'اپ‌های نصب‌شده کاربر و دیتابیس‌های ایزوله (رمزنگاری FBE)', ro: 'Read-Write', color: '#3ddc84' },
            ].map((p) => (
              <div key={p.part} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.55rem 0.85rem', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', borderRight: `3px solid ${p.color}` }}>
                <div>
                  <span className="mono" style={{ fontWeight: 700, color: p.color }}>{p.part}</span>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{p.desc}</div>
                </div>
                <span className="mono" style={{ fontSize: '0.7rem', color: p.color }}>{p.ro}</span>
              </div>
            ))}
          </div>

          <div className="glass-card stagger-2" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <RefreshCw size={22} color="#3ddc84" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>آپدیت بدون وقفه (A/B Seamless)</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveSlot((s) => (s === 'A' ? 'B' : 'A'))}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '999px',
                  border: '1px solid #3ddc84',
                  background: 'var(--android-green-dim)',
                  color: '#3ddc84',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                شبیه‌سازی ریستارت آپدیت ({activeSlot === 'A' ? 'A → B' : 'B → A'})
              </button>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
              به جای اینکه گوشی ۲۰ دقیقه روی صفحه آپدیت قفل شود، سیستم در پس‌زمینه روی اسلات غیرفعال آپدیت را می‌نویسد. اگر بوت اسلات جدید خراب شود، Bootloader خودکار به اسلات سالم برمی‌گردد (Zero-Brick)!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginTop: 'auto' }}>
              {(['A', 'B'] as const).map((slot) => {
                const isBooted = activeSlot === slot;
                return (
                  <div
                    key={slot}
                    style={{
                      padding: '1rem',
                      borderRadius: '14px',
                      border: isBooted ? '2px solid #3ddc84' : '1px dashed var(--border-strong)',
                      background: isBooted ? 'rgba(61,220,132,0.12)' : 'rgba(255,255,255,0.02)',
                    }}
                  >
                    <div className="mono" style={{ fontWeight: 800, color: isBooted ? '#3ddc84' : '#94a3b8', marginBottom: '0.35rem' }}>
                      SLOT _{slot} {isBooted ? '(ACTIVE BOOT)' : '(STANDBY / OTA)'}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {isBooted
                        ? 'کاربر الان با این نسخه کار می‌کند.'
                        : 'آپدیت بعدی بی‌صدا در پس‌زمینه اینجا نصب می‌شود.'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );

    case 'zygote':
      return (
        <div style={{ display: 'grid', gridTemplateColumns: '1.12fr 1fr', gap: '1.25rem', alignItems: 'stretch' }}>
          <div className="glass-card stagger-1" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <GitFork size={22} color="#fbbf24" />
              <h3 style={{ fontSize: '1.12rem', fontWeight: 800 }}>زنجیره Boot و ترفند Copy-on-Write در Zygote</h3>
            </div>
            <div className="terminal-box" style={{ fontSize: '0.75rem', color: '#fbbf24' }}>
              Bootloader → Linux Kernel → init (PID 1) → Zygote + SystemServer
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              اگر هنگام باز کردن هر اپلیکیشن، سیستم‌عامل مجبور بود ماشین مجازی ART و هزاران کلاس جاوا/کاتلین را از دیسک بخواند، اجرای یک برنامه ساده چندین ثانیه زمان می‌برد.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { t: 'پیش‌بارگذاری در Boot:', d: 'پروسه Zygote یک بار تمام کلاس‌ها و منابع مشترک فریم‌ورک را در رم لود می‌کند و روی یک سوکت منتظر می‌ماند.' },
                { t: 'انشعاب با fork():', d: 'به محض درخواست اجرای اپ جدید، Zygote فقط fork() می‌زند و سپس UID را تغییر می‌دهد.' },
                { t: 'اشتراک رم (Copy-on-Write):', d: 'صفحات خواندنی رم بین همه اپ‌ها مشترک می‌مانند و تنها زمانی که اپ داده‌ای را تغییر دهد کپی جدید ساخته می‌شود.' },
              ].map((item) => (
                <div key={item.t} style={{ padding: '0.52rem 0.78rem', borderRadius: '9px', background: 'rgba(255,255,255,0.03)', fontSize: '0.83rem' }}>
                  <strong style={{ color: '#fbbf24' }}>{item.t}</strong>{' '}
                  <span style={{ color: 'var(--text-secondary)' }}>{item.d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card stagger-2" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '0.9rem' }}>
            <div className="mono pulse-green" style={{ padding: '0.62rem 1.25rem', borderRadius: '11px', background: 'rgba(251,191,36,0.18)', border: '1.5px solid #fbbf24', color: '#fbbf24', fontWeight: 700, fontSize: '0.85rem' }}>
              Zygote64 (Shared Read-Only Pages)
            </div>
            <div className="mono" style={{ display: 'flex', gap: '2.2rem', color: '#3ddc84', fontSize: '0.82rem', fontWeight: 700 }}>
              <span>↙ fork()</span>
              <span>↓ fork()</span>
              <span>↘ fork()</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem', width: '100%' }}>
              {[
                { name: 'Camera', uid: 'u0_a189', color: '#3ddc84' },
                { name: 'WhatsApp', uid: 'u0_a142', color: '#38bdf8' },
                { name: 'Chrome', uid: 'u0_a118', color: '#a78bfa' },
              ].map((app, i) => (
                <div
                  key={app.name}
                  className={`stagger-${i + 3}`}
                  style={{
                    padding: '0.75rem 0.5rem',
                    borderRadius: '11px',
                    textAlign: 'center',
                    background: `${app.color}16`,
                    border: `1px solid ${app.color}55`,
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: app.color }}>{app.name}</div>
                  <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    {app.uid}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', textAlign: 'center', lineHeight: 1.65 }}>
              حداقل مصرف رم برای کدهای مشترک + زمان راه‌اندازی سرد (Cold Start) زیر چند ده میلی‌ثانیه
            </div>
          </div>
        </div>
      );

    case 'art-dalvik':
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.05rem', alignItems: 'stretch' }}>
          <div className="glass-card glass-card-hover stagger-1" style={{ borderTop: '2.5px solid #fb7185', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={{ fontWeight: 900, color: '#fb7185', fontSize: '1.08rem' }}>۱. Dalvik (اندروید ۱ تا ۴.۴)</div>
            <div className="mono" style={{ fontSize: '0.75rem', color: '#fb7185' }}>مبتنی بر رجیستر + Pure JIT</div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.78, flex: 1 }}>
              برخلاف JVM که مبتنی بر پشته (Stack) است، Dalvik برای CPU موبایل مبتنی بر رجیستر ساخته شد؛ اما به دلیل کامپایل JIT در زمان اجرا، هر بار اجرای اپ CPU را درگیر می‌کرد و باتری را می‌خورد.
            </p>
            <div className="terminal-box" style={{ fontSize: '0.72rem', color: '#fb7185' }}>
              نصب: سریع | اجرا: کند + مصرف باتری بالا
            </div>
          </div>

          <div className="glass-card glass-card-hover stagger-2" style={{ borderTop: '2.5px solid #fbbf24', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={{ fontWeight: 900, color: '#fbbf24', fontSize: '1.08rem' }}>۲. ART اولیه (اندروید ۵ و ۶)</div>
            <div className="mono" style={{ fontSize: '0.75rem', color: '#fbbf24' }}>کامپایل کامل AOT (dex2oat)</div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.78, flex: 1 }}>
              تمام بایت‌کدهای <span className="code-pill">.dex</span> هنگام نصب اپلیکیشن یک‌جا به کد ماشین بومی تبدیل می‌شدند. اجرا بسیار روان شد، اما نصب هر اپ یا آپدیت سیستم چندین دقیقه زمان و فضای زیاد می‌گرفت.
            </p>
            <div className="terminal-box" style={{ fontSize: '0.72rem', color: '#fbbf24' }}>
              نصب: بسیار کند | اجرا: سریع + اشغال فضا
            </div>
          </div>

          <div className="glass-card glass-card-hover stagger-3" style={{ borderTop: '2.5px solid #3ddc84', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={{ fontWeight: 900, color: '#3ddc84', fontSize: '1.08rem' }}>۳. ART مدرن (اندروید ۷ تا امروز)</div>
            <div className="mono" style={{ fontSize: '0.75rem', color: '#3ddc84' }}>هیبرید: JIT + Profile-Guided AOT</div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.78, flex: 1 }}>
              نصب در لحظه با Interpreter + JIT؛ موتور ART متدهای داغ و پرکاربرد کاربر را در فایل پروفایل ثبت کرده و شب هنگام شارژ شدن گوشی فقط همان بخش‌ها را AOT کامپایل می‌کند!
            </p>
            <div className="terminal-box" style={{ fontSize: '0.72rem', color: '#3ddc84' }}>
              نصب: فوری | اجرا: بهینه + فضای کم
            </div>
          </div>
        </div>
      );

    case 'dex-pipeline':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          <div className="glass-card stagger-1" style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <Cpu size={22} color="#38bdf8" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>مسیر تبدیل کد برنامه‌نویس تا اجرای بومی روی پردازنده ARM64</h3>
            </div>

            <div className="flow-track"><div className="flow-packet-fast" /></div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { title: 'کد منبع', file: '.kt / .java', desc: 'کد برنامه‌نویس', color: '#94a3b8' },
                { title: 'کامپایلر D8/R8', file: 'classes.dex', desc: 'ادغام رشته‌ها و بهینه‌سازی موبایل', color: '#fbbf24' },
                { title: 'نصب APK', file: '.vdex', desc: 'بایت‌کد تأییدشده برای اجرای سریع اولیه', color: '#38bdf8' },
                { title: 'پروفایل اجرا', file: '.prof', desc: 'ثبت متدهای پرمصرف کاربر حین JIT', color: '#a78bfa' },
                { title: 'کامپایل پس‌زمینه', file: '.oat + .art', desc: 'کد ماشین بومی ARM64 در زمان شارژ', color: '#3ddc84' },
              ].map((node, idx, arr) => (
                <div key={node.title} className={`stagger-${idx + 1}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '150px' }}>
                  <div
                    style={{
                      flex: 1,
                      padding: '0.88rem',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.03)',
                      borderTop: `2.5px solid ${node.color}`,
                    }}
                  >
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: node.color }}>{node.title}</div>
                    <div className="mono" style={{ fontSize: '0.86rem', fontWeight: 700, margin: '0.25rem 0' }}>{node.file}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{node.desc}</div>
                  </div>
                  {idx < arr.length - 1 && <ArrowLeft size={16} color="#64748b" />}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card stagger-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.15rem' }}>
            <div>
              <strong style={{ color: '#fbbf24' }}>چرا فایل <span className="mono">.dex</span> ساخته شد؟</strong>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginTop: '0.3rem' }}>
                در جاوای استاندارد هر کلاس یک فایل <span className="code-pill">.class</span> جدا با جدول رشته‌های تکراری دارد. فرمت DEX تمام کلاس‌ها را در یک فایل ادغام کرده و فضای رم را تا ۵۰٪ کاهش می‌دهد.
              </p>
            </div>
            <div>
              <strong style={{ color: '#3ddc84' }}>Garbage Collector بهینه در ART:</strong>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginTop: '0.3rem' }}>
                مدیریت حافظه خودکار با <span className="code-pill">Concurrent Copying GC</span> مکث‌های Stop-the-World را به کمتر از ۲ میلی‌ثانیه می‌رساند تا در انیمیشن‌های ۱۲۰ هرتز افت فریم رخ ندهد.
              </p>
            </div>
          </div>
        </div>
      );

    case 'lifecycle-anr':
      return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: '1.25rem', alignItems: 'stretch' }}>
          <div className="glass-card stagger-1" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <Activity size={22} color="#fbbf24" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>چرخه حیات اجباری تحت کنترل سیستم‌عامل</h3>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              در ویندوز خود کاربر برنامه را با ضربدر می‌بندد؛ در اندروید تصمیم با سیستم‌عامل است تا منابع بین اپ‌ها جابجا شوند.
            </p>
            <div className="terminal-box" style={{ fontSize: '0.76rem', color: '#fbbf24', lineHeight: 1.8 }}>
              onCreate() → onStart() → [onResume() (Active)] → onPause() → onStop() → onDestroy()
            </div>
          </div>

          <div className="glass-card stagger-2" style={{ borderTop: '2.5px solid #fb7185', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <Clock size={22} color="#fb7185" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fb7185' }}>تایمر نگهبان ANR Watchdog</h3>
              </div>
              <span className="big-stat" style={{ color: '#fb7185', fontSize: '1.25rem' }}>5.0 sec</span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              نخ اصلی (<span className="code-pill">Main / UI Thread</span>) مسئول رندر ۶۰/۱۲۰ فریم در ثانیه است. اگر برنامه‌نویسی عملیات سنگین (شبکه یا دیتابیس) را روی این نخ بیندازد و پاسخ به لمس کاربر بیش از <strong>۵ ثانیه</strong> طول بکشد، <span className="code-pill">InputDispatcher</span> خطای <strong>ANR (App Not Responding)</strong> صادر می‌کند و فایل ردگیری <span className="code-pill">/data/anr/traces.txt</span> ثبت می‌شود.
            </p>
          </div>
        </div>
      );

    case 'background-buckets':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div className="glass-card stagger-1" style={{ padding: '1.15rem 1.4rem' }}>
            <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: '#fbbf24', marginBottom: '0.5rem' }}>
              جایگزینی سرویس‌های آزاد با <span className="mono">JobScheduler / WorkManager</span>
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              در نسخه‌های جدید اندروید، اپ‌های پس‌زمینه حق ندارند بدون اجازه و دائم CPU را بیدار نگه دارند؛ کارها به <span className="code-pill">JobScheduler</span> سپرده می‌شوند تا سیستم در زمان مناسب (مثلاً اتصال به شارژر + Wi-Fi) همه را یکجا اجرا کند.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem' }}>
            {[
              { name: 'Active', desc: 'در حال استفاده مستقیم کاربر (بدون محدودیت)', color: '#3ddc84' },
              { name: 'Working Set', desc: 'روزانه استفاده می‌شود (محدودیت بسیار کم)', color: '#38bdf8' },
              { name: 'Frequent', desc: 'هر چند روز یک بار (تاخیر در Sync)', color: '#a78bfa' },
              { name: 'Rare', desc: 'به ندرت باز می‌شود (محدودیت شدید شبکه)', color: '#fbbf24' },
              { name: 'Restricted', desc: 'مصرف باتری مشکوک (مسدودی کامل پس‌زمینه)', color: '#fb7185' },
            ].map((b, idx) => (
              <div
                key={b.name}
                className={`glass-card stagger-${idx + 1}`}
                style={{ borderTop: `2.5px solid ${b.color}`, padding: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}
              >
                <div className="mono" style={{ fontWeight: 700, fontSize: '0.86rem', color: b.color }}>{b.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'memory-swap':
      return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', alignItems: 'stretch' }}>
          <div className="glass-card stagger-1" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <HardDrive size={22} color="#fb7185" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>چرا Swap روی حافظه فلش ممنوع است؟</h3>
            </div>
            <ul style={{ paddingRight: '1.1rem', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.88 }}>
              <li>حافظه‌های <span className="code-pill">eMMC / UFS</span> گوشی تعداد چرخه نوشتن محدودی دارند و Swap مداوم عمر تراشه را کم می‌کند.</li>
              <li>سرعت خواندن تصادفی فلش ده‌ها برابر کندتر از رم است و باعث فریز شدن رابط کاربری می‌شود.</li>
              <li>
                <strong>راه‌حل جایگزین — <span style={{ color: '#38bdf8' }}>zRAM</span>:</strong> اندروید بخشی از خود رم را به‌عنوان دیسک فشرده (<span className="code-pill">LZ4 / ZSTD</span>) در نظر می‌گیرد تا صفحات قدیمی بدون برخورد با دیسک فشرده شوند.
              </li>
            </ul>
          </div>

          <div className="glass-card stagger-2" style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <MemoryStick size={22} color="#3ddc84" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>اندروید مصرف رم را چطور می‌سنجد؟</h3>
            </div>
            {[
              { tag: 'VSS', desc: 'کل حافظه مجازی آدرس‌دهی‌شده (گمراه‌کننده؛ شامل فایل‌های نگاشت‌نشده هم می‌شود)', color: '#64748b' },
              { tag: 'RSS', desc: 'حافظه فیزیکی اشغال‌شده + کل صفحات مشترک Zygote (باعث شمارش تکراری می‌شود)', color: '#fbbf24' },
              { tag: 'PSS (معیار اصلی)', desc: 'حافظه اختصاصی اپ + سهم متناسب از صفحات مشترک (مثلاً اگر ۳ اپ شریک‌اند، یک‌سوم حساب می‌شود)', color: '#3ddc84' },
              { tag: 'USS', desc: 'حافظه کاملاً اختصاصی پروسه که با کشتن آن بلافاصله آزاد می‌شود', color: '#38bdf8' },
            ].map((m) => (
              <div key={m.tag} style={{ padding: '0.58rem 0.85rem', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', borderRight: `3px solid ${m.color}` }}>
                <span className="mono" style={{ fontWeight: 700, color: m.color, fontSize: '0.82rem' }}>{m.tag}: </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{m.desc}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'memory-lmk':
      return <LmkSimulator />;

    case 'security-sandbox':
      return (
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '1.25rem', alignItems: 'stretch' }}>
          <div className="glass-card stagger-1" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <Lock size={22} color="#3ddc84" />
              <h3 style={{ fontSize: '1.12rem', fontWeight: 800 }}>مدل کاربری لینوکس برای Sandboxing</h3>
            </div>
            <p style={{ fontSize: '0.89rem', color: 'var(--text-secondary)', lineHeight: 1.82 }}>
              در سیستم‌عامل‌های دسکتاپ، کاربر شما صاحب همه فایل‌هاست؛ پس یک برنامه آلوده می‌تواند پوشه اسناد یا مرورگر را بخواند. اما در اندروید هنگام نصب هر اپ، <span className="code-pill">PackageManager</span> یک <strong>UID یکتا</strong> (از رنج <span className="code-pill">10000+</span>) به آن می‌دهد.
            </p>
            <div className="terminal-box" style={{ fontSize: '0.75rem', lineHeight: 1.8 }}>
              <div>drwx------ u0_a142 u0_a142 /data/data/com.whatsapp</div>
              <div>drwx------ u0_a118 u0_a118 /data/data/com.android.chrome</div>
              <div style={{ color: '#fb7185' }}># کرنل اجازه خواندن پوشه دیگری را به u0_a118 نمی‌دهد!</div>
            </div>
          </div>

          <div className="glass-card stagger-2" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <ShieldAlert size={22} color="#fbbf24" />
              <h3 style={{ fontSize: '1.12rem', fontWeight: 800 }}>مجوزهای زمان اجرا (Runtime Permissions)</h3>
            </div>
            <p style={{ fontSize: '0.89rem', color: 'var(--text-secondary)', lineHeight: 1.82 }}>
              اپ‌ها به صورت پیش‌فرض هیچ دسترسی به سخت‌افزارهای حساس (دوربین، میکروفون، موقعیت، مخاطبین) ندارند؛ حتی اگر در <span className="code-pill">AndroidManifest.xml</span> اعلام کرده باشند.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                '۱. Normal Permissions (مثل اینترنت): هنگام نصب خودکار داده می‌شوند.',
                '۲. Dangerous Permissions (مثل دوربین): حتماً پاپ‌آپ تأیید کاربر و کنترل Binder توسط PackageManager لازم است.',
                '۳. One-Time & Auto-Reset: اگر مدتی از اپ استفاده نشود، مجوزها خودکار پس گرفته می‌شوند.',
              ].map((line) => (
                <div key={line} style={{ padding: '0.55rem 0.85rem', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', fontSize: '0.83rem', color: 'var(--text-secondary)' }}>
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'security-selinux':
      return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', alignItems: 'stretch' }}>
          <div className="glass-card stagger-1" style={{ borderTop: '2.5px solid #fb7185', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <ShieldCheck size={24} color="#fb7185" />
              <h3 style={{ fontSize: '1.12rem', fontWeight: 800 }}>SELinux در حالت Enforcing (MAC)</h3>
            </div>
            <p style={{ fontSize: '0.89rem', color: 'var(--text-secondary)', lineHeight: 1.82 }}>
              کنترل دسترسی سنتی (DAC) یک نقطه ضعف دارد: اگر باگی به پروسه دسترسی <span className="code-pill">root</span> بدهد، همه‌چیز از دست می‌رود. اندروید از <strong>Mandatory Access Control (MAC)</strong> در SELinux استفاده می‌کند؛ یعنی حتی پروسه‌های سیستمی فقط در کانتکست تعریف‌شده حق عمل دارند.
            </p>
            <div className="terminal-box" style={{ fontSize: '0.74rem', color: '#fb7185' }}>
              avc: denied &#123; read &#125; for pid=6104 scontext=u:r:untrusted_app:s0 tcontext=u:object_r:system_data_file:s0
            </div>
          </div>

          <div className="glass-card stagger-2" style={{ borderTop: '2.5px solid #38bdf8', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <CheckCircle2 size={24} color="#38bdf8" />
              <h3 style={{ fontSize: '1.12rem', fontWeight: 800 }}>Verified Boot و رمزنگاری فایل‌ها</h3>
            </div>
            <ul style={{ paddingRight: '1.1rem', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.88 }}>
              <li>
                <strong>زنجیره اعتماد (AVB / dm-verity):</strong> از Bootloader تا کرنل و پارتیشن <span className="code-pill">/system</span> با امضای رمزنگاری‌شده بررسی می‌شوند تا روت‌کیت‌ها نتوانند فایل‌های سیستم را تغییر دهند.
              </li>
              <li>
                <strong>File-Based Encryption (FBE):</strong> هر فایل با کلید مجزا رمزنگاری می‌شود؛ بنابراین حتی اگر گوشی دزدیده شود، قبل از باز کردن قفل توسط کاربر هیچ داده‌ای از حافظه قابل بازیابی نیست.
              </li>
            </ul>
          </div>
        </div>
      );

    case 'security-tee':
      return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', alignItems: 'stretch' }}>
          <div className="glass-card stagger-1" style={{ borderTop: '2.5px solid #3ddc84', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <Cpu size={24} color="#3ddc84" />
                <h3 style={{ fontSize: '1.12rem', fontWeight: 800 }}>ARM TrustZone (TEE) چیست؟</h3>
              </div>
              <span className="mono" style={{ fontSize: '0.74rem', color: '#3ddc84' }}>SECURE WORLD</span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.82 }}>
              پردازنده ARM در سطح سخت‌افزار به دو دنیای ایزوله تقسیم می‌شود: <strong>Normal World</strong> (که کرنل لینوکس و اندروید در آن اجرا می‌شوند) و <strong>Secure World (TEE)</strong> که یک سیستم‌عامل کوچک و مجزا (مثل Trusty OS) در آن اجرا می‌گردد.
            </p>
            <div className="terminal-box" style={{ fontSize: '0.75rem', color: '#3ddc84' }}>
              [Android OS (Root)] ──✗ ACCESS DENIED ──▶ [TEE: Fingerprint &amp; Keys]
            </div>
          </div>

          <div className="glass-card stagger-2" style={{ borderTop: '2.5px solid #fbbf24', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <Lock size={24} color="#fbbf24" />
              <h3 style={{ fontSize: '1.12rem', fontWeight: 800 }}>StrongBox Keymaster و بیومتریک</h3>
            </div>
            <ul style={{ paddingRight: '1.1rem', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.88 }}>
              <li>الگوی اثر انگشت و کلیدهای خصوصی بانکی <strong>هرگز</strong> وارد رم اندروید نمی‌شوند؛ تطبیق فقط داخل TEE انجام شده و یک تأییدیه امضاشده برمی‌گردد.</li>
              <li>در گوشی‌های مدرن، تراشه امنیتی فیزیکی مجزای <strong>StrongBox</strong> حتی در برابر حملات فیزیکی و ولتاژ روی CPU اصلی هم مقاوم است.</li>
            </ul>
          </div>
        </div>
      );

    case 'privacy-storage':
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.05rem', alignItems: 'stretch' }}>
          <div className="glass-card glass-card-hover stagger-1" style={{ borderTop: '2.5px solid #38bdf8', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <HardDrive size={26} color="#38bdf8" />
            <h3 style={{ fontSize: '1.06rem', fontWeight: 800 }}>۱. Scoped Storage</h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.78, flex: 1 }}>
              در اندروید جدید هیچ اپی اجازه ندارد کل حافظه گوشی را اسکن کند؛ هر اپ فقط به دایرکتوری اختصاصی خودش و فایل‌های رسانه‌ای مشخص (Photo Picker) دسترسی محدود دارد.
            </p>
            <div className="terminal-box" style={{ fontSize: '0.72rem', color: '#38bdf8' }}>
              /Android/data/&lt;pkg&gt; (Isolated)
            </div>
          </div>

          <div className="glass-card glass-card-hover stagger-2" style={{ borderTop: '2.5px solid #3ddc84', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <ShieldCheck size={26} color="#3ddc84" />
            <h3 style={{ fontSize: '1.06rem', fontWeight: 800 }}>۲. نشانگر سخت‌افزاری سنسور</h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.78, flex: 1 }}>
              سرویس <span className="code-pill">AppOps</span> در فریم‌ورک به محض باز شدن جریان دوربین یا میکروفون در لایه HAL، نقطه سبز گوشه صفحه را روشن می‌کند تا هیچ بدافزاری مخفیانه شنود نکند.
            </p>
            <div className="terminal-box" style={{ fontSize: '0.72rem', color: '#3ddc84' }}>
              ● Camera/Mic Active (HAL Hook)
            </div>
          </div>

          <div className="glass-card glass-card-hover stagger-3" style={{ borderTop: '2.5px solid #a78bfa', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <Lock size={26} color="#a78bfa" />
            <h3 style={{ fontSize: '1.06rem', fontWeight: 800 }}>۳. Private DNS (DoT)</h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.78, flex: 1 }}>
              بخش <span className="code-pill">Netd</span> سیستم‌عامل تمام پرس‌وجوهای DNS را به‌صورت بومی روی پروتکل رمزنگاری‌شده <strong>DNS-over-TLS</strong> می‌فرستد تا مسیر وب‌گردی کاربر شنود نشود.
            </p>
            <div className="terminal-box" style={{ fontSize: '0.72rem', color: '#a78bfa' }}>
              UDP:53 ──▶ TLS:853 (Encrypted)
            </div>
          </div>
        </div>
      );

    case 'ai-nnapi':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          <div className="glass-card stagger-1" style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <Zap size={24} color="#a78bfa" />
                <h3 style={{ fontSize: '1.12rem', fontWeight: 800 }}>مسیر اجرای هوش مصنوعی روی دستگاه (On-Device AI)</h3>
              </div>
              <span className="mono" style={{ fontSize: '0.76rem', color: '#3ddc84' }}>Zero Cloud Latency</span>
            </div>

            <div className="flow-track"><div className="flow-packet-fast" /></div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem' }}>
              {[
                { title: '۱. اپ یا AICore', desc: 'ارسال مدل‌های سبک مثل Gemini Nano یا ترجمه زنده', tag: 'System AICore', color: '#38bdf8' },
                { title: '۲. لایه NNAPI', desc: 'رابط استاندارد سیستم‌عامل برای توزیع گراف محاسبات تانسور', tag: 'Neural Networks API', color: '#a78bfa' },
                { title: '۳. NPU Vendor HAL', desc: 'انتخاب بهینه‌ترین شتاب‌دهنده سخت‌افزاری توسط درایور', tag: 'AIDL NPU HAL', color: '#fbbf24' },
                { title: '۴. اجرا روی NPU/DSP', desc: 'پردازش ماتریسی فوق‌سریع با یک‌دهم مصرف باتری CPU', tag: 'Dedicated NPU', color: '#3ddc84' },
              ].map((step, i) => (
                <div key={step.title} className={`stagger-${i + 1}`} style={{ padding: '0.9rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', borderTop: `2.5px solid ${step.color}`, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: step.color }}>{step.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65, flex: 1 }}>{step.desc}</div>
                  <span className="mono" style={{ fontSize: '0.7rem', color: step.color }}>{step.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'adb-perfetto':
      return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', alignItems: 'stretch' }}>
          <div className="glass-card stagger-1" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <Terminal size={22} color="#3ddc84" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>معماری ۳بخشی ADB و بافرهای Logcat</h3>
            </div>
            <p style={{ fontSize: '0.87rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              وقتی دستور <span className="code-pill">adb shell</span> می‌زنید، سه پروسه همزمان با هم صحبت می‌کنند و لاگ‌های سیستم نیز درون <strong>Ring Buffer</strong>های کرنل/دیمن نگهداری می‌شوند تا حافظه را پر نکنند.
            </p>
            <div className="terminal-box" style={{ fontSize: '0.74rem', color: '#3ddc84', lineHeight: 1.8 }}>
              <div>[ADB Client] ↔ [ADB Host Server :5037] ══USB/WiFi══▶ [adbd Daemon]</div>
              <div style={{ color: '#94a3b8' }}>Ring Buffers: main | system | events | crash | kernel</div>
            </div>
          </div>

          <div className="glass-card stagger-2" style={{ borderTop: '2.5px solid #38bdf8', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <Activity size={22} color="#38bdf8" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Perfetto: ردیاب میکروثانیه‌ای کرنل</h3>
            </div>
            <p style={{ fontSize: '0.87rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              جایگزین مدرن <span className="code-pill">Systrace</span> در اندروید؛ مهندسان سیستم‌عامل با کمک سرویس <span className="code-pill">traced</span> و <span className="code-pill">ftrace</span> کرنل، همزمان وقفه CPU، تراکنش‌های Binder، قفل‌های Mutex و افت فریم‌های SurfaceFlinger را روی یک خط زمان دقیق می‌بینند.
            </p>
            <div className="terminal-box" style={{ fontSize: '0.73rem', color: '#38bdf8' }}>
              ftrace (Kernel) + atrace (HAL/ART) → Perfetto UI
            </div>
          </div>
        </div>
      );

    case 'modern-rust-pkvm':
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.05rem', alignItems: 'stretch' }}>
          <div className="glass-card glass-card-hover stagger-1" style={{ borderTop: '2.5px solid #fbbf24', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <ShieldCheck size={26} color="#fbbf24" />
            <h3 style={{ fontSize: '1.08rem', fontWeight: 800 }}>۱. زبان Rust در هسته اندروید</h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.78, flex: 1 }}>
              حدود ۷۰٪ آسیب‌پذیری‌های بحرانی C/C++ ناشی از باگ‌های حافظه (Buffer Overflow) بودند. در اندرویدهای جدید بخش‌های حساس مثل بلوتوث، UWB و حتی بازنویسی <strong>Binder</strong> با زبان <strong>Rust</strong> نوشته می‌شوند تا امنیت حافظه در زمان کامپایل تضمین شود.
            </p>
            <div className="terminal-box" style={{ fontSize: '0.73rem', color: '#fbbf24' }}>
              Memory Safety Bugs: ↓ Near Zero
            </div>
          </div>

          <div className="glass-card glass-card-hover stagger-2" style={{ borderTop: '2.5px solid #3ddc84', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <Lock size={26} color="#3ddc84" />
            <h3 style={{ fontSize: '1.08rem', fontWeight: 800 }}>۲. هایپروایزر pKVM (Protected VM)</h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.78, flex: 1 }}>
              پردازش‌های فوق‌حساس (مثل احراز هویت بیومتریک، کیف پول و DRM) داخل یک ماشین مجازی ایزوله توسط <strong>pKVM</strong> اجرا می‌شوند؛ حتی اگر خود کرنل اندروید هک شود، به حافظه pKVM دسترسی ندارد!
            </p>
            <div className="terminal-box" style={{ fontSize: '0.73rem', color: '#3ddc84' }}>
              Hypervisor Isolation (EL2)
            </div>
          </div>

          <div className="glass-card glass-card-hover stagger-3" style={{ borderTop: '2.5px solid #38bdf8', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <Layers size={26} color="#38bdf8" />
            <h3 style={{ fontSize: '1.08rem', fontWeight: 800 }}>۳. Project Mainline</h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.78, flex: 1 }}>
              تبدیل اجزای هسته و سیستم (مثل <span className="code-pill">ART</span>، کدک‌های رسانه، DNS و مجوزها) به ماژول‌های <span className="code-pill">.apex</span> تا مستقیم از طریق گوگل‌پلی و بدون نیاز به آپدیت شرکت سازنده گوشی به‌روز شوند.
            </p>
            <div className="terminal-box" style={{ fontSize: '0.73rem', color: '#38bdf8' }}>
              APEX Modules → Play Store OTA
            </div>
          </div>
        </div>
      );

    case 'graphics-pipeline':
      return (
        <div className="glass-card stagger-1" style={{ padding: '1.4rem 1.55rem', display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <MonitorSmartphone size={24} color="#38bdf8" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>خط لوله گرافیک: از رسم UI در اپ تا نمایش بدون پارگی تصویر</h3>
            </div>
            <span className="mono" style={{ fontSize: '0.78rem', color: '#3ddc84' }}>VSync 120Hz (8.3ms)</span>
          </div>

          <div className="flow-track"><div className="flow-packet-fast" /></div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.9rem' }}>
            {[
              {
                step: '۱. رسم فریم (Producer)',
                desc: 'اپ با موتور Skia یا Vulkan فریم خود را روی یک بافر اختصاصی در رم گرافیکی می‌کشد.',
                tag: 'App UI / RenderThread',
                color: '#fbbf24',
              },
              {
                step: '۲. صف BufferQueue',
                desc: 'با مدل Triple Buffering بافر آماده به صف می‌رود تا همزمان GPU و CPU منتظر هم نمانند.',
                tag: 'BufferQueue (Gralloc)',
                color: '#a78bfa',
              },
              {
                step: '۳. ترکیب در SurfaceFlinger',
                desc: 'تمام لایه‌ها (اپ، نوار وضعیت، کیبورد) با کمک سخت‌افزاری HWComposer ترکیب می‌شوند.',
                tag: 'SurfaceFlinger + HWC',
                color: '#38bdf8',
              },
              {
                step: '۴. هماهنگی VSync',
                desc: 'ارسال تصویر نهایی دقیقاً سر تیک VSync (هر 16.6ms یا 8.3ms) برای جلوگیری از Tearing.',
                tag: 'Display (60 / 120Hz)',
                color: '#3ddc84',
              },
            ].map((box, idx) => (
              <div
                key={box.step}
                className={`stagger-${idx + 1}`}
                style={{
                  padding: '1rem',
                  borderRadius: '13px',
                  background: 'rgba(255,255,255,0.03)',
                  borderTop: `2.5px solid ${box.color}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '0.94rem', color: box.color }}>{box.step}</div>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1 }}>
                  {box.desc}
                </p>
                <span className="mono" style={{ fontSize: '0.72rem', color: box.color }}>
                  {box.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'phone-simulator':
      return <PhoneSimulator />;

    case 'class-quiz':
      return <ClassQuiz />;

    case 'summary':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="glass-card stagger-1" style={{ padding: '1.05rem 1.3rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.65rem', color: '#3ddc84' }}>
              جدول مقایسه نهایی فلسفه سیستم‌عامل‌ها
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                    <th style={{ textAlign: 'right', padding: '0.5rem' }}>ویژگی</th>
                    <th style={{ textAlign: 'right', padding: '0.5rem', color: '#3ddc84' }}>Android</th>
                    <th style={{ textAlign: 'right', padding: '0.5rem' }}>Linux Desktop</th>
                    <th style={{ textAlign: 'right', padding: '0.5rem' }}>iOS</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['هسته و libc', 'Linux + Binder + EAS + Bionic libc', 'Linux استاندارد + glibc', 'XNU (Mach + BSD)'],
                    ['ایزوله‌سازی اپ', 'یک UID جدا + SELinux + pKVM', 'همه اپ‌ها با UID کاربر', 'Sandbox سخت‌گیرانه + Entitlements'],
                    ['مدیریت کمبود رم', 'zRAM + lmkd (oom_score_adj)', 'Swap روی دیسک + OOM Killer', 'فشرده‌سازی رم + Jetsam'],
                    ['اجرای کد', 'Zygote + ART (JIT + AOT)', 'باینری بومی ELF', 'کد بومی کامپایل‌شده'],
                  ].map((row) => (
                    <tr key={row[0]} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '0.5rem', fontWeight: 700 }}>{row[0]}</td>
                      <td style={{ padding: '0.5rem', color: '#e2e8f0' }}>{row[1]}</td>
                      <td style={{ padding: '0.5rem', color: 'var(--text-secondary)' }}>{row[2]}</td>
                      <td style={{ padding: '0.5rem', color: 'var(--text-secondary)' }}>{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="stagger-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem' }}>
            {[
              {
                q: 'چرا اندروید از JVM استاندارد استفاده نکرد؟',
                a: 'به دلیل محدودیت رم/CPU موبایل و مسائل لایسنس، ماشین مجازی رجیسترمحور Dalvik و سپس ART ساخته شد.',
              },
              {
                q: 'اگر گوشی روت شود چه اتفاقی در امنیت می‌افتد؟',
                a: 'زنجیره Verified Boot می‌شکند و پروسه‌ها می‌توانند از محدوده UID و پالیسی‌های SELinux عبور کنند.',
              },
              {
                q: 'چرا گوگل سراغ Rust در کرنل اندروید رفت؟',
                a: 'برای حذف خطاهای حافظه (Buffer Overflow) در کدهای جدید کرنل مثل بلوتوث و Binder که ۷۰٪ باگ‌های امنیتی را می‌ساختند.',
              },
            ].map((qa) => (
              <div key={qa.q} className="glass-card" style={{ padding: '0.85rem 1rem' }}>
                <div style={{ fontWeight: 800, fontSize: '0.84rem', color: '#fbbf24', marginBottom: '0.3rem' }}>{qa.q}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{qa.a}</div>
              </div>
            ))}
          </div>

          <div
            className="stagger-3"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.8rem 1.25rem',
              borderRadius: '14px',
              background: 'var(--android-green-dim)',
              border: '1px solid var(--border-accent)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Terminal size={20} color="#3ddc84" />
              <span style={{ fontWeight: 800, fontSize: '0.96rem' }}>
                سپاس از توجه شما • آماده پرسش و پاسخ هستیم!
              </span>
            </div>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              گروه هفتم: مهندس حسنپور • مهندس ریسمانی • مهندس حاج کرمی (۹/۱۰)
            </span>
          </div>
        </div>
      );

    default:
      return null;
  }
}
