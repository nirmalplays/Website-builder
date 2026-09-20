export class NoComponentError extends Error {
  constructor(message = "No component returned") {
    super(message);
    this.name = "NoComponentError";
  }
}

/** Never trust the model to return only the fenced block. */
export function extractCode(raw: string): string {
  const fenced = raw.match(/```(?:tsx|jsx|ts|js)?\s*\n([\s\S]*?)```/);
  const code = (fenced ? fenced[1] : raw).trim();
  if (!code.includes("export default")) throw new NoComponentError();
  return code;
}
