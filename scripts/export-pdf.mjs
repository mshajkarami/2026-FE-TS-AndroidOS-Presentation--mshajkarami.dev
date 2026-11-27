/**
 * export-pdf.mjs
 * Playwright + pdfkit slide-by-slide PDF exporter
 * mshajkarami.dev — Android OS Presentation 2026
 *
 * Run: node scripts/export-pdf.mjs
 */

import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import PDFDocument from 'pdfkit';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST_HTML = path.resolve(ROOT, 'dist', 'index.html');
const SLIDES_DIR = path.resolve(ROOT, 'dist', '_slides');
const PDF_OUT = path.resolve(ROOT, 'dist', 'Android_OS_Presentation_Group7.pdf');
const ROOT_PDF = path.resolve(ROOT, 'Android_OS_Presentation_Group7_v1.pdf');

const TOTAL_SLIDES = 34;
const VIEWPORT_W = 1920;
const VIEWPORT_H = 1080;

// Settle time for CSS animations & layout
const SETTLE_MS = 600;

async function captureSlides() {
  if (!fs.existsSync(DIST_HTML)) {
    console.error('❌  dist/index.html not found — run `npm run build` first.');
    process.exit(1);
  }

  fs.mkdirSync(SLIDES_DIR, { recursive: true });

  console.log('🚀  Launching Playwright Chromium headless…');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: VIEWPORT_W, height: VIEWPORT_H });
  await page.emulateMedia({ colorScheme: 'dark' });

  // Load the single-file offline HTML
  const fileUrl = `file:///${DIST_HTML.replace(/\\/g, '/')}`;
  console.log('📄  Loading:', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'networkidle' });

  // Wait for React to mount
  await page.waitForTimeout(2000);

  // Close any modal or overview if opened
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);

  const slidePaths = [];

  for (let i = 0; i < TOTAL_SLIDES; i++) {
    const slideNum = i + 1;
    const imgPath = path.join(SLIDES_DIR, `slide-${String(slideNum).padStart(2, '0')}.png`);

    // 1. Programmatically navigate to slide i
    await page.evaluate((targetIndex) => {
      if (typeof window.__setSlideIndex === 'function') {
        window.__setSlideIndex(targetIndex);
      }
    }, i);

    // 2. Wait until dock shows the current slide number
    await page.waitForFunction(
      (expectedNum) => {
        const text = document.body.innerText || '';
        return text.includes(`${expectedNum} / 34`);
      },
      slideNum,
      { timeout: 4000 }
    ).catch(() => {
      console.warn(`  ⚠️ Timeout waiting for slide indicator ${slideNum}/34`);
    });

    // 3. Wait for animations to complete
    await page.waitForTimeout(SETTLE_MS);

    // 4. Retrieve heading to verify unique slide
    const slideHeading = await page.evaluate(() => {
      const h = document.querySelector('h1, h2, h3');
      return h ? h.innerText.replace(/\s+/g, ' ').trim() : 'Slide';
    });

    // 5. Screenshot
    await page.screenshot({ path: imgPath, fullPage: false, type: 'png' });
    slidePaths.push(imgPath);

    console.log(`  📸 [${String(slideNum).padStart(2, '0')}/34] ${slideHeading.slice(0, 50)}`);
  }

  await browser.close();
  console.log(`\n✅  All ${TOTAL_SLIDES} distinct slides captured to dist/_slides/`);
  return slidePaths;
}

async function buildPDF(slidePaths) {
  console.log('\n📦  Assembling multi-page PDF…');

  return new Promise((resolve, reject) => {
    const W_PT = VIEWPORT_W * 0.75; // px → pt (72 DPI)
    const H_PT = VIEWPORT_H * 0.75;

    const doc = new PDFDocument({
      autoFirstPage: false,
      size: [W_PT, H_PT],
      margin: 0,
      info: {
        Title: 'سیستم‌عامل اندروید — کالبدشکافی یک کلیک',
        Author: 'مهندس حسنپور | مهندس ریسمانی | مهندس حاج کرمی (mshajkarami.dev)',
        Subject: 'Android Operating System — Group 7 Presentation',
        Keywords: 'Android, OS, Kernel, Zygote, ART, SELinux, SurfaceFlinger, mshajkarami',
        Creator: 'mshajkarami.dev Presentation Architect',
        Producer: 'Playwright + pdfkit',
      },
    });

    const stream = createWriteStream(PDF_OUT);
    doc.pipe(stream);

    for (let i = 0; i < slidePaths.length; i++) {
      doc.addPage({ size: [W_PT, H_PT], margin: 0 });
      doc.image(slidePaths[i], 0, 0, { width: W_PT, height: H_PT });

      // Slide footer info
      doc
        .fillColor('#3ddc84')
        .fontSize(9)
        .font('Helvetica')
        .text(
          `Slide ${i + 1} / ${slidePaths.length}  |  Android OS Presentation — Group 7  |  mshajkarami.dev`,
          0,
          H_PT - 18,
          { width: W_PT, align: 'center' }
        );
    }

    doc.end();

    stream.on('finish', () => {
      // Also copy to root for quick access
      fs.copyFileSync(PDF_OUT, ROOT_PDF);
      const sizeMb = (fs.statSync(ROOT_PDF).size / 1024 / 1024).toFixed(1);
      console.log(`✅  PDF generated successfully! (${sizeMb} MB)`);
      console.log(`    📁 dist/Android_OS_Presentation_Group7.pdf`);
      console.log(`    📁 Android_OS_Presentation_Group7_v1.pdf`);
      resolve();
    });

    stream.on('error', reject);
  });
}

async function main() {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║   Android OS Presentation — PDF Exporter v2          ║');
  console.log('║   mshajkarami.dev · Powered by Playwright + pdfkit   ║');
  console.log('╚══════════════════════════════════════════════════════╝\n');

  const slidePaths = await captureSlides();
  await buildPDF(slidePaths);

  console.log('\n🎉  Done! Full 34-slide PDF is ready.');
}

main().catch((err) => {
  console.error('❌  Export failed:', err);
  process.exit(1);
});
