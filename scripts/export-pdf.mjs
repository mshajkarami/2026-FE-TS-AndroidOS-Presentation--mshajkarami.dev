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

const TOTAL_SLIDES = 34;
const VIEWPORT_W = 1920;
const VIEWPORT_H = 1080;

// ms to wait after navigating to a slide (let CSS animations settle)
const SETTLE_MS = 900;

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

  // Wait for the React app to fully mount
  try {
    await page.waitForSelector('[data-slide-id]', { timeout: 15000 });
  } catch {
    // Try alternative selectors
    await page.waitForTimeout(3000);
  }

  // Dismiss any overlay / close button
  const closeBtn = page.locator('button[title="Close"], button:has-text("×")');
  if (await closeBtn.count() > 0) {
    await closeBtn.first().click();
    await page.waitForTimeout(400);
  }
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);

  // Jump to slide 1
  await page.keyboard.press('Home');
  await page.waitForTimeout(SETTLE_MS);

  const slidePaths = [];

  for (let i = 0; i < TOTAL_SLIDES; i++) {
    const slideNum = i + 1;
    const imgPath = path.join(SLIDES_DIR, `slide-${String(slideNum).padStart(2, '0')}.png`);

    await page.waitForTimeout(SETTLE_MS);
    await page.screenshot({ path: imgPath, fullPage: false, type: 'png' });
    slidePaths.push(imgPath);

    process.stdout.write(`  📸  Captured slide ${slideNum}/${TOTAL_SLIDES}\r`);

    if (i < TOTAL_SLIDES - 1) {
      await page.keyboard.press('ArrowRight');
    }
  }

  await browser.close();
  console.log(`\n✅  ${TOTAL_SLIDES} slides captured to dist/_slides/`);
  return slidePaths;
}

async function buildPDF(slidePaths) {
  console.log('📦  Building PDF…');

  return new Promise((resolve, reject) => {
    const W_PT = VIEWPORT_W * 0.75; // px → pt  (96 dpi → 72 pt/inch)
    const H_PT = VIEWPORT_H * 0.75;

    const doc = new PDFDocument({
      autoFirstPage: false,
      size: [W_PT, H_PT],
      margin: 0,
      info: {
        Title: 'سیستم‌عامل اندروید — کالبدشکافی یک کلیک',
        Author: 'مهندس حسنپور | مهندس ریسمانی | مهندس حاج کرمی  (mshajkarami.dev)',
        Subject: 'Android Operating System — Group 7 Presentation',
        Keywords: 'Android, OS, Kernel, Zygote, ART, SELinux, SurfaceFlinger, mshajkarami',
        Creator: 'mshajkarami.dev Presentation Architect v1.0',
        Producer: 'Playwright + pdfkit',
      },
    });

    const stream = createWriteStream(PDF_OUT);
    doc.pipe(stream);

    for (let i = 0; i < slidePaths.length; i++) {
      doc.addPage({ size: [W_PT, H_PT], margin: 0 });
      doc.image(slidePaths[i], 0, 0, { width: W_PT, height: H_PT });

      // Slide number footer
      doc
        .fillColor('#3ddc84')
        .fontSize(8)
        .font('Helvetica')
        .text(
          `Slide ${i + 1} / ${slidePaths.length}  |  Android OS Presentation — Group 7  |  mshajkarami.dev`,
          0, H_PT - 16,
          { width: W_PT, align: 'center' }
        );

      process.stdout.write(`  📄  Added page ${i + 1}/${slidePaths.length} to PDF\r`);
    }

    doc.end();

    stream.on('finish', () => {
      const sizeMb = (fs.statSync(PDF_OUT).size / 1024 / 1024).toFixed(1);
      console.log(`\n✅  PDF ready → dist/Android_OS_Presentation_Group7.pdf (${sizeMb} MB)`);
      resolve();
    });

    stream.on('error', reject);
  });
}

async function main() {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║   Android OS Presentation — PDF Exporter             ║');
  console.log('║   mshajkarami.dev  ·  Powered by Playwright + pdfkit ║');
  console.log('╚══════════════════════════════════════════════════════╝\n');

  const slidePaths = await captureSlides();
  await buildPDF(slidePaths);

  console.log('\n🎉  Done! Open: dist/Android_OS_Presentation_Group7.pdf');
}

main().catch((err) => {
  console.error('❌  Export failed:', err.message);
  process.exit(1);
});
