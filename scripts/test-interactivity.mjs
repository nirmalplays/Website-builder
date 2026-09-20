/**
 * Does the generated app actually DO anything?
 *
 * Renders a component headlessly, then clicks every button, types in every text
 * input and submits every form, measuring whether the DOM changed. A pretty page
 * where nothing responds scores 0 and is a failure, however good it looks.
 *
 *   node scripts/test-interactivity.mjs                 # all baked templates
 *   node scripts/test-interactivity.mjs memory-game     # specific ids
 *   node scripts/test-interactivity.mjs --file tmp/x.tsx
 */
import { chromium } from "playwright";
import { readdirSync, readFileSync } from "node:fs";
import { toBrowserSource, pageHtml } from "./lib/render.mjs";

const args = process.argv.slice(2);
const fileIdx = args.indexOf("--file");
const explicitFile = fileIdx !== -1 ? args[fileIdx + 1] : null;
const ids = args.filter((a) => !a.startsWith("--") && a !== explicitFile);

const targets = explicitFile
  ? [{ id: explicitFile, code: readFileSync(explicitFile, "utf8") }]
  : (ids.length
      ? ids
      : readdirSync("templates")
          .filter((f) => f.endsWith(".tsx"))
          .map((f) => f.replace(/\.tsx$/, ""))
    ).map((id) => ({ id, code: readFileSync(`templates/${id}.tsx`, "utf8") }));

// localStorage throws on an opaque origin, and generated apps now persist state,
// so serve the page from a real http origin instead of setContent().
const RENDER_ORIGIN = "http://generated.local";

async function serve(page, html) {
  await page.route(`${RENDER_ORIGIN}/**`, (route) =>
    route.fulfill({ status: 200, contentType: "text/html; charset=utf-8", body: html }),
  );
  await page.goto(`${RENDER_ORIGIN}/index.html`, { waitUntil: "networkidle" });
}

const browser = await chromium.launch();
const results = [];

for (const { id, code } of targets) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  try {
    await serve(page, pageHtml(toBrowserSource(code), { freezeAnimation: false }));
    await page.waitForFunction(() => document.getElementById("root")?.children.length > 0, {
      timeout: 15000,
    });
    await page.waitForTimeout(600);

    const snapshot = () =>
      page.evaluate(() => {
        const root = document.getElementById("root");
        const html = root?.innerHTML ?? "";
        // Hash the markup: comparing length alone missed class-only changes
        // such as a tab becoming active.
        let hash = 0;
        for (let i = 0; i < html.length; i++) hash = (hash * 31 + html.charCodeAt(i)) | 0;
        return {
          html: hash,
          text: root?.innerText ?? "",
          inputs: [...document.querySelectorAll("input, textarea, select")].map(
            (i) => i.value ?? "",
          ),
        };
      });

    const changed = (a, b) =>
      a.html !== b.html || a.text !== b.text || a.inputs.join("|") !== b.inputs.join("|");

    // Fill visible text inputs first. An "Add" button that correctly ignores an
    // empty field would otherwise look dead.
    const fillable = page.locator(
      'input[type="text"]:visible, input[type="email"]:visible, input:not([type]):visible, textarea:visible',
    );
    const fillCount = Math.min(await fillable.count(), 10);
    for (let i = 0; i < fillCount; i++) {
      await fillable
        .nth(i)
        .fill(i % 2 === 0 ? "Ship the release notes" : "test@example.com", { timeout: 1200 })
        .catch(() => {});
    }

    // 1. Buttons: does clicking each one change anything visible?
    // A disabled button is correctly inert (pagination on page 1); only
    // enabled controls are expected to do something.
    const buttons = page.locator("button:visible:not([disabled])");
    const buttonCount = Math.min(await buttons.count(), 18);
    let liveButtons = 0;
    let clicked = 0;

    for (let i = 0; i < buttonCount; i++) {
      const before = await snapshot();
      try {
        await buttons.nth(i).click({ timeout: 1500, noWaitAfter: true });
        clicked++;
        await page.waitForTimeout(350);
        const after = await snapshot();
        if (changed(before, after)) liveButtons++;
        // A previous click may have opened a modal that covers the rest.
        await page.keyboard.press("Escape").catch(() => {});
        await page.waitForTimeout(120);
      } catch {
        // Covered or detached: it was never actually clicked, so it does not
        // count for or against the score.
      }
    }

    // 2. Text inputs: are they controlled and wired to state?
    const textInput = page.locator('input[type="text"]:visible, input[type="email"]:visible, input:not([type]):visible, textarea:visible').first();
    let inputWorks = null;
    if (await textInput.count()) {
      try {
        await textInput.fill("Test value 123", { timeout: 1500 });
        await page.waitForTimeout(250);
        inputWorks = (await textInput.inputValue()) === "Test value 123";
      } catch {
        inputWorks = false;
      }
    }

    // 3. Forms: does submitting produce validation or feedback?
    let formResponds = null;
    const form = page.locator("form:visible").first();
    if (await form.count()) {
      const before = await snapshot();
      try {
        await form.evaluate((f) => f.requestSubmit?.() ?? f.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));
        await page.waitForTimeout(1400);
        formResponds = changed(before, await snapshot());
      } catch {
        formResponds = false;
      }
    }

    const pct = clicked ? Math.round((liveButtons / clicked) * 100) : 0;
    results.push({ id, buttonCount: clicked, liveButtons, pct, inputWorks, formResponds });
    console.log(
      `${id.padEnd(22)} buttons ${String(liveButtons).padStart(2)}/${String(clicked).padEnd(2)} of ${String(buttonCount).padEnd(2)} (${String(pct).padStart(3)}%)` +
        `  input ${inputWorks === null ? " -- " : inputWorks ? "works" : "DEAD "}` +
        `  form ${formResponds === null ? " -- " : formResponds ? "responds" : "DEAD"}`,
    );
  } catch (err) {
    results.push({ id, error: err.message.slice(0, 80) });
    console.log(`${id.padEnd(22)} ERROR ${err.message.slice(0, 70)}`);
  } finally {
    await page.close();
  }
}

await browser.close();

const scored = results.filter((r) => !r.error && r.buttonCount > 0);
if (scored.length) {
  const avg = Math.round(scored.reduce((n, r) => n + r.pct, 0) / scored.length);
  const dead = scored.filter((r) => r.pct === 0);
  console.log(`\naverage live buttons: ${avg}%  across ${scored.length} apps`);
  if (dead.length) console.log(`completely static (0%): ${dead.map((d) => d.id).join(", ")}`);
}
