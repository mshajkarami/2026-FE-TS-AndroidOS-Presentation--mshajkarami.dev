import type { SimAppDef, SlideDefinition, SpeakerId, SpeakerMeta } from '../types/presentation';

export const SPEAKERS: Record<SpeakerId, SpeakerMeta> = {
  all: {
    id: 'all',
    name: 'گروه هفتم',
    role: 'ارائه مشترک',
    color: '#3ddc84',
  },
  speaker1: {
    id: 'speaker1',
    name: 'بخش ۱: مهندس حسنپور',
    role: 'معماری پایه، کرنل لینوکس، EAS و HAL',
    color: '#38bdf8',
  },
  speaker2: {
    id: 'speaker2',
    name: 'بخش ۲: مهندس ریسمانی',
    role: 'Zygote، ART، چرخه حیات و حافظه',
    color: '#fbbf24',
  },
  speaker3: {
    id: 'speaker3',
    name: 'بخش ۳: مهندس حاج کرمی',
    role: 'امنیت، Rust/pKVM، گرافیک و شبیه‌ساز گوشی',
    color: '#3ddc84',
  },
};

export interface SectionFrameContent {
  kind: 'intro' | 'outro';
  partLabel: string;
  presenter: string;
  color: string;
  headline: string;
  lead: string;
  bullets: { title: string; detail: string }[];
  handoffLabel: string;
  handoffText: string;
}

export const SECTION_FRAMES: Record<string, SectionFrameContent> = {
  'p1-intro': {
    kind: 'intro',
    partLabel: 'مقدمه بخش اول',
    presenter: 'مهندس حسنپور',
    color: '#38bdf8',
    headline: 'از سخت‌افزار خام تا کرنل بهینه‌شده موبایل',
    lead: 'در بخش اول بررسی می‌کنیم چرا کرنل لینوکس دسکتاپ برای گوشی کافی نبود و گوگل چه تغییراتی در ارتباط پروسه‌ها، زمان‌بندی CPU، توان و پارتیشن‌بندی داد.',
    bullets: [
      { title: '۱. مرز تفاوت‌ها', detail: 'چرا باینری اوبونتو روی گوشی اجرا نمی‌شود؟' },
      { title: '۲. شریان کرنل و CPU', detail: 'نقش Binder، زمان‌بندی EAS و Wakelocks چیست؟' },
      { title: '۳. پل سخت‌افزار و آپدیت', detail: 'چطور HAL، Treble و آپدیت A/B بدون وقفه کار می‌کنند؟' },
    ],
    handoffLabel: 'نقطه شروع بخش ۱',
    handoffText: 'ابتدا با یک چالش کلاسی درباره تفاوت لینوکس دسکتاپ و اندروید شروع می‌کنیم.',
  },
  'p1-outro': {
    kind: 'outro',
    partLabel: 'نتیجه‌گیری بخش اول',
    presenter: 'مهندس حسنپور',
    color: '#38bdf8',
    headline: 'جمع‌بندی لایه کرنل، زمان‌بندی و سخت‌افزار',
    lead: 'تا اینجا دیدیم اندروید هسته لینوکس را حفظ کرده اما ارتباطات، زمان‌بندی هسته‌ها، مصرف باتری و پارتیشن‌ها را کاملاً برای موبایل مهندسی مجدد کرده است.',
    bullets: [
      { title: 'Binder و EAS', detail: 'ارتباط ۱-کپی با mmap و توزیع انرژی‌آگاه رشته‌ها روی هسته‌های big.LITTLE.' },
      { title: 'بیداری کنترل‌شده', detail: 'Wakelock، Doze و Ashmem مصرف باتری در Standby را به حداقل می‌رسانند.' },
      { title: 'Treble و اسلات A/B', detail: 'جداسازی /vendor از /system و آپدیت بی‌خطر سیستم‌عامل در پس‌زمینه.' },
    ],
    handoffLabel: 'انتقال به بخش دوم (مهندس ریسمانی)',
    handoffText: 'حالا که کرنل و سخت‌افزار آماده پاسخ‌گویی هستند، ببینیم اپلیکیشن چطور متولد، کامپایل و در رم مدیریت می‌شود.',
  },
  'p2-intro': {
    kind: 'intro',
    partLabel: 'مقدمه بخش دوم',
    presenter: 'مهندس ریسمانی',
    color: '#fbbf24',
    headline: 'از تولد پروسه تا چرخه حیات، کار پس‌زمینه و مدیریت رم',
    lead: 'در بخش دوم وارد قلب اجرایی سیستم‌عامل می‌شویم: چطور اپ‌ها سریع بالا می‌آیند، چطور تایمر ANR از فریز شدن گوشی جلوگیری می‌کند و رم بدون Swap چطور مدیریت می‌شود؟',
    bullets: [
      { title: '۱. سرعت Boot و اجرا', detail: 'جادوی Zygote (Copy-on-Write) و تکامل Dalvik تا ART هیبرید.' },
      { title: '۲. کنترل رفتار اپ', detail: 'مکانیزم تایمر ۵ ثانیه‌ای ANR و سهمیه‌بندی Standby Buckets.' },
      { title: '۳. بقای حافظه', detail: 'چرا Swap ممنوع است و zRAM با lmkd چطور رم را نجات می‌دهند؟' },
    ],
    handoffLabel: 'نقطه شروع بخش ۲',
    handoffText: 'ابتدا ببینیم لحظه روشن شدن گوشی تا باز شدن اولین اپ چه اتفاقی می‌افتد.',
  },
  'p2-outro': {
    kind: 'outro',
    partLabel: 'نتیجه‌گیری بخش دوم',
    presenter: 'مهندس ریسمانی',
    color: '#fbbf24',
    headline: 'جمع‌بندی اجرا، چرخه حیات و مدیریت حافظه',
    lead: 'هوشمندی اندروید در فضای اجرا، محدودسازی کارهای پس‌زمینه و حذف پیشگیرانه پروسه‌ها باعث شده گوشی با رم محدود همیشه روان و پاسخ‌گو بماند.',
    bullets: [
      { title: 'Zygote و ART مدرن', detail: 'انشعاب با fork() و کامپایل تطبیقی بر اساس پروفایل رفتار کاربر.' },
      { title: 'پاسخ‌گویی تضمین‌شده', detail: 'تشخیص قفل‌شدن نخ UI با تایمر ANR و زمان‌بندی JobScheduler.' },
      { title: 'حذف پیشگیرانه رم', detail: 'zRAM و lmkd بر پایه oom_score_adj و معیار PSS از رم محافظت می‌کنند.' },
    ],
    handoffLabel: 'انتقال به بخش سوم (مهندس حاج کرمی)',
    handoffText: 'حالا که پروسه ساخته شد و در رم جای گرفت، ببینیم چطور امنیتش حفظ می‌شود، تصویرش رندر می‌گردد و همه‌چیز را روی شبیه‌ساز گوشی تست کنیم.',
  },
  'p3-intro': {
    kind: 'intro',
    partLabel: 'مقدمه بخش سوم',
    presenter: 'مهندس حاج کرمی',
    color: '#3ddc84',
    headline: 'امنیت سخت‌افزاری، گرافیک، هوش مصنوعی و تست زنده گوشی',
    lead: 'در بخش پایانی و کامل‌ترین بخش ارائه، از ایزوله‌سازی کرنل و تراشه امنیتی TrustZone تا رندر ۱۲۰ هرتز، اجرای AI روی NPU، معماری ADB/Perfetto و شبیه‌ساز زنده گوشی را بررسی می‌کنیم.',
    bullets: [
      { title: '۱. دژ امنیت نرم‌افزاری و سخت‌افزاری', detail: 'UID یکتا، SELinux، TrustZone (TEE)، Rust در کرنل و pKVM.' },
      { title: '۲. حریم خصوصی، گرافیک و NPU', detail: 'Scoped Storage، SurfaceFlinger 120Hz و اجرای مدل AI با NNAPI.' },
      { title: '۳. مشاهده‌پذیری و آزمایش زنده', detail: 'معماری ADB/Perfetto و ردیابی زنده کرنل روی شبیه‌ساز گوشی.' },
    ],
    handoffLabel: 'نقطه شروع بخش ۳',
    handoffText: 'ابتدا از دژ امنیتی سیستم‌عامل و مدل کاربری لینوکس در اندروید شروع می‌کنیم.',
  },
  'p3-outro': {
    kind: 'outro',
    partLabel: 'نتیجه‌گیری بخش سوم',
    presenter: 'مهندس حاج کرمی',
    color: '#3ddc84',
    headline: 'جمع‌بندی امنیت، حریم خصوصی، گرافیک، AI و تست زنده',
    lead: 'در این بخش دیدیم اندروید مدرن فراتر از یک سیستم‌عامل موبایل ساده است و امنیت سخت‌افزاری، گرافیک لحظه‌ای و هوش مصنوعی روی دستگاه را همزمان مدیریت می‌کند.',
    bullets: [
      { title: 'امنیت از کرنل تا تراشه', detail: 'UID + SELinux + Rust + pKVM + TrustZone TEE برای حفاظت کامل داده.' },
      { title: 'گرافیک روان و هوش مصنوعی بومی', detail: 'SurfaceFlinger هماهنگ با VSync و شتاب‌دهی NNAPI روی NPU.' },
      { title: 'مهندسی قابل مشاهده و تست', detail: 'تحلیل عمیق با ADB، Perfetto و تست زنده روی شبیه‌ساز گوشی.' },
    ],
    handoffLabel: 'بخش پایانی مشترک',
    handoffText: 'حالا قبل از جمع‌بندی نهایی، یک مسابقه سریع ۳ سؤالی با کل کلاس داریم!',
  },
};

export const SLIDES: SlideDefinition[] = [
  {
    id: 'cover',
    number: 1,
    title: 'سیستم‌عامل اندروید',
    subtitle: 'کالبدشکافی یک کلیک: از لمس نمایشگر تا اجرای کد در کرنل لینوکس و نمایش تصویر',
    speaker: 'all',
    durationMin: 1,
    speakerNotes: [
      'سلام و معرفی اعضای گروه هفتم: مهندس حسنپور، مهندس ریسمانی و مهندس حاج کرمی (تاریخ ۹/۱۰).',
      'رویکرد ارائه: هر بخش دارای مقدمه کوتاه، تحلیل مهندسی عمیق و نتیجه‌گیری مشخص است به همراه شبیه‌ساز زنده گوشی و مسابقه کلاسی.',
    ],
    transitionCue: 'مهندس حسنپور: «ابتدا نقشه راه کل ارائه را ببینیم.»',
  },
  {
    id: 'agenda',
    number: 2,
    title: 'نقشه راه و سناریوی ارائه',
    subtitle: 'ساختار منظم هر بخش: مقدمه کوتاه ← تحلیل مهندسی + مباحث پیشرفته ← نتیجه‌گیری و انتقال',
    speaker: 'all',
    durationMin: 1,
    speakerNotes: [
      'معرفی ۳ بخش: بخش ۱ (مهندس حسنپور)، بخش ۲ (مهندس ریسمانی)، بخش ۳ (مهندس حاج کرمی).',
    ],
    transitionCue: 'شروع بخش اول با مهندس حسنپور.',
  },
  // --- PART 1: ENG. HASANPOUR ---
  {
    id: 'p1-intro',
    number: 3,
    title: 'مقدمه بخش اول: زیرساخت، کرنل و سخت‌افزار',
    subtitle: 'ارائه‌دهنده: مهندس حسنپور • چطور کرنل دسکتاپ برای محدودیت‌های موبایل بازطراحی شد؟',
    speaker: 'speaker1',
    durationMin: 0.5,
    speakerNotes: ['در ۳۰ ثانیه ۳ سؤال اصلی بخش اول را مطرح کنید.'],
    transitionCue: '«از اولین چالش کلاسی شروع کنیم...»',
  },
  {
    id: 'hook',
    number: 4,
    title: 'چالش مهندسی: چرا اندروید لینوکسِ معمولی نیست؟',
    subtitle: 'وقتی محدودیت باتری، حافظه فلش و امنیت چنداپلیکیشنی قواعد سیستم‌عامل را بازنویسی می‌کند',
    speaker: 'speaker1',
    durationMin: 1.5,
    speakerNotes: ['چالش کلاسی با ۳ گزینه و توضیح ۴ تفاوت بنیادی (Bionic، Suspend، نبود Swap، 1 App = 1 UID).'],
    transitionCue: '«حالا جایگاه این اجزا را در معماری ۵ لایه ببینیم.»',
  },
  {
    id: 'os-stack',
    number: 5,
    title: 'معماری ۵ لایه اندروید (Interactive OS Stack)',
    subtitle: 'روی هر لایه کلیک کنید تا مرز Kernel Space و User Space و سرویس‌های هر لایه را ببینید',
    speaker: 'speaker1',
    durationMin: 1.5,
    speakerNotes: ['روی لایه‌ها از پایین به بالا کلیک کنید و مرز Kernel Space و User Space را نشان دهید.'],
    transitionCue: '«حالا یک کلیک واقعی روی آیکون دوربین را روی همین معماری دنبال کنیم.»',
  },
  {
    id: 'tap-anatomy',
    number: 6,
    title: 'سفر ۲۵۰ میلی‌ثانیه‌ای یک کلیک (Anatomy of a Tap)',
    subtitle: 'دکمه پخش انیمیشن را بزنید تا مسیر واقعی یک لمس از تاچ‌اسکرین تا نمایشگر دیده شود',
    speaker: 'speaker1',
    durationMin: 1.5,
    speakerNotes: ['پخش خودکار مراحل ۱ تا ۵: IRQ → Binder → Zygote → ART/LMK → SurfaceFlinger.'],
    transitionCue: '«حالا تغییرات اختصاصی گوگل در کرنل لینوکس را دقیق‌تر بررسی کنیم.»',
  },
  {
    id: 'kernel-binder',
    number: 7,
    title: 'تغییرات کرنل: مکانیزم ارتباطی Binder IPC',
    subtitle: 'چرا ابزارهای کلاسیک لینوکس (Pipe، FIFO، Socket) برای اندروید کافی نبودند؟',
    speaker: 'speaker1',
    durationMin: 1.5,
    speakerNotes: ['تفاوت ۲-Copy در Pipe/Socket با ۱-Copy در Binder از طریق mmap() و امنیت PID/UID.'],
    transitionCue: '«اما کرنل علاوه بر ارتباط سریع، رشته‌ها را روی هسته‌های مختلف CPU چطور زمان‌بندی می‌کند؟»',
  },
  {
    id: 'cpu-eas',
    number: 8,
    title: 'زمان‌بندی انرژی‌آگاه CPU: معماری big.LITTLE و EAS',
    subtitle: 'چطور کرنل اندروید بین هسته‌های پرقدرت و کم‌مصرف تعادل برقرار می‌کند؟',
    speaker: 'speaker1',
    durationMin: 1.5,
    speakerNotes: [
      'در موبایل همه هسته‌های CPU یکسان نیستند (معماری ناهمگن big.LITTLE / DynamIQ).',
      'زمان‌بند CFS معمولی فقط دنبال تعادل بار (Load Balancing) بود، ولی در اندروید Energy Aware Scheduling (EAS) همراه با Schedutil فرکانس و هسته را بر اساس نسبت کارایی به وات انتخاب می‌کند.',
    ],
    transitionCue: '«علاوه بر زمان‌بندی CPU، کرنل با Wakelocks و Doze مراقب خواب عمیق سیستم هم هست.»',
  },
  {
    id: 'kernel-power',
    number: 9,
    title: 'مدیریت توان (Wakelocks / Doze) و حافظه Ashmem',
    subtitle: 'چطور گوشی هوشمند می‌تواند روزها در حالت Standby بدون خالی شدن باتری بماند؟',
    speaker: 'speaker1',
    durationMin: 1.5,
    speakerNotes: ['توضیح Deep Suspend پیش‌فرض، Wakelock، Batching در Doze Mode و حافظه Unpinned در Ashmem.'],
    transitionCue: '«حالا ببینیم لایه انتزاع سخت‌افزار یا HAL چطور مشکل آپدیت‌ها را حل کرد.»',
  },
  {
    id: 'hal-treble',
    number: 10,
    title: 'لایه HAL و انقلاب Project Treble',
    subtitle: 'جداسازی کدهای اختصاصی سازندگان سخت‌افزار از هسته سیستم‌عامل اندروید',
    speaker: 'speaker1',
    durationMin: 1.5,
    speakerNotes: ['حفظ اسرار تجاری به جای GPL کرنل و جداسازی /system از /vendor با AIDL HAL.'],
    transitionCue: '«و اما چطور گوشی هنگام نصب آپدیت بزرگ سیستم‌عامل خراب (Brick) نمی‌شود؟»',
  },
  {
    id: 'partitions-ab',
    number: 11,
    title: 'پارتیشن‌بندی سیستم‌عامل و آپدیت بی‌وقفه (A/B Seamless)',
    subtitle: 'چرا اندروید فایل‌های سیستمی را جدا نگه می‌دارد و با دو اسلات A/B ریسک آپدیت را صفر می‌کند؟',
    speaker: 'speaker1',
    durationMin: 1.5,
    speakerNotes: [
      'پارتیشن‌های اصلی: /boot (کرنل + ramdisk)، /system (فریم‌ورک)، /vendor (HAL)، /userdata (داده کاربر).',
      'در A/B Seamless Updates، وقتی گوشی روی اسلات A روشن است، آپدیت روی اسلات B نصب می‌شود؛ با یک ریستارت سریع بوت می‌شود و اگر خطایی دهد خودکار به اسلات A برمی‌گردد!',
    ],
    transitionCue: '«بخش اول را در یک نگاه جمع‌بندی کنیم.»',
  },
  {
    id: 'p1-outro',
    number: 12,
    title: 'نتیجه‌گیری بخش اول: کرنل، زمان‌بندی و سخت‌افزار',
    subtitle: 'خلاصه دستاوردهای بخش اول و انتقال به بخش دوم (مهندس ریسمانی)',
    speaker: 'speaker1',
    durationMin: 0.5,
    speakerNotes: ['مرور سریع ۳ نکته کلیدی بخش ۱ و دادن میکروفون به مهندس ریسمانی.'],
    transitionCue: '«ادامه ارائه با هم‌گروهی‌ام مهندس ریسمانی در بخش اجرای کد و مدیریت حافظه.»',
  },
  // --- PART 2: ENG. REISMANI ---
  {
    id: 'p2-intro',
    number: 13,
    title: 'مقدمه بخش دوم: اجرا، چرخه حیات و مدیریت حافظه',
    subtitle: 'ارائه‌دهنده: مهندس ریسمانی • چطور اپ‌ها در میلی‌ثانیه متولد می‌شوند و رم پر شده مدیریت می‌شود؟',
    speaker: 'speaker2',
    durationMin: 0.5,
    speakerNotes: ['بیان کوتاه ۳ محور بخش دوم: Zygote/ART، ANR/Standby Buckets و مدیریت رم بدون Swap.'],
    transitionCue: '«از لحظه بوت سیستم و پروسه مادر Zygote شروع می‌کنیم.»',
  },
  {
    id: 'zygote',
    number: 14,
    title: 'تولد پروسه: زنجیره Boot و جادوی Zygote',
    subtitle: 'چرا باز کردن یک اپلیکیشن با هزاران کلاس فقط چند ده میلی‌ثانیه طول می‌کشد؟',
    speaker: 'speaker2',
    durationMin: 1.5,
    speakerNotes: ['Bootloader → Kernel → init → Zygote → fork() + Copy-on-Write.'],
    transitionCue: '«پروسه از Zygote منشعب شد؛ اما کدهای برنامه دقیقاً چطور توسط CPU اجرا می‌شوند؟»',
  },
  {
    id: 'art-dalvik',
    number: 15,
    title: 'تکامل محیط اجرا: از Dalvik تا ART مدرن',
    subtitle: 'موازنه مهندسی بین زمان نصب، فضای ذخیره‌سازی، سرعت اجرا و مصرف باتری',
    speaker: 'speaker2',
    durationMin: 1.5,
    speakerNotes: ['مقایسه Dalvik (Pure JIT)، ART Android 5 (Full AOT) و ART مدرن (JIT + Profile-Guided AOT).'],
    transitionCue: '«مسیر تبدیل فایل کد نویس تا فایل بومی ARM64 را روی دیسک ببینیم.»',
  },
  {
    id: 'dex-pipeline',
    number: 16,
    title: 'خط لوله کامپایل کد در اندروید (APK تا .oat)',
    subtitle: 'تفاوت بایت‌کد JVM استاندارد با Dalvik Executable (.dex) و فایل‌های ART',
    speaker: 'speaker2',
    durationMin: 1.5,
    speakerNotes: ['.kt/.java → classes.dex → .vdex → .prof → .oat/.art و Concurrent Copying GC.'],
    transitionCue: '«وقتی اپ اجرا شد، سیستم‌عامل چطور مطمئن می‌شود رابط کاربری‌اش قفل یا فریز نشده است؟»',
  },
  {
    id: 'lifecycle-anr',
    number: 17,
    title: 'چرخه حیات اپلیکیشن و تایمر نگهبان ANR',
    subtitle: 'چرا اگر نخ اصلی (Main Thread) بیش از ۵ ثانیه قفل شود، سیستم اخطار توقف می‌دهد؟',
    speaker: 'speaker2',
    durationMin: 1.5,
    speakerNotes: [
      'در اندروید برخلاف دسکتاپ، کاربر دکمه Close ندارد؛ سیستم‌عامل چرخه حیات (onCreate → onResume → onPause → onStop) را مدیریت می‌کند.',
      'ActivityManagerService یک تایمر Watchdog روی رویدادهای ورودی دارد: اگر اپ ظرف ۵ ثانیه به لمس پاسخ ندهد (مثلاً شبکه یا دیتابیس روی UI Thread اجرا شده باشد)، خطای ANR (Application Not Responding) صادر می‌شود.',
    ],
    transitionCue: '«و اگر اپی در پس‌زمینه باشد، سیستم‌عامل چطور کارهایش را بدون مصرف بی‌رویه باتری زمان‌بندی می‌کند؟»',
  },
  {
    id: 'background-buckets',
    number: 18,
    title: 'زمان‌بندی پس‌زمینه: JobScheduler و Standby Buckets',
    subtitle: 'چطور اندروید بر اساس عادت کاربر به اپ‌ها سهمیه اجرا و شبکه می‌دهد؟',
    speaker: 'speaker2',
    durationMin: 1.5,
    speakerNotes: [
      'در نسخه‌های جدید اپ‌ها اجازه ندارند هر لحظه سرویس پس‌زمینه دلخواه باز کنند؛ کارها از طریق JobScheduler / WorkManager با شروطی مثل «فقط روی Wi-Fi و هنگام شارژ» صف می‌شوند.',
      'سیستم هوش مصنوعی داخل OS اپ‌ها را در ۵ سطل (Active, Working Set, Frequent, Rare, Restricted) دسته‌بندی کرده و دسترسی شبکه و CPU اپ‌های کم‌کاربرد را محدود می‌کند.',
    ],
    transitionCue: '«حالا سراغ یکی از حیاتی‌ترین وظایف سیستم‌عامل یعنی مدیریت حافظه رم می‌رویم.»',
  },
  {
    id: 'memory-swap',
    number: 19,
    title: 'مدیریت حافظه بدون Swap: zRAM و معیارهای سنجش رم',
    subtitle: 'چرا اندروید پارتیشن Swap روی حافظه داخلی ندارد و چطور مصرف واقعی رم را حساب می‌کند؟',
    speaker: 'speaker2',
    durationMin: 1.5,
    speakerNotes: ['فرسودگی فلش در اثر Swap، نقش zRAM و تعریف دقیق PSS در برابر RSS و VSS.'],
    transitionCue: '«وقتی حتی zRAM هم پر شود، نوبت به شکارچی هوشمند حافظه یعنی lmkd می‌رسد.»',
  },
  {
    id: 'memory-lmk',
    number: 20,
    title: 'الگوریتم Low Memory Killer (شبیه‌ساز زنده فشار رم)',
    subtitle: 'تغییر وضعیت فشار رم را تست کنید تا نحوه رتبه‌بندی oom_score_adj و حذف پروسه‌ها را ببینید',
    speaker: 'speaker2',
    durationMin: 2,
    speakerNotes: ['تست ۳ حالت فشار رم در شبیه‌ساز و توضیح امتیازهای oom_score_adj.'],
    transitionCue: '«نتایج بخش دوم را جمع‌بندی کنیم.»',
  },
  {
    id: 'p2-outro',
    number: 21,
    title: 'نتیجه‌گیری بخش دوم: اجرا، چرخه حیات و حافظه',
    subtitle: 'خلاصه دستاوردهای بخش دوم و انتقال به بخش سوم (مهندس حاج کرمی)',
    speaker: 'speaker2',
    durationMin: 0.5,
    speakerNotes: ['مرور سریع Zygote، ART مدرن، ANR/Buckets و zRAM/lmkd و انتقال به مهندس حاج کرمی.'],
    transitionCue: '«ادامه ارائه با مهندس حاج کرمی در بخش امنیت، فناوری‌های مدرن، گرافیک و شبیه‌ساز زنده گوشی.»',
  },
  // --- PART 3: ENG. HAJ KARAMI (11 SLIDES - FLAGSHIP SECTION) ---
  {
    id: 'p3-intro',
    number: 22,
    title: 'مقدمه بخش سوم: امنیت، گرافیک، AI و آزمایش عملی',
    subtitle: 'ارائه‌دهنده: مهندس حاج کرمی • از کرنل و تراشه امنیتی تا هوش مصنوعی NPU و شبیه‌ساز گوشی',
    speaker: 'speaker3',
    durationMin: 0.5,
    speakerNotes: ['معرفی کوتاه محورهای بخش سوم پیش از ورود به جزئیات امنیتی و دموی زنده.'],
    transitionCue: '«از اولین لایه دژ امنیتی اندروید یعنی UID Sandboxing شروع می‌کنیم.»',
  },
  {
    id: 'security-sandbox',
    number: 23,
    title: 'امنیت لایه اول: UID Sandboxing و مجوزهای زمان اجرا',
    subtitle: 'هر اپلیکیشن در اندروید یک کاربر مستقل در کرنل لینوکس است',
    speaker: 'speaker3',
    durationMin: 1.5,
    speakerNotes: ['تخصیص UID یکتا (u0_a...)، مجوز DAC روی /data/data/<pkg> و Runtime Permissions.'],
    transitionCue: '«اما اگر یک باگ در کرنل یا سرویس سیستمی پیدا شود چطور؟ اینجا لایه دوم وارد می‌شود.»',
  },
  {
    id: 'security-selinux',
    number: 24,
    title: 'امنیت لایه دوم: SELinux و زنجیره اعتماد بوت',
    subtitle: 'کنترل دسترسی اجباری (MAC) و جلوگیری از دستکاری فایل‌های سیستم‌عامل',
    speaker: 'speaker3',
    durationMin: 1.5,
    speakerNotes: ['SELinux Enforcing، برچسب‌های کانتکست، Verified Boot (dm-verity) و FBE.'],
    transitionCue: '«حتی اگر کل سیستم‌عامل هم به خطر بیفتد، اطلاعات بیومتریک و کلیدهای بانکی کجا مخفی می‌شوند؟»',
  },
  {
    id: 'security-tee',
    number: 25,
    title: 'امنیت سخت‌افزاری: ARM TrustZone (TEE) و تراشه StrongBox',
    subtitle: 'چطور اثر انگشت و کلیدهای رمزنگاری در دنیایی جدا از کرنل اندروید محافظت می‌شوند؟',
    speaker: 'speaker3',
    durationMin: 1.5,
    speakerNotes: [
      'پردازنده‌های ARM دو دنیای مجزا دارند: Normal World (که اندروید و کرنل لینوکس در آن اجرا می‌شوند) و Secure World (TEE / Trusty OS).',
      'حتی پروسه با دسترسی root هم نمی‌تواند حافظه TEE را بخواند! تطبیق اثر انگشت، شناسایی چهره و کلیدهای Keystore در TEE یا تراشه سخت‌افزاری مستقل StrongBox انجام می‌شود.',
    ],
    transitionCue: '«حالا ببینیم اندروید علاوه بر امنیت هسته، چطور از حریم خصوصی فایل‌ها و سنسورهای کاربر دفاع می‌کند.»',
  },
  {
    id: 'privacy-storage',
    number: 26,
    title: 'حریم خصوصی مدرن: Scoped Storage، نشانگر سنسور و Private DNS',
    subtitle: 'محدودسازی دسترسی اپ‌ها به فایل‌های مشترک و رصد زنده دوربین و میکروفون',
    speaker: 'speaker3',
    durationMin: 1.5,
    speakerNotes: [
      'در اندروید قدیمی مجوز Storage دسترسی به کل حافظه می‌داد؛ با Scoped Storage هر اپ فقط به پوشه خودش و فایل‌های رسانه‌ای مشخص دسترسی دارد.',
      'سرویس AppOps / Privacy Indicators به محض فعال شدن دوربین یا میکروفون در سطح HAL، نقطه سبز را در نوار وضعیت روشن می‌کند که هیچ اپی نمی‌تواند دورش بزند.',
      'پشتیبانی بومی کرنل/فریم‌ورک از DNS-over-TLS (Private DNS) برای رمزنگاری تمام پرس‌وجوهای دامنه.',
    ],
    transitionCue: '«اما گوگل در نسخه‌های جدید اندروید چه تحول بزرگی در امنیت کدهای کرنل و آپدیت ماژول‌ها ایجاد کرده است؟»',
  },
  {
    id: 'modern-rust-pkvm',
    number: 27,
    title: 'آینده اندروید: زبان Rust در کرنل، pKVM و Project Mainline',
    subtitle: 'مبارزه با آسیب‌پذیری‌های حافظه (Memory Safety) و ماژولار شدن هسته سیستم‌عامل',
    speaker: 'speaker3',
    durationMin: 1.5,
    speakerNotes: [
      'بازنویسی بلوتوث و Binder با Rust برای حذف ۷۰٪ باگ‌های حافظه، هایپروایزر pKVM و آپدیت ماژول‌های APEX از گوگل‌پلی.',
    ],
    transitionCue: '«حالا سراغ خط لوله گرافیک اندروید و چگونگی رندر ۱۲۰ فریم بر ثانیه می‌رویم.»',
  },
  {
    id: 'graphics-pipeline',
    number: 28,
    title: 'خط لوله گرافیک: SurfaceFlinger، BufferQueue و VSync',
    subtitle: 'چرا اندروید سیستم X11 دسکتاپ را کنار گذاشت و چطور تصویر بدون لگ رندر می‌شود؟',
    speaker: 'speaker3',
    durationMin: 1.5,
    speakerNotes: ['Skia/Vulkan → BufferQueue (Triple Buffering) → SurfaceFlinger + HWC → VSync.'],
    transitionCue: '«علاوه بر گرافیک، سیستم‌عامل‌های جدید یک موتور سخت‌افزاری تازه هم مدیریت می‌کنند: هوش مصنوعی روی دستگاه!»',
  },
  {
    id: 'ai-nnapi',
    number: 29,
    title: 'هوش مصنوعی در سیستم‌عامل: AICore، NNAPI و شتاب‌دهی NPU',
    subtitle: 'چطور اندروید مدل‌های یادگیری ماشین را بدون ارسال به اینترنت روی تراشه گوشی اجرا می‌کند؟',
    speaker: 'speaker3',
    durationMin: 1.5,
    speakerNotes: [
      'لایه‌های قدیمی مجبور بودند هوش مصنوعی را روی CPU یا به سختی روی GPU اجرا کنند.',
      'سیستم‌عامل اندروید از طریق رابط NNAPI / Vendor NPU HAL و سرویس جدید AICore (برای مدل‌هایی مثل Gemini Nano) محاسبات تانسور را مستقیم به واحد NPU و DSP می‌سپارد تا با حداقل مصرف باتری و حفظ کامل حریم خصوصی انجام شوند.',
    ],
    transitionCue: '«پیش از رفتن به شبیه‌ساز زنده، ببینیم مهندسان سیستم‌عامل چطور پشت صحنه گوشی را عیب‌یابی و رصد می‌کنند.»',
  },
  {
    id: 'adb-perfetto',
    number: 30,
    title: 'معماری عیب‌یابی سیستم‌عامل: ADB، Logcat و Perfetto',
    subtitle: 'پشت صحنه اتصال لپ‌تاپ به گوشی و تحلیل میکروثانیه‌ای فریم‌ها و قفل‌های کرنل',
    speaker: 'speaker3',
    durationMin: 1.5,
    speakerNotes: [
      'معماری ۳بخشی ADB: کلاینت ترمینال ↔ سرور پس‌زمینه روی لپ‌تاپ ↔ دیمن adbd داخل گوشی (از طریق USB یا Wi-Fi).',
      'Logcat از Ring Bufferهای جداگانه (main, system, kernel, crash) استفاده می‌کند تا حافظه پر نشود.',
      'Perfetto جایگزین مدرن Systrace است که همزمان تیک‌های CPU، بافرهای SurfaceFlinger، Binder و مصرف انرژی را با دقت میکروثانیه ثبت می‌کند.',
    ],
    transitionCue: '«حالا تمام مفاهیم هر سه بخش را زنده روی شبیه‌ساز گوشی موبایل امتحان می‌کنیم!»',
  },
  {
    id: 'phone-simulator',
    number: 31,
    title: 'شبیه‌ساز زنده گوشی اندروید + بازرس کرنل و ADB',
    subtitle: 'روی صفحه گوشی کلیک کنید، تست استرس رم بزنید، حمله شبیه‌سازی کنید و خروجی ADB را ببینید',
    speaker: 'speaker3',
    durationMin: 3,
    speakerNotes: ['باز کردن اپ‌ها روی گوشی، زدن دکمه تست استرس رم، تست SELinux و نمایش تب ADB زنده.'],
    transitionCue: '«بخش سوم را هم در یک نگاه جمع‌بندی کنیم.»',
  },
  {
    id: 'p3-outro',
    number: 32,
    title: 'نتیجه‌گیری بخش سوم: امنیت، گرافیک، AI و تست زنده',
    subtitle: 'خلاصه دستاوردهای بخش سوم پیش از چالش نهایی کلاسی',
    speaker: 'speaker3',
    durationMin: 0.5,
    speakerNotes: ['مرور سریع نکات کلیدی بخش سوم و دعوت از کلاس برای مسابقه سریع ۳ سؤالی.'],
    transitionCue: '«حالا ببینیم چقدر از مطالب امروز در ذهن کلاس مانده است! آماده مسابقه هستید؟»',
  },
  // --- FINALE (SHARED) ---
  {
    id: 'class-quiz',
    number: 33,
    title: 'مسابقه زنده کلاسی: محک مهندسی سیستم‌عامل اندروید!',
    subtitle: '۳ سؤال چالشی از دل ارائه امروز — بچه‌های کلاس جواب بدهند تا نتیجه را روی اسلاید ثبت کنیم',
    speaker: 'all',
    durationMin: 1.5,
    speakerNotes: [
      'هر سؤال را برای کلاس بخوانید، جواب‌ها را بشنوید و سپس روی گزینه انتخابی کلیک کنید تا جواب درست با تحلیل نمایش داده شود.',
    ],
    transitionCue: '«و اما اسلاید آخر: جمع‌بندی کلان و جدول مقایسه سیستم‌عامل‌ها.»',
  },
  {
    id: 'summary',
    number: 34,
    title: 'جمع‌بندی کل ارائه، مقایسه نهایی و پرسش و پاسخ',
    subtitle: 'چکیده طراحی سیستم‌عامل موبایل + پاسخ به سؤالات فنی احتمالی',
    speaker: 'all',
    durationMin: 1.5,
    speakerNotes: ['مرور جدول مقایسه نهایی Android، Linux Desktop و iOS و پاسخ به سؤالات استاد و دانشجویان.'],
  },
];

export const SIM_APPS: SimAppDef[] = [
  {
    id: 'camera',
    name: 'Camera',
    faName: 'دوربین',
    pkg: 'com.android.camera2',
    uid: 'u0_a189',
    color: '#3ddc84',
    ramMb: 520,
    baseOom: 0,
    permissions: ['CAMERA', 'RECORD_AUDIO', 'WRITE_MEDIA'],
    seContext: 'u:r:priv_app:s0:c189',
    activityName: 'CameraActivity',
    screenDesc: 'پیشنمایش زنده سنسور دوربین از طریق Camera HAL (AIDL)',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    faName: 'واتساپ',
    pkg: 'com.whatsapp',
    uid: 'u0_a142',
    color: '#22c55e',
    ramMb: 340,
    baseOom: 0,
    permissions: ['INTERNET', 'READ_CONTACTS', 'POST_NOTIFICATIONS'],
    seContext: 'u:r:untrusted_app:s0:c142',
    activityName: 'HomeActivity',
    screenDesc: 'اتصال سوکت رمزنگاری‌شده و پایگاه‌داده اختصاصی ایزوله',
  },
  {
    id: 'chrome',
    name: 'Chrome',
    faName: 'کروم',
    pkg: 'com.android.chrome',
    uid: 'u0_a118',
    color: '#38bdf8',
    ramMb: 680,
    baseOom: 0,
    permissions: ['INTERNET', 'ACCESS_NETWORK_STATE'],
    seContext: 'u:r:isolated_app:s0:c118',
    activityName: 'ChromeTabbedActivity',
    screenDesc: 'موتور رندر چندپروسه‌ای (Isolated Renderer Sandbox) با مصرف رم بالا',
  },
  {
    id: 'spotify',
    name: 'Spotify',
    faName: 'اسپاتیفای',
    pkg: 'com.spotify.music',
    uid: 'u0_a164',
    color: '#a78bfa',
    ramMb: 260,
    baseOom: 200,
    permissions: ['FOREGROUND_SERVICE_MEDIA_PLAYBACK', 'WAKE_LOCK'],
    seContext: 'u:r:untrusted_app:s0:c164',
    activityName: 'MainActivity',
    screenDesc: 'دارای Foreground Service فعال + Partial Wakelock برای پخش در پس‌زمینه',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    faName: 'اینستاگرام',
    pkg: 'com.instagram.android',
    uid: 'u0_a205',
    color: '#fb7185',
    ramMb: 590,
    baseOom: 0,
    permissions: ['INTERNET', 'CAMERA', 'READ_MEDIA_IMAGES'],
    seContext: 'u:r:untrusted_app:s0:c205',
    activityName: 'MainTabActivity',
    screenDesc: 'پخش ویدئو با MediaCodec سخت‌افزاری و SurfaceFlinger Video Layer',
  },
  {
    id: 'settings',
    name: 'Settings',
    faName: 'تنظیمات',
    pkg: 'com.android.settings',
    uid: 'system (1000)',
    color: '#fbbf24',
    ramMb: 180,
    baseOom: 100,
    permissions: ['SYSTEM_UID', 'WRITE_SECURE_SETTINGS'],
    seContext: 'u:r:system_app:s0',
    activityName: 'SettingsHomepageActivity',
    screenDesc: 'اجرا با دسترسی system_app (UID 1000) برای کنترل سرویس‌های سیستمی',
  },
];

export interface OsStackLayer {
  id: string;
  name: string;
  faName: string;
  color: string;
  space: 'User Space' | 'Boundary' | 'Kernel Space';
  summary: string;
  components: string[];
  osRole: string;
}

export const OS_STACK_LAYERS: OsStackLayer[] = [
  {
    id: 'apps',
    name: 'System & User Apps',
    faName: '۵. لایه اپلیکیشن‌ها',
    color: '#3ddc84',
    space: 'User Space',
    summary: 'اپلیکیشن‌های سیستمی (تلفن، دوربین، لانچر) و اپ‌های کاربر که هرکدام با یک UID یکتا در محیط ایزوله اجرا می‌شوند.',
    components: ['Launcher', 'Camera', 'WhatsApp', 'Settings'],
    osRole: 'تعامل با کاربر و ارسال درخواست‌ها از طریق APIهای فریم‌ورک به SystemServer',
  },
  {
    id: 'framework',
    name: 'Java / Kotlin API Framework',
    faName: '۴. فریم‌ورک سیستم اندروید',
    color: '#38bdf8',
    space: 'User Space',
    summary: 'سرویس‌های مدیریتی کلیدی درون پروسه SystemServer که چرخه حیات اکتیویتی‌ها، پنجره‌ها، مجوزها و منابع را مدیریت می‌کنند.',
    components: ['ActivityManagerService', 'WindowManager', 'PackageManager', 'PowerManager'],
    osRole: 'مدیریت چرخه حیات پروسه‌ها، اولویت OOM و هماهنگی سرویس‌ها با Binder',
  },
  {
    id: 'runtime',
    name: 'ART & Native C/C++ Libraries',
    faName: '۳. محیط اجرا (ART) و کتابخانه‌های بومی',
    color: '#fbbf24',
    space: 'User Space',
    summary: 'موتور اجرای ART، پروسه مادر Zygote، کتابخانه استاندارد سبک‌شده Bionic libc و موتورهای گرافیکی Skia / SurfaceFlinger.',
    components: ['ART (AOT+JIT)', 'Zygote', 'Bionic libc', 'SurfaceFlinger & Skia'],
    osRole: 'کامپایل/اجرای کد، اشتراک‌گذاری رم با fork()، جمع‌آوری زباله (GC) و رندر فریم',
  },
  {
    id: 'hal',
    name: 'Hardware Abstraction Layer (HAL)',
    faName: '۲. لایه انتزاع سخت‌افزار',
    color: '#a78bfa',
    space: 'Boundary',
    summary: 'رابط استاندارد (HIDL / AIDL) بین سیستم‌عامل اندروید و درایورهای اختصاصی شرکت‌های چیپ‌ست که امکان آپدیت مستقل را می‌دهد.',
    components: ['Camera HAL', 'Audio HAL', 'Sensors HAL', 'HWComposer (HWC)'],
    osRole: 'جداسازی کدهای تجاری سازندگان (/vendor) از هسته سیستم‌عامل (/system)',
  },
  {
    id: 'kernel',
    name: 'Modified Linux Kernel',
    faName: '۱. کرنل لینوکس بهینه‌شده',
    color: '#fb7185',
    space: 'Kernel Space',
    summary: 'هسته سیستم‌عامل: زمان‌بندی انرژی‌آگاه CPU (EAS)، مدیریت حافظه مجازی، امنیت SELinux و درایورهای اختصاصی موبایل.',
    components: ['Binder IPC Driver', 'Wakelocks & EAS', 'Ashmem / zRAM', 'SELinux & Rust/pKVM'],
    osRole: 'کنترل مستقیم سخت‌افزار، زمان‌بندی، شبکه، ایزوله‌سازی پروسه‌ها و امنیت سطح پایین',
  },
];

export interface TapStep {
  step: number;
  layer: string;
  title: string;
  timeOffset: string;
  color: string;
  detail: string;
  techTag: string;
}

export const TAP_ANATOMY_STEPS: TapStep[] = [
  {
    step: 1,
    layer: 'Kernel & Input',
    title: 'وقفه سخت‌افزاری لمس',
    timeOffset: '0 ms',
    color: '#fb7185',
    detail: 'کنترلر تاچ‌اسکرین سیگنال IRQ می‌فرستد. درایور کرنل مختصات (X, Y) را ثبت کرده و در صورت خواب بودن CPU با یک Wakelock کوتاه آن را بیدار می‌کند.',
    techTag: 'IRQ → InputDispatcher',
  },
  {
    step: 2,
    layer: 'Binder IPC',
    title: 'درخواست شروع اکتیویتی',
    timeOffset: '~14 ms',
    color: '#a78bfa',
    detail: 'پروسه Launcher از طریق درایور /dev/binder درخواست startActivity() را فقط با ۱ بار کپی حافظه به ActivityManagerService می‌رساند.',
    techTag: '/dev/binder → AMS',
  },
  {
    step: 3,
    layer: 'Zygote & UID',
    title: 'انشعاب پروسه و Sandbox',
    timeOffset: '~48 ms',
    color: '#fbbf24',
    detail: 'پروسه مادر Zygote دستور fork() می‌زند؛ صفحات رم مشترک می‌مانند (Copy-on-Write) و کرنل یک UID یکتا (u0_a189) به اپ می‌دهد.',
    techTag: 'fork() → u0_a189',
  },
  {
    step: 4,
    layer: 'ART & LMK',
    title: 'اجرای کد OAT و کنترل رم',
    timeOffset: '~135 ms',
    color: '#38bdf8',
    detail: 'موتور ART فایل‌های کامپایل‌شده (.oat/.vdex) را اجرا می‌کند. اگر رم تحت فشار باشد، lmkd پروسه‌های Cached با oom_score_adj بالا را آزاد می‌کند.',
    techTag: 'ART (.oat) + lmkd',
  },
  {
    step: 5,
    layer: 'SurfaceFlinger',
    title: 'ترکیب لایه‌ها و نمایش',
    timeOffset: '~220 ms',
    color: '#3ddc84',
    detail: 'اپ رابط کاربری را در بافر گرافیکی رسم می‌کند، SurfaceFlinger با کمک HWComposer لایه‌ها را ترکیب کرده و در تیک VSync بعدی روی نمایشگر می‌فرستد.',
    techTag: 'BufferQueue → VSync',
  },
];

export interface LmkProcessItem {
  name: string;
  pkg: string;
  oomScore: number;
  ramMb: number;
  state: 'Foreground' | 'Service' | 'Home' | 'Cached';
}

export const LMK_PROCESSES: LmkProcessItem[] = [
  { name: 'Camera (فعال)', pkg: 'com.android.camera2', oomScore: 0, ramMb: 520, state: 'Foreground' },
  { name: 'System UI', pkg: 'com.android.systemui', oomScore: 0, ramMb: 310, state: 'Foreground' },
  { name: 'Spotify (موزیک)', pkg: 'com.spotify.music', oomScore: 200, ramMb: 260, state: 'Service' },
  { name: 'Launcher (خانه)', pkg: 'com.android.launcher', oomScore: 600, ramMb: 190, state: 'Home' },
  { name: 'Telegram', pkg: 'org.telegram.messenger', oomScore: 850, ramMb: 420, state: 'Cached' },
  { name: 'Chrome (۱۲ تب)', pkg: 'com.android.chrome', oomScore: 900, ramMb: 680, state: 'Cached' },
  { name: 'Instagram', pkg: 'com.instagram.android', oomScore: 950, ramMb: 590, state: 'Cached' },
];

export interface QuizQuestion {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctId: string;
  explanation: string;
}

export const CLASS_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: '۱. چرا Binder IPC در اندروید سریع‌تر از Pipe و Socket لینوکس است؟',
    options: [
      { id: 'a', text: 'چون از شبکه Wi-Fi داخلی استفاده می‌کند' },
      { id: 'b', text: 'چون با mmap() فقط ۱ بار کپی حافظه انجام می‌دهد' },
      { id: 'c', text: 'چون فایل‌ها را روی حافظه فلش می‌نویسد' },
    ],
    correctId: 'b',
    explanation: 'درایور /dev/binder حافظه مقصد را نگاشت می‌کند و برخلاف Pipe/Socket که ۲ بار کپی دارند، با ۱ بار کپی کار را انجام می‌دهد.',
  },
  {
    id: 'q2',
    question: '۲. اگر مصرف رم یک اپلیکیشن را با کتابخانه‌های مشترک Zygote دقیق بخواهیم، کدام معیار درست است؟',
    options: [
      { id: 'a', text: 'VSS (Virtual Set Size)' },
      { id: 'b', text: 'RSS (Resident Set Size)' },
      { id: 'c', text: 'PSS (Proportional Set Size)' },
    ],
    correctId: 'c',
    explanation: 'معیار PSS حافظه اختصاصی اپ را به علاوه سهم تقسیم‌شده صفحات مشترک Zygote محاسبه می‌کند و دقیق‌ترین معیار رم در اندروید است.',
  },
  {
    id: 'q3',
    question: '۳. اگر یک اپ نخ اصلی (UI Thread) خود را بیش از ۵ ثانیه با عملیات شبکه قفل کند، چه رخ می‌دهد؟',
    options: [
      { id: 'a', text: 'تایمر Watchdog سرویس AMS خطای ANR صادر می‌کند' },
      { id: 'b', text: 'گوشی وارد حالت Doze Mode می‌شود' },
      { id: 'c', text: 'پارتیشن اسلات A به اسلات B تغییر می‌کند' },
    ],
    correctId: 'a',
    explanation: 'سرویس ActivityManagerService با Watchdog پاسخ‌گویی به ورودی را رصد می‌کند و در صورت تاخیر بیش از ۵ ثانیه، خطای ANR می‌دهد.',
  },
];
