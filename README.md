# 🚀 **2026-FE-TS-AndroidOS-Presentation--mshajkarami.dev**

> **Interactive University Presentation & Android OS Kernel Simulator | React 19 & TypeScript**  
> _by [mshajkarami.dev](https://mshajkarami.dev)_

---

## 🌐 Live Demo & Repository

* 🔗 **Live Preview (GitHub Pages):** [https://mshajkarami.github.io/2026-FE-TS-AndroidOS-Presentation--mshajkarami.dev/](https://mshajkarami.github.io/2026-FE-TS-AndroidOS-Presentation--mshajkarami.dev/)  
* 💾 **Source Code on GitHub:** [https://github.com/mshajkarami/2026-FE-TS-AndroidOS-Presentation--mshajkarami.dev](https://github.com/mshajkarami/2026-FE-TS-AndroidOS-Presentation--mshajkarami.dev)  
* 📄 **Spoken Script & Scenario:** [PRESENTATION_SCENARIO.md](./PRESENTATION_SCENARIO.md)

---

## 🧠 Overview

**Android OS Presentation Deck** is a high-impact, production-grade interactive university presentation web application designed for the **Operating Systems Course (گروه هفتم - ارائه سیستم‌عامل اندروید)**.

Instead of traditional static PowerPoint slides, this project dissects the entire operating system through the narrative lens of **"کالبدشکافی یک کلیک" (Anatomy of a Tap)** — tracing an event from touchscreen hardware interrupt (IRQ), Binder IPC, Zygote fork, ART compilation, Low Memory Killer (lmkd), security fences (SELinux, UID sandbox, TrustZone/TEE, Rust/pKVM), to SurfaceFlinger 120Hz graphics rendering and a **realistic interactive smartphone simulator with live kernel X-Ray trace and ADB terminal**.

> 🧩 Built with a focus on clean modular architecture, offline zero-dependency bundling, bidirectional (RTL/LTR) isolation, and high-framerate glassmorphic animations.

---

## 👥 Presenters & Structure

The presentation contains **34 meticulously sequenced slides** organized into 3 balanced technical sections with dedicated introductions, technical depth, and conclusion handoffs:

| Section | Speaker | Scope & Topics |
| :--- | :--- | :--- |
| **بخش اول** | **مهندس حسنپور** | معماری پایه، کرنل لینوکس، تفاوت با اوبونتو، Binder IPC، زمان‌بندی EAS، لایه انتزاع سخت‌افزار (HAL) و آپدیت بدون وقفه A/B |
| **بخش دوم** | **مهندس ریسمانی** | از Boot تا Zygote، ماشین مجازی ART و کامپایل تطبیقی، چرخه حیات اکتیویتی، ANR Watchdog و مدیریت رم با LMK و zRAM |
| **بخش سوم (بخش شاخص)** | **مهندس حاج کرمی** | دژ امنیت (UID، سلب صلاحیت SELinux، تراشه TrustZone TEE، کدهای حافظه‌امن Rust و pKVM)، گرافیک ۱۲۰ هرتز SurfaceFlinger، هوش مصنوعی NNAPI، و **شبیه‌ساز زنده گوشی همراه با لاگ زنده کرنل و کنسول ADB** |
| **بخش پایانی** | **ارائه مشترک** | مسابقه کلاسی ۳ سؤالی تستی با امتیازدهی لحظه‌ای + جمع‌بندی نهایی و پرسش و پاسخ |

---

## ⚙️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/) |
| **Build & Bundling** | [Vite 8](https://vitejs.dev/) + `vite-plugin-singlefile` (Self-contained offline HTML) |
| **Linter & Quality** | [Oxlint](https://oxc-project.github.io/) (Ultra-fast Rust-based static analysis) |
| **Typography** | `@fontsource/vazirmatn` (Persian Typography) + `@fontsource/jetbrains-mono` (Code & Terminal) |
| **Icons & Visuals** | [Lucide React](https://lucide.dev/) + Custom CSS Canvas Particles & Glassmorphism |
| **Deployment** | GitHub Pages (`gh-pages`) |

---

## 💡 Key Features

- 📱 **Interactive Smartphone Simulator (اسلاید ۳۱):** A realistic Android device running simulated apps (Camera, WhatsApp, Chrome, Spotify with visualizer, Instagram, Settings) connected to a **Live Kernel X-Ray Trace** and an **ADB Console Inspector** (`ps -A`, `dumpsys meminfo`, `getenforce`, `dumpsys SurfaceFlinger`).
- ⚡ **Interactive LMK & zRAM Simulator (اسلاید ۱۹):** Live simulation of Low Memory Killer under 3 pressure levels (Normal, Medium, Camera Crisis) showing real-time `oom_score_adj` kills.
- 🎯 **EAS Scheduler Simulator (اسلاید ۸):** Visual Energy-Aware Scheduling toggling between LITTLE (efficiency) and big (performance) cores.
- 🔄 **Seamless A/B Partition Switcher (اسلاید ۱۱):** Interactive active/inactive slot switching demonstrating zero-downtime Android system updates.
- 🏆 **Live 3-Question Classroom Quiz (اسلاید ۳۲):** Interactive quiz with timer, instant feedback, and scoring for class engagement.
- 🎮 **Keyboard & Mouse Deck Navigation:** Full presentation controls with arrow keys, space, page up/down, floating dock, and debounced mouse scroll.
- 🔒 **RTL/LTR Bidirectional Isolation:** Complete separation of Persian prose from Linux syscalls, file paths, and monospace code blocks using `unicode-bidi: isolate` and `<bdi>`.
- 📦 **Single-File Offline Bundle:** Generates a standalone, fully offline single-file `dist/index.html` (no external CDNs needed during presentation).

---

## 🎮 Keyboard Shortcuts

| Key | Action |
| :--- | :--- |
| `→` / `Space` / `PageDown` | Next slide |
| `←` / `PageUp` | Previous slide |
| `Home` / `End` | Jump to First / Last slide |
| `F` | Toggle Fullscreen |
| `G` | Toggle Grid Overview (all 34 slides) |
| `N` | Toggle Presenter Notes & Script |
| `Esc` | Close modal / Grid view |

---

## 📂 Project Structure

```text
2026-FE-TS-AndroidOS-Presentation--mshajkarami.dev/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Pages CI/CD workflow
├── dist/
│   └── index.html                # Single-file production bundle (~2MB offline)
├── public/                       # Static public assets
├── src/
│   ├── components/
│   │   ├── ClassQuiz.tsx         # Interactive 3-question live quiz
│   │   ├── LmkSimulator.tsx      # Low Memory Killer & zRAM pressure simulator
│   │   ├── PhoneSimulator.tsx    # Realistic smartphone simulator & Kernel X-Ray
│   │   └── SlideRenderer.tsx     # Full slide engine, hero hologram, EAS & A/B switcher
│   ├── data/
│   │   └── presentationData.ts   # 34-slide structured content, speakers & apps data
│   ├── styles/
│   │   └── global.css            # Dark glassmorphism, animations & typography
│   ├── types/
│   │   └── presentation.ts       # TypeScript interfaces for slides & simulation
│   ├── App.tsx                   # Deck container, keyboard & dock navigation
│   └── main.tsx                  # Application entry point
├── PRESENTATION_SCENARIO.md       # Spoken transcript & rehearsal script for 3 presenters
├── package.json
├── tsconfig.json
├── vite.config.ts                # Vite single-file configuration with base path
├── LICENSE                       # mshajkarami.dev License v1.0
└── README.md                     # Project documentation
```

---

## 🗂 Repository Naming Convention

**Format:**
```text
[Year]-[Scope]-[MainTech]-[ProjectName]--mshajkarami.dev
```

| Segment | Value | Description |
| :--- | :--- | :--- |
| `[Year]` | `2026` | Project creation year |
| `[Scope]` | `FE` | Frontend Presentation Web Application |
| `[MainTech]` | `TS` | TypeScript + React 19 |
| `[ProjectName]` | `AndroidOS-Presentation` | University Operating System Deck |
| `[Brand]` | `--mshajkarami.dev` | Official personal brand domain |

---

## 🧩 Implementation Highlights

| Area | Implementation Detail |
| :--- | :--- |
| **Performance** | Instant navigation, 120 FPS CSS animations, zero bundle dependencies at runtime |
| **Reliability** | Offline single-file HTML execution, debounced wheel scroll, verified with Oxlint |
| **Bidirectional Text** | Isolated LTR monospace pills for Linux paths (`/data/data/...`) and Binder syscalls inside RTL Persian layout |
| **UX & Aesthetics** | Dark sci-fi aesthetic, Android Green accents, glassmorphic HUD cards, responsive viewports |

---

## 👨‍💻 About the Developer

**Mohammad Saleh Hajkarami** — _Mobile & Multiplatform Engineer_  
📍 Isfahan, Iran  
💻 Specializing in Kotlin & Compose Multiplatform (CMP) • Ktor • On-Device AI  
🚀 Founder of **[mshajkarami.dev](https://mshajkarami.dev)**  
🐙 [GitHub Profile](https://github.com/mshajkarami) • 💼 [LinkedIn](https://linkedin.com/in/mshajkarami)

> Passionate about building robust, scalable architectures and production-grade cross-platform systems.

---

## 🪄 License

This project is part of the **mshajkarami.dev** ecosystem.  
Released under the **mshajkarami.dev License (v1.0)**. See the [LICENSE](./LICENSE) file for complete details.

---

> _“Code is temporary, but structure is forever.”_  
> — **mshajkarami.dev**
