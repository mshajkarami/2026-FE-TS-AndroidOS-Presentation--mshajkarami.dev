import { useState } from 'react';
import { AlertTriangle, CheckCircle2, Flame, MemoryStick, Skull } from 'lucide-react';
import { LMK_PROCESSES } from '../data/presentationData';

type PressureLevel = 'normal' | 'medium' | 'critical';

const PRESSURE_MODES: Record<
  PressureLevel,
  { label: string; desc: string; killThreshold: number; ramPercent: number; zramMb: number; color: string }
> = {
  normal: {
    label: 'حالت ۱: بار عادی',
    desc: 'رم کافی است؛ تمام اپ‌های پس‌زمینه در حالت Cached زنده می‌مانند.',
    killThreshold: 1000,
    ramPercent: 58,
    zramMb: 420,
    color: '#3ddc84',
  },
  medium: {
    label: 'حالت ۲: فشار متوسط',
    desc: 'با پر شدن رم، zRAM فشرده‌سازی را بالا می‌برد و lmkd سنگین‌ترین اپ‌های Cached (امتیاز 900+) را می‌بندد.',
    killThreshold: 900,
    ramPercent: 81,
    zramMb: 1180,
    color: '#fbbf24',
  },
  critical: {
    label: 'حالت ۳: بحران رم (اجرای دوربین)',
    desc: 'دوربین برای بافر تصویر رم فوری می‌خواهد! lmkd تمام پروسه‌های بالای 700 را قربانی می‌کند تا اپ پیش‌زمینه بدون لگ بماند.',
    killThreshold: 700,
    ramPercent: 94,
    zramMb: 1850,
    color: '#fb7185',
  },
};

export function LmkSimulator() {
  const [level, setLevel] = useState<PressureLevel>('normal');
  const current = PRESSURE_MODES[level];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.35fr', gap: '1.25rem', alignItems: 'stretch' }}>
      {/* Left: Controls & Explanation */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <div className="glass-card" style={{ padding: '1rem 1.15rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.6rem' }}>
            <MemoryStick size={20} color="#fbbf24" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>چرا Swap روی حافظه فلش ممنوع است؟</h3>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            حافظه فلش موبایل (<span className="code-pill">UFS/eMMC</span>) چرخه نوشتن محدود دارد و بسیار کندتر از رم است. اندروید به جای آن از{' '}
            <strong style={{ color: '#38bdf8' }}>zRAM</strong> (فشرده‌سازی داخل خود رم) و{' '}
            <strong style={{ color: '#fb7185' }}>lmkd</strong> برای حذف هوشمند پروسه‌های کم‌اولویت استفاده می‌کند.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '1rem 1.15rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            شبیه‌ساز واکنش Low Memory Killer:
          </div>

          {(Object.keys(PRESSURE_MODES) as PressureLevel[]).map((key) => {
            const mode = PRESSURE_MODES[key];
            const active = key === level;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setLevel(key)}
                style={{
                  textAlign: 'right',
                  padding: '0.7rem 0.9rem',
                  borderRadius: '11px',
                  border: active ? `1.5px solid ${mode.color}` : '1px solid var(--border-subtle)',
                  background: active ? `${mode.color}18` : 'rgba(255,255,255,0.02)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.88rem', color: active ? mode.color : 'var(--text-primary)' }}>
                    {mode.label}
                  </span>
                  <span className="mono" style={{ fontSize: '0.74rem', color: mode.color }}>
                    RAM {mode.ramPercent}%
                  </span>
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{mode.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Live RAM & Process Table */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {level === 'critical' ? (
              <Flame size={18} color="#fb7185" />
            ) : level === 'medium' ? (
              <AlertTriangle size={18} color="#fbbf24" />
            ) : (
              <CheckCircle2 size={18} color="#3ddc84" />
            )}
            <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>وضعیت زنده حافظه و پروسه‌ها</span>
          </div>
          <span className="mono" style={{ fontSize: '0.78rem', color: '#38bdf8' }}>
            zRAM: {current.zramMb} MB compressed
          </span>
        </div>

        {/* RAM Progress Bar */}
        <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${current.ramPercent}%`,
              height: '100%',
              background: current.color,
              transition: 'width 0.35s ease, background 0.35s ease',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1 }}>
          {LMK_PROCESSES.map((proc) => {
            const isKilled = proc.oomScore >= current.killThreshold;
            const badgeColor =
              proc.oomScore === 0
                ? '#3ddc84'
                : proc.oomScore <= 200
                  ? '#38bdf8'
                  : proc.oomScore <= 600
                    ? '#fbbf24'
                    : '#fb7185';

            return (
              <div
                key={proc.pkg}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.52rem 0.8rem',
                  borderRadius: '10px',
                  background: isKilled ? 'rgba(251, 113, 133, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                  border: isKilled ? '1px dashed rgba(251, 113, 133, 0.4)' : '1px solid rgba(255, 255, 255, 0.05)',
                  opacity: isKilled ? 0.55 : 1,
                  transition: 'all 0.25s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  {isKilled ? (
                    <Skull size={15} color="#fb7185" />
                  ) : (
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: badgeColor,
                      }}
                    />
                  )}
                  <div>
                    <div
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        textDecoration: isKilled ? 'line-through' : 'none',
                      }}
                    >
                      {proc.name}
                    </div>
                    <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {proc.pkg}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {proc.ramMb} MB
                  </span>
                  <span
                    className="mono"
                    style={{
                      padding: '0.18rem 0.5rem',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      background: isKilled ? 'rgba(251,113,133,0.18)' : `${badgeColor}1a`,
                      color: isKilled ? '#fb7185' : badgeColor,
                      minWidth: '88px',
                      textAlign: 'center',
                    }}
                  >
                    {isKilled ? 'KILLED (LMK)' : `adj: ${proc.oomScore}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
