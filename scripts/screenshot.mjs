/**
 * Visual check: opens the app, optionally opens a template, captures the page
 * plus any console errors. Run: node scripts/screenshot.mjs [template-id]
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const templateId = process.argv[2] ?? null;
const OUT = "tmp/shots";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`console: ${m.text().slice(0, 200)}`);
});
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message.slice(0, 200)}`));
page.on("requestfailed", (r) => {
  const url = r.url();
  if (!url.startsWith("data:")) errors.push(`requestfailed: ${url.slice(0, 120)} ${r.failure()?.errorText ?? ""}`);
});

await page.goto(BASE, { waitUntil: "networkidle" });
await page.screenshot({ path: `${OUT}/landing.png`, fullPage: false });
console.log(`landing -> ${OUT}/landing.png`);

if (templateId) {
  // Open a ready template straight through the app's own API path.
  await page.evaluate(async (id) => {
    const res = await fetch(`/api/template/${id}`);
    const data = await res.json();
    window.__code = data.code;
  }, templateId);

  const card = page.locator("button", { hasText: /Ready|Opens instantly/ }).first();
  const byTitle = page.getByRole("heading", { level: 3 }).first();
  try {
    await byTitle.click({ timeout: 4000 });
  } catch {
    await card.click({ timeout: 4000 });
  }

  await page.waitForTimeout(9000);
  await page.screenshot({ path: `${OUT}/template.png`, fullPage: false });
  console.log(`template -> ${OUT}/template.png`);

  // What is actually inside the preview pane?
  const info = await page.evaluate(() => {
    const iframe = document.querySelector("iframe");
    const wrapper = document.querySelector(".sp-wrapper");
    const preview = document.querySelector(".sp-preview-container");
    const box = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height) };
    };
    return {
      hasSandpackWrapper: Boolean(wrapper),
      wrapperBox: box(wrapper),
      hasPreviewContainer: Boolean(preview),
      previewBox: box(preview),
      hasIframe: Boolean(iframe),
      iframeBox: box(iframe),
      iframeSrc: iframe?.getAttribute("src")?.slice(0, 80) ?? null,
      bodyText: document.body.innerText.slice(0, 200).replace(/\n+/g, " | "),
    };
  });
  console.log("\npreview pane:", JSON.stringify(info, null, 2));
}

console.log(errors.length ? `\nERRORS (${errors.length}):\n  ${errors.slice(0, 8).join("\n  ")}` : "\nno console errors");
await browser.close();
