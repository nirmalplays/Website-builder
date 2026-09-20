"use client";

export type Usage = {
  used: number;
  limit: number;
  remaining: number;
  signedIn: boolean;
  resetsAt: string;
  enforced: boolean;
};

function resetLabel(resetsAt: string): string {
  const ms = new Date(resetsAt).getTime() - Date.now();
  if (!Number.isFinite(ms) || ms <= 0) return "soon";
  const hours = Math.floor(ms / 3_600_000);
  if (hours >= 1) return `${hours}h`;
  return `${Math.max(1, Math.round(ms / 60_000))}m`;
}

/** Compact quota readout for the top bar (FR-14). */
export function UsageMeter({ usage }: { usage: Usage | null }) {
  // Nothing measured yet, or the database is down and limits are not enforced.
  if (!usage || !usage.enforced) return null;

  const spent = usage.remaining <= 0;
  const low = !spent && usage.remaining <= Math.max(1, Math.floor(usage.limit * 0.2));
  const dotColor = spent ? "bg-danger" : low ? "bg-warn" : "bg-accent";

  return (
    <div
      className="flex items-center gap-2"
      title={
        spent
          ? `Daily limit reached. Resets in ${resetLabel(usage.resetsAt)}.`
          : `${usage.remaining} of ${usage.limit} generations left today`
      }
    >
      {/* Segmented pips read faster than a bar at small counts. */}
      <div
        className="flex items-center gap-[3px]"
        role="progressbar"
        aria-valuenow={usage.used}
        aria-valuemin={0}
        aria-valuemax={usage.limit}
        aria-label={`${usage.used} of ${usage.limit} generations used today`}
      >
        {/* Pips stay readable only for small counts; beyond that a bar is clearer. */}
        {usage.limit <= 6 ? (
          Array.from({ length: usage.limit }, (_, i) => (
            <span
              key={i}
              className={`h-3 w-[3px] rounded-full transition-colors duration-300 ${
                i < usage.used ? dotColor : "bg-line-strong"
              }`}
            />
          ))
        ) : (
          <span className="relative block h-[3px] w-20 overflow-hidden rounded-full bg-line-strong">
            <span
              className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${dotColor}`}
              style={{ width: `${Math.min(100, (usage.used / usage.limit) * 100)}%` }}
            />
          </span>
        )}
      </div>
      <span
        className={`font-mono text-[11px] tabular-nums ${
          spent ? "text-danger" : low ? "text-warn" : "text-faint"
        }`}
      >
        {spent ? `0 left · ${resetLabel(usage.resetsAt)}` : `${usage.remaining} left`}
      </span>
    </div>
  );
}
