import { useEffect, useState } from 'react';
import {
  Activity,
  Camera,
  Check,
  Copy,
  Flame,
  Globe,
  Home,
  Layers,
  Lock,
  MessageCircle,
  Music,
  RotateCcw,
  Settings,
  ShieldAlert,
  Smartphone,
  Square,
  Terminal,
  Triangle,
  Wifi,
} from 'lucide-react';
import { SIM_APPS } from '../data/presentationData';
import type { SimAppDef } from '../types/presentation';

interface RunningProc {
  app: SimAppDef;
  pid: number;
  oomAdj: number;
  state: 'Foreground' | 'Service' | 'Cached';
}

interface TraceEntry {
  id: number;
  time: string;
  tag: string;
  color: string;
  titleFa: string;
  sysCall: string;
  detailFa?: string;
}

type InspectorTab = 'trace' | 'procs' | 'adb';
type PhoneScreen = 'home' | 'app' | 'recents';

const TOTAL_RAM_MB = 2048;
const SYSTEM_BASE_RAM_MB = 420;

function getAppIcon(id: string, size = 24) {
  switch (id) {
    case 'camera':
      return <Camera size={size} />;
    case 'whatsapp':
      return <MessageCircle size={size} />;
    case 'chrome':
      return <Globe size={size} />;
    case 'spotify':
      return <Music size={size} />;
    case 'instagram':
      return <Smartphone size={size} />;
    default:
      return <Settings size={size} />;
  }
}

function LiveAppPreview({ app }: { app: SimAppDef }) {
  if (app.id === 'camera') {
    return (
      <div
        style={{
          height: '105px',
          borderRadius: '12px',
          background: 'radial-gradient(circle at center, #1b2f24, #070d0a)',
          border: '1px solid rgba(61,220,132,0.4)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          className="pulse-green"
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '2px dashed #3ddc84',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Camera size={18} color="#3ddc84" />
        </div>
        <span
          className="mono"
          dir="ltr"
          style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            fontSize: '0.62rem',
            color: '#fb7185',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          ● HAL AIDL LIVE
        </span>
      </div>
    );
  }

  if (app.id === 'spotify') {
    return (
      <div
        style={{
          height: '105px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(167,139,250,0.22), rgba(15,23,36,0.9))',
          border: '1px solid rgba(167,139,250,0.45)',
          padding: '0.65rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#e9d5ff' }}>
          در حال پخش موسیقی با Partial Wakelock فعال
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', height: '40px', justifyContent: 'center' }}>
          <div className="eq-bar-1" style={{ width: '8px', background: '#a78bfa', borderRadius: '4px' }} />
          <div className="eq-bar-2" style={{ width: '8px', background: '#3ddc84', borderRadius: '4px' }} />
          <div className="eq-bar-3" style={{ width: '8px', background: '#38bdf8', borderRadius: '4px' }} />
          <div className="eq-bar-4" style={{ width: '8px', background: '#fbbf24', borderRadius: '4px' }} />
          <div className="eq-bar-2" style={{ width: '8px', background: '#fb7185', borderRadius: '4px' }} />
        </div>
      </div>
    );
  }

  if (app.id === 'whatsapp') {
    return (
      <div
        style={{
          padding: '0.65rem',
          borderRadius: '11px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
        }}
      >
        <div style={{ fontSize: '0.74rem', color: '#e2e8f0', lineHeight: 1.5 }}>
          اتصال سوکت رمزنگاری‌شده و پایگاه‌داده ایزوله در مسیر اختصاصی:
        </div>
        <div
          className="mono"
          dir="ltr"
          style={{
            fontSize: '0.67rem',
            padding: '0.25rem 0.5rem',
            borderRadius: '6px',
            background: 'rgba(0,0,0,0.35)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#38bdf8',
            textAlign: 'left',
            wordBreak: 'break-all',
          }}
        >
          /data/data/com.whatsapp/
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '0.65rem',
        borderRadius: '11px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        fontSize: '0.74rem',
        lineHeight: 1.55,
        color: '#e2e8f0',
      }}
    >
      {app.screenDesc}
    </div>
  );
}

export function PhoneSimulator() {
  const [phoneScreen, setPhoneScreen] = useState<PhoneScreen>('home');
  const [activeAppId, setActiveAppId] = useState<string | null>(null);
  const [runningProcs, setRunningProcs] = useState<RunningProc[]>([
    { app: SIM_APPS[3], pid: 4120, oomAdj: 200, state: 'Service' },
  ]);
  const [nextPid, setNextPid] = useState(5200);
  const [inspectorTab, setInspectorTab] = useState<InspectorTab>('trace');
  const [selectedAdbCmd, setSelectedAdbCmd] = useState<'ps' | 'meminfo' | 'selinux' | 'sf'>('ps');
  const [copied, setCopied] = useState(false);
  const [alertShake, setAlertShake] = useState(false);
  const [stressRunning, setStressRunning] = useState(false);
  const [traceLog, setTraceLog] = useState<TraceEntry[]>([
    {
      id: 1,
      time: '00.00s',
      tag: 'INIT BOOT',
      color: '#3ddc84',
      titleFa: 'هسته لینوکس و Zygote64 آماده خدمت‌رسانی هستند',
      sysCall: 'init (PID 1) ➔ zygote64 (PID 842) ➔ system_server (PID 912)',
      detailFa: 'برای مشاهده رویدادها، روی یکی از آیکون‌های گوشی کلیک کنید یا دکمه تست استرس رم را بزنید.',
    },
  ]);

  const appendTrace = (entries: Omit<TraceEntry, 'id'>[]) => {
    setTraceLog((prev) => {
      let idx = prev.length + 1;
      const mapped = entries.map((e) => ({ ...e, id: idx++ }));
      return [...mapped, ...prev].slice(0, 16);
    });
  };

  const triggerShake = () => {
    setAlertShake(true);
    window.setTimeout(() => setAlertShake(false), 450);
  };

  const activeApp = SIM_APPS.find((a) => a.id === activeAppId) ?? null;

  const usedRamMb =
    SYSTEM_BASE_RAM_MB + runningProcs.reduce((sum, item) => sum + item.app.ramMb, 0);
  const ramPercent = Math.min(100, Math.round((usedRamMb / TOTAL_RAM_MB) * 100));

  const launchApp = (app: SimAppDef) => {
    const existing = runningProcs.find((p) => p.app.id === app.id);
    const assignedPid = existing ? existing.pid : nextPid;
    if (!existing) {
      setNextPid((p) => p + 137);
    }

    let updated: RunningProc[] = runningProcs
      .filter((p) => p.app.id !== app.id)
      .map((p) => ({
        ...p,
        state: p.app.id === 'spotify' ? 'Service' : 'Cached',
        oomAdj: p.app.id === 'spotify' ? 200 : 900,
      }));

    updated = [{ app, pid: assignedPid, oomAdj: 0, state: 'Foreground' }, ...updated];

    const killedNames: string[] = [];
    let currentSum = SYSTEM_BASE_RAM_MB + updated.reduce((s, p) => s + p.app.ramMb, 0);
    while (currentSum > TOTAL_RAM_MB * 0.88) {
      const victimIndex = [...updated].reverse().findIndex((p) => p.state === 'Cached');
      if (victimIndex === -1) break;
      const realIdx = updated.length - 1 - victimIndex;
      const victim = updated[realIdx];
      killedNames.push(`${victim.app.faName} (adj=${victim.oomAdj})`);
      currentSum -= victim.app.ramMb;
      updated.splice(realIdx, 1);
    }

    setRunningProcs(updated);
    setActiveAppId(app.id);
    setPhoneScreen('app');

    const newTraces: Omit<TraceEntry, 'id'>[] = [
      {
        time: '0ms',
        tag: 'TOUCH IRQ',
        color: '#fb7185',
        titleFa: `دریافت وقفه سخت‌افزاری تاچ‌اسکرین (${app.faName})`,
        sysCall: 'IRQ ➔ /dev/input/event* ➔ InputDispatcher',
        detailFa: `تبدیل سیگنال تاچ به رویداد لمس آیکون برنامه در لانچر.`,
      },
      {
        time: '14ms',
        tag: 'BINDER IPC',
        color: '#a78bfa',
        titleFa: 'ارسال درخواست startActivity به ActivityManager',
        sysCall: `/dev/binder ➔ AMS.startActivity("${app.pkg}")`,
        detailFa: 'انتقال ساختار فراخوانی بین پروسه‌ها با یک‌بار کپی حافظه در سطح درایور بایندر.',
      },
      {
        time: existing ? '26ms' : '48ms',
        tag: existing ? 'WARM RESUME' : 'ZYGOTE FORK',
        color: existing ? '#38bdf8' : '#fbbf24',
        titleFa: existing
          ? 'بازیابی سریع پروسه از حافظه رم (Warm Start)'
          : 'انشعاب پروسه با الگوی کپی در نوشتن (Copy-on-Write)',
        sysCall: existing
          ? `PID=${assignedPid} ➔ Promoted to Foreground (oom_score_adj: 0)`
          : `Zygote64.fork() ➔ PID=${assignedPid} | UID=${app.uid}`,
        detailFa: existing
          ? 'پروسه از قبل در حافظه کش آماده بود و بدون تأخیر بالا آمد.'
          : `اشتراک کتابخانه‌های پیش‌بارگذاری‌شده بدون مصرف مضاعف حافظه رم.`,
      },
      {
        time: '130ms',
        tag: 'RENDER SF',
        color: '#3ddc84',
        titleFa: 'اجرا در ماشین مجازی ART و ارسال فریم به SurfaceFlinger',
        sysCall: `SurfaceFlinger.latchBuffer() ➔ Render @ 120Hz VSync`,
        detailFa: `لایه گرافیکی ${app.activityName} با پالس ساعت نمایشگر سینک و نمایش داده شد.`,
      },
    ];

    if (killedNames.length > 0) {
      triggerShake();
      newTraces.push({
        time: '145ms',
        tag: 'LMK KILL',
        color: '#fb7185',
        titleFa: 'هشدار بحرانی رم! حذف اپ‌های کش‌شده',
        sysCall: `lmkd ➔ SIGKILL [${killedNames.join(', ')}]`,
        detailFa: `برای تأمین رم اپلیکیشن ${app.faName}، پروسه‌های پس‌زمینه قربانی شدند.`,
      });
    }

    appendTrace(newTraces);
  };

  // Stress test sequence to entertain the audience & show live LMK
  useEffect(() => {
    if (!stressRunning) return;
    const sequence = [SIM_APPS[2], SIM_APPS[4], SIM_APPS[1], SIM_APPS[0]];
    let step = 0;
    const interval = window.setInterval(() => {
      if (step >= sequence.length) {
        setStressRunning(false);
        window.clearInterval(interval);
        return;
      }
      launchApp(sequence[step]);
      step += 1;
    }, 650);

    return () => window.clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stressRunning]);

  const goHome = () => {
    setRunningProcs((prev) =>
      prev.map((p) => ({
        ...p,
        state: p.app.id === 'spotify' ? 'Service' : 'Cached',
        oomAdj: p.app.id === 'spotify' ? 200 : 900,
      })),
    );
    setPhoneScreen('home');
    setActiveAppId(null);
    appendTrace([
      {
        time: '0ms',
        tag: 'AMS STATE',
        color: '#38bdf8',
        titleFa: 'بازگشت به لانچر و تعلیق پروسه',
        sysCall: 'ActivityRecord.setState(STOPPED) ➔ oom_score_adj: 900',
        detailFa: 'پروسه به دسته برنامه‌های کش‌شده (Cached) رفت تا رم را بی‌مورد اشغال نکند.',
      },
    ]);
  };

  const simulateUnauthorizedRead = () => {
    const caller = activeApp ?? SIM_APPS[1];
    triggerShake();
    appendTrace([
      {
        time: 'ALERT',
        tag: 'SELINUX',
        color: '#fb7185',
        titleFa: 'مسدودسازی دسترسی غیرمجاز توسط لینوکس',
        sysCall: `avc: denied { read } for scontext=${caller.seContext} path="/data/data/com.whatsapp"`,
        detailFa: `سندباکس امنیتی بر پایه UID مستقل لینوکس مانع از دسترسی برنامه ${caller.faName} شد.`,
      },
    ]);
  };

  const resetPhone = () => {
    setStressRunning(false);
    setPhoneScreen('home');
    setActiveAppId(null);
    setRunningProcs([{ app: SIM_APPS[3], pid: 4120, oomAdj: 200, state: 'Service' }]);
    setTraceLog([
      {
        id: 1,
        time: '00.00s',
        tag: 'RESET',
        color: '#3ddc84',
        titleFa: 'راه‌اندازی مجدد شبیه‌ساز گوشی',
        sysCall: 'killall user_apps ➔ Keep Background Service [Spotify]',
        detailFa: 'وضعیت سیستم‌عامل بازنشانی شد؛ فقط سرویس موسیقی پس‌زمینه فعال است.',
      },
    ]);
  };

  const adbCommands = {
    ps: {
      cmd: 'adb shell ps -A -o USER,PID,OOM_ADJ,NAME',
      out: [
        'USER           PID  ADJ  NAME',
        'root             1 -1000 /system/bin/init',
        'root           842 -1000 zygote64',
        'system         912 -1000 /system/bin/surfaceflinger',
        ...runningProcs.map(
          (p) =>
            `${p.app.uid.padEnd(13)} ${String(p.pid).padStart(4)} ${String(p.oomAdj).padStart(4)}  ${p.app.pkg}`,
        ),
      ].join('\n'),
    },
    meminfo: {
      cmd: 'adb shell dumpsys meminfo | head -n 14',
      out: [
        `Total RAM: ${TOTAL_RAM_MB} MB  |  Used: ${usedRamMb} MB (${ramPercent}%)  |  Free: ${TOTAL_RAM_MB - usedRamMb} MB`,
        'PSS by running process:',
        '  420 MB: system_server + surfaceflinger',
        ...runningProcs.map(
          (p) => `  ${String(p.app.ramMb).padStart(3)} MB: ${p.app.pkg} (pid ${p.pid} / ${p.state})`,
        ),
      ].join('\n'),
    },
    selinux: {
      cmd: 'adb shell getenforce && adb shell ps -AZ | tail -n 5',
      out: [
        'Enforcing',
        'LABEL                          USER          PID NAME',
        'u:r:zygote:s0                  root          842 zygote64',
        ...runningProcs.map(
          (p) => `${p.app.seContext.padEnd(30)} ${p.app.uid.padEnd(12)} ${String(p.pid).padStart(4)} ${p.app.pkg}`,
        ),
      ].join('\n'),
    },
    sf: {
      cmd: 'adb shell dumpsys SurfaceFlinger --list',
      out: [
        'Display 0 (1080x2400 @ 120Hz VSync) HWC layers:',
        '  Wallpaper BBQ wrapper#41',
        activeApp
          ? `  ${activeApp.pkg}/${activeApp.activityName}#104 (Active)`
          : '  com.android.launcher3/Launcher#82 (Active)',
        '  StatusBar#19',
        '  NavigationBar0#21',
      ].join('\n'),
    },
  };

  const handleCopyAdb = async () => {
    try {
      await navigator.clipboard.writeText(adbCommands[selectedAdbCmd].cmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Ignore
    }
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '305px 1fr',
        gap: '1.35rem',
        alignItems: 'center',
      }}
    >
      {/* LEFT: Realistic Interactive Android Smartphone */}
      <div
        className={alertShake ? 'shake-alert' : ''}
        style={{
          width: '295px',
          height: '515px',
          margin: '0 auto',
          borderRadius: '38px',
          padding: '11px',
          background: 'linear-gradient(145deg, #2b394d, #0c121b)',
          border: alertShake ? '2px solid #fb7185' : '2px solid rgba(148, 163, 184, 0.3)',
          boxShadow: '0 26px 65px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.09)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'border-color 0.2s ease',
        }}
      >
        <div
          style={{
            flex: 1,
            borderRadius: '28px',
            overflow: 'hidden',
            background:
              phoneScreen === 'home'
                ? 'radial-gradient(circle at 30% 20%, #15344d, #08101a 72%)'
                : '#0b121c',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* Status Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.48rem 0.9rem 0.32rem',
              fontSize: '0.7rem',
              color: '#e2e8f0',
              background: 'rgba(0,0,0,0.28)',
            }}
          >
            <span className="mono" dir="ltr">14:05</span>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#020408',
                border: '1px solid rgba(255,255,255,0.18)',
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Wifi size={12} />
              <span className="mono" dir="ltr" style={{ color: ramPercent > 82 ? '#fb7185' : '#3ddc84' }}>
                RAM {ramPercent}%
              </span>
            </div>
          </div>

          {/* Screen Body */}
          <div style={{ flex: 1, padding: '0.72rem', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {phoneScreen === 'home' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.82rem', height: '100%' }}>
                <div
                  style={{
                    padding: '0.68rem 0.78rem',
                    borderRadius: '16px',
                    background: 'rgba(255,255,255,0.075)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.11)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: '0.35rem' }}>
                    <span style={{ color: '#3ddc84', fontWeight: 700 }}>Android 15 • Kernel 6.6</span>
                    <span className="mono" dir="ltr">{usedRamMb}/{TOTAL_RAM_MB}MB</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(0,0,0,0.35)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${ramPercent}%`,
                        height: '100%',
                        background: ramPercent > 82 ? '#fb7185' : '#3ddc84',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem' }}>
                  {SIM_APPS.map((app) => {
                    const isRunning = runningProcs.some((p) => p.app.id === app.id);
                    return (
                      <button
                        key={app.id}
                        type="button"
                        onClick={() => launchApp(app)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#f8fafc',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.32rem',
                        }}
                      >
                        <div
                          style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '15px',
                            background: `${app.color}26`,
                            border: `1.5px solid ${app.color}`,
                            color: app.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            boxShadow: isRunning ? `0 0 16px ${app.color}55` : 'none',
                            transition: 'transform 0.15s ease',
                          }}
                        >
                          {getAppIcon(app.id, 21)}
                          {isRunning && (
                            <span
                              style={{
                                position: 'absolute',
                                top: '-3px',
                                right: '-3px',
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                background: '#3ddc84',
                                border: '2px solid #0b121c',
                              }}
                            />
                          )}
                        </div>
                        <span style={{ fontSize: '0.73rem', fontWeight: 600 }}>{app.faName}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Fun Interactive Stress Test Button right on Home Screen */}
                <button
                  type="button"
                  onClick={() => setStressRunning(true)}
                  disabled={stressRunning}
                  style={{
                    marginTop: 'auto',
                    padding: '0.58rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(251, 191, 36, 0.5)',
                    background: 'rgba(251, 191, 36, 0.14)',
                    color: '#fbbf24',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: stressRunning ? 'wait' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <Flame size={15} />
                  <span>{stressRunning ? 'در حال پر کردن رم...' : 'تست استرس رم (شکار LMK!)'}</span>
                </button>
              </div>
            )}

            {phoneScreen === 'app' && activeApp && (
              <div
                key={activeApp.id}
                className="app-launch-anim"
                style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', height: '100%' }}
              >
                {/* App Title Header */}
                <div
                  style={{
                    padding: '0.5rem 0.7rem',
                    borderRadius: '12px',
                    background: `${activeApp.color}1c`,
                    border: `1px solid ${activeApp.color}55`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <div style={{ color: activeApp.color }}>{getAppIcon(activeApp.id, 18)}</div>
                      <span style={{ fontWeight: 800, fontSize: '0.9rem', color: activeApp.color }}>
                        {activeApp.faName}
                      </span>
                    </div>
                    <span
                      className="mono"
                      dir="ltr"
                      style={{
                        fontSize: '0.68rem',
                        padding: '0.1rem 0.4rem',
                        borderRadius: '5px',
                        background: 'rgba(255,255,255,0.08)',
                        color: '#cbd5e1',
                      }}
                    >
                      {activeApp.name}
                    </span>
                  </div>
                  <div
                    className="mono"
                    dir="ltr"
                    style={{
                      fontSize: '0.64rem',
                      color: '#94a3b8',
                      textAlign: 'left',
                      marginTop: '0.2rem',
                    }}
                  >
                    {activeApp.pkg}
                  </div>
                </div>

                {/* App Preview */}
                <LiveAppPreview app={activeApp} />

                {/* Structured Specs Table */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.28rem',
                    background: 'rgba(0,0,0,0.28)',
                    padding: '0.48rem 0.65rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.71rem' }}>
                    <span style={{ color: '#94a3b8' }}>شناسه کاربری (UID):</span>
                    <span className="mono" dir="ltr" style={{ color: '#3ddc84', fontWeight: 700 }}>
                      {activeApp.uid}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.71rem' }}>
                    <span style={{ color: '#94a3b8' }}>مصرف رم (PSS):</span>
                    <span className="mono" dir="ltr" style={{ color: '#e2e8f0', fontWeight: 700 }}>
                      {activeApp.ramMb} MB
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.71rem' }}>
                    <span style={{ color: '#94a3b8' }}>اکتیویتی فعال:</span>
                    <span className="mono" dir="ltr" style={{ color: '#38bdf8', fontSize: '0.66rem' }}>
                      {activeApp.activityName}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.71rem' }}>
                    <span style={{ color: '#94a3b8' }}>کانتکست امنیتی:</span>
                    <span className="mono" dir="ltr" style={{ color: '#a78bfa', fontSize: '0.61rem' }}>
                      {activeApp.seContext}
                    </span>
                  </div>
                </div>

                {/* Permissions List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ fontSize: '0.66rem', color: '#94a3b8' }}>مجوزهای دسترسی (Permissions):</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                    {activeApp.permissions.map((perm) => (
                      <span
                        key={perm}
                        className="mono"
                        dir="ltr"
                        style={{
                          fontSize: '0.6rem',
                          padding: '0.1rem 0.35rem',
                          borderRadius: '5px',
                          background: 'rgba(56,189,248,0.12)',
                          border: '1px solid rgba(56,189,248,0.22)',
                          color: '#38bdf8',
                        }}
                      >
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Security Attack Simulation Button */}
                <button
                  type="button"
                  onClick={simulateUnauthorizedRead}
                  style={{
                    marginTop: 'auto',
                    padding: '0.5rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(251, 113, 133, 0.45)',
                    background: 'rgba(251, 113, 133, 0.14)',
                    color: '#fb7185',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <ShieldAlert size={14} />
                  <span>تست نفوذ: تلاش برای خواندن دیتابیس واتساپ</span>
                </button>
              </div>
            )}

            {phoneScreen === 'recents' && (
              <div className="app-launch-anim" style={{ display: 'flex', flexDirection: 'column', gap: '0.52rem' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#94a3b8' }}>
                  پروسه‌های زنده در رم ({runningProcs.length}):
                </div>
                {runningProcs.map((proc) => (
                  <button
                    key={proc.app.id}
                    type="button"
                    onClick={() => launchApp(proc.app)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.58rem 0.7rem',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.05)',
                      border: `1px solid ${proc.app.color}44`,
                      color: '#f8fafc',
                      cursor: 'pointer',
                      textAlign: 'right',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: proc.app.color }}>{getAppIcon(proc.app.id, 16)}</span>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: 700 }}>{proc.app.faName}</div>
                        <div className="mono" dir="ltr" style={{ fontSize: '0.64rem', color: '#94a3b8', textAlign: 'left' }}>
                          PID {proc.pid} • adj={proc.oomAdj}
                        </div>
                      </div>
                    </div>
                    <span className="mono" dir="ltr" style={{ fontSize: '0.68rem', color: proc.app.color }}>
                      {proc.app.ramMb}MB
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Android Nav Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              padding: '0.52rem 0.75rem',
              background: 'rgba(0,0,0,0.48)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <button
              type="button"
              title="Back"
              onClick={goHome}
              style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', display: 'flex' }}
            >
              <Triangle size={14} style={{ transform: 'rotate(90deg)' }} />
            </button>
            <button
              type="button"
              title="Home"
              onClick={goHome}
              style={{ background: 'none', border: 'none', color: '#f8fafc', cursor: 'pointer', display: 'flex' }}
            >
              <Home size={15} />
            </button>
            <button
              type="button"
              title="Recents"
              onClick={() => setPhoneScreen((prev) => (prev === 'recents' ? 'home' : 'recents'))}
              style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', display: 'flex' }}
            >
              <Square size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT: Live OS Kernel X-Ray & ADB Inspector */}
      <div className="glass-card" style={{ height: '515px', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '0.45rem' }}>
            {[
              { id: 'trace' as const, label: 'ردیابی زنده کرنل (X-Ray)', icon: <Activity size={15} /> },
              { id: 'procs' as const, label: `پروسه‌ها و LMK (${runningProcs.length})`, icon: <Layers size={15} /> },
              { id: 'adb' as const, label: 'ترمینال ADB روی همین گوشی', icon: <Terminal size={15} /> },
            ].map((tab) => {
              const active = inspectorTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setInspectorTab(tab.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.44rem 0.75rem',
                    borderRadius: '10px',
                    border: active ? '1px solid #3ddc84' : '1px solid var(--border-subtle)',
                    background: active ? 'var(--android-green-dim)' : 'rgba(255,255,255,0.03)',
                    color: active ? '#3ddc84' : 'var(--text-secondary)',
                    fontSize: '0.78rem',
                    fontWeight: active ? 700 : 500,
                    cursor: 'pointer',
                  }}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={resetPhone}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.4rem 0.65rem',
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)',
              background: 'rgba(255,255,255,0.03)',
              color: 'var(--text-secondary)',
              fontSize: '0.75rem',
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={13} />
            <span>ریست گوشی</span>
          </button>
        </div>

        {inspectorTab === 'trace' && (
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.48rem', paddingRight: '0.2rem' }}>
            {traceLog.map((entry) => (
              <div
                key={entry.id}
                className="slide-animate"
                style={{
                  display: 'flex',
                  alignItems: 'stretch',
                  gap: '0.75rem',
                  padding: '0.55rem 0.8rem',
                  borderRadius: '11px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRight: `3.5px solid ${entry.color}`,
                }}
              >
                {/* Left Tag + Time Pill (LTR) */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem',
                    minWidth: '82px',
                  }}
                >
                  <span
                    className="mono"
                    dir="ltr"
                    style={{
                      fontSize: '0.67rem',
                      fontWeight: 700,
                      padding: '0.18rem 0.45rem',
                      borderRadius: '6px',
                      background: `${entry.color}22`,
                      color: entry.color,
                      border: `1px solid ${entry.color}44`,
                      width: '100%',
                      textAlign: 'center',
                    }}
                  >
                    {entry.tag}
                  </span>
                  <span className="mono" dir="ltr" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    {entry.time}
                  </span>
                </div>

                {/* Right: Pure RTL Content with isolated LTR code box */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.22rem', textAlign: 'right' }}>
                  <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#f8fafc' }}>
                    {entry.titleFa}
                  </div>

                  <div
                    className="mono"
                    dir="ltr"
                    style={{
                      fontSize: '0.71rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '6px',
                      background: 'rgba(0, 0, 0, 0.45)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: '#38bdf8',
                      textAlign: 'left',
                      wordBreak: 'break-all',
                    }}
                  >
                    {entry.sysCall}
                  </div>

                  {entry.detailFa && (
                    <div style={{ fontSize: '0.73rem', color: '#94a3b8', lineHeight: 1.45 }}>
                      {entry.detailFa}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {inspectorTab === 'procs' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.72rem', overflowY: 'auto' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              با زدن دکمه <strong>«تست استرس رم»</strong> روی صفحه خانه گوشی، به محض عبور رم از{' '}
              <strong style={{ color: '#fb7185' }}>۸۸٪</strong> سرویس <span className="code-pill">lmkd</span> اپ‌های{' '}
              <span className="code-pill">Cached</span> را قربانی می‌کند!
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {runningProcs.map((proc) => (
                <div
                  key={proc.app.id}
                  className="slide-animate"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.6rem 0.85rem',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid ${proc.app.color}33`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <Lock size={14} color={proc.app.color} />
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.84rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span>{proc.app.faName}</span>
                        <span className="mono" dir="ltr" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          ({proc.app.uid})
                        </span>
                      </div>
                      <div className="mono" dir="ltr" style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textAlign: 'left' }}>
                        PID: {proc.pid} • {proc.app.seContext}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span className="mono" dir="ltr" style={{ fontSize: '0.75rem', color: '#e2e8f0' }}>
                      {proc.app.ramMb} MB
                    </span>
                    <span
                      className="mono"
                      dir="ltr"
                      style={{
                        fontSize: '0.72rem',
                        padding: '0.18rem 0.5rem',
                        borderRadius: '6px',
                        background:
                          proc.state === 'Foreground'
                            ? 'rgba(61,220,132,0.18)'
                            : proc.state === 'Service'
                              ? 'rgba(56,189,248,0.18)'
                              : 'rgba(251,191,36,0.18)',
                        color:
                          proc.state === 'Foreground'
                            ? '#3ddc84'
                            : proc.state === 'Service'
                              ? '#38bdf8'
                              : '#fbbf24',
                      }}
                    >
                      {proc.state} (adj={proc.oomAdj})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {inspectorTab === 'adb' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.65rem', minHeight: 0 }}>
            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
              {[
                { id: 'ps' as const, label: 'ps -A (UID & OOM)' },
                { id: 'meminfo' as const, label: 'dumpsys meminfo' },
                { id: 'selinux' as const, label: 'SELinux (getenforce)' },
                { id: 'sf' as const, label: 'SurfaceFlinger' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setSelectedAdbCmd(btn.id)}
                  className="mono"
                  dir="ltr"
                  style={{
                    padding: '0.35rem 0.65rem',
                    borderRadius: '8px',
                    fontSize: '0.74rem',
                    border: selectedAdbCmd === btn.id ? '1px solid #38bdf8' : '1px solid var(--border-subtle)',
                    background: selectedAdbCmd === btn.id ? 'rgba(56,189,248,0.15)' : 'rgba(255,255,255,0.03)',
                    color: selectedAdbCmd === btn.id ? '#38bdf8' : '#cbd5e1',
                    cursor: 'pointer',
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            <div
              className="terminal-box"
              dir="ltr"
              style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.45rem' }}>
                <span className="mono" dir="ltr" style={{ color: '#3ddc84' }}>$ {adbCommands[selectedAdbCmd].cmd}</span>
                <button
                  type="button"
                  onClick={handleCopyAdb}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    background: 'rgba(255,255,255,0.08)',
                    border: 'none',
                    color: copied ? '#3ddc84' : '#e2e8f0',
                    borderRadius: '6px',
                    padding: '0.2rem 0.5rem',
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                  }}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? 'کپی شد' : 'کپی'}</span>
                </button>
              </div>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit', color: '#e2e8f0', textAlign: 'left' }} dir="ltr">
                {adbCommands[selectedAdbCmd].out}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
