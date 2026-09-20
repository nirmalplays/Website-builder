/**
 * Static check for dead controls.
 *
 * The most common failure of a UI generator is a page that looks finished but
 * does nothing: buttons with no handler, links to "#", handlers that only log.
 * This finds those cheaply, so the generator can ask the model to wire them
 * instead of shipping a mockup.
 */

export type DeadControl = { kind: string; detail: string };

/** Split the source into individual opening <button ...> tags. */
function buttonTags(code: string): string[] {
  return [...code.matchAll(/<button\b[^>]*>/g)].map((m) => m[0]);
}

export function findDeadControls(code: string): DeadControl[] {
  const problems: DeadControl[] = [];

  const hasForm = /<form\b/.test(code);
  const tags = buttonTags(code);
  let unwired = 0;

  for (const tag of tags) {
    if (/onClick\s*=/.test(tag)) continue;
    // A submit button inside a form is driven by the form's onSubmit.
    if (hasForm && /type\s*=\s*["']submit["']/.test(tag)) continue;
    // Mid-expression props can push onClick onto the next line; only flag a tag
    // that is clearly self-contained.
    unwired++;
  }

  if (unwired > 0) {
    problems.push({
      kind: "button-without-handler",
      detail: `${unwired} of ${tags.length} <button> elements have no onClick handler`,
    });
  }

  // Anchors used as buttons.
  const deadLinks = [...code.matchAll(/<a\b[^>]*href\s*=\s*["']#["'][^>]*>/g)].filter(
    (m) => !/onClick\s*=/.test(m[0]),
  ).length;
  if (deadLinks > 2) {
    problems.push({
      kind: "dead-link",
      detail: `${deadLinks} anchors point at "#" with no handler`,
    });
  }

  // Handlers that pretend to work.
  if (/onClick\s*=\s*\{\s*\(\s*\)\s*=>\s*\{?\s*console\.log/.test(code)) {
    problems.push({ kind: "console-log-handler", detail: "a handler only calls console.log" });
  }
  if (/\/\/\s*(TODO|FIXME)/i.test(code)) {
    problems.push({ kind: "todo", detail: "the code contains TODO/FIXME comments" });
  }

  // An app with inputs but no state is a picture of a form.
  const hasInputs = /<input\b|<textarea\b|<select\b/.test(code);
  if (hasInputs && !/useState|useReducer/.test(code)) {
    problems.push({ kind: "uncontrolled", detail: "there are inputs but no React state" });
  }

  return problems;
}

/** Instruction appended to the repair request, naming what to fix. */
export function deadControlRepairPrompt(problems: DeadControl[]): string {
  return `Your previous version is not a working app. Static analysis found:
${problems.map((p) => `- ${p.detail}`).join("\n")}

Return the COMPLETE file again with every control wired:
- Give every <button> an onClick that changes state the user can see.
- Replace href="#" anchors with <button> elements that do something, or remove them.
- An "Add"/"New"/"Create" button must actually add an item or open a working form.
- Keep the existing design and content; only make it work.`;
}
