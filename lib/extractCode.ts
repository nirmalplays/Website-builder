export class NoComponentError extends Error {
  constructor(message = "No component returned") {
    super(message);
    this.name = "NoComponentError";
  }
}

/** Never trust the model to return only the fenced block. */
export function extractCode(raw: string): string {
  const fenced = raw.match(/```(?:tsx|jsx|ts|js)?\s*\n([\s\S]*?)```/);
  let code = (fenced ? fenced[1] : raw).trim();
  // Some replies open a bare fence and put the language on its own first line,
  // which would otherwise leave a stray "tsx" as line 1 of the file.
  code = code.replace(/^(?:tsx|jsx|ts|js|typescript|javascript)\s*\n/i, "").trim();
  if (!code.includes("export default")) throw new NoComponentError();
  return code;
}
