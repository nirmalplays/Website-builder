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
  if (hours >= 1) return `in ${hours}h`;
  return `in ${Math.max(1, Math.round(ms / 60_000))}m`;
}

export function UsageMeter({ usage }: { usage: Usage | null }) {
  // Nothing measured yet, or the database is down and limits are not being counted.
  if (!usage || !usage.enforced) return null;

  const pct = usage.limit > 0 ? Math.min(100, (usage.used / usage.limit) * 100) : 0;
  const spent = usage.remaining <= 0;
  const low = !spent && usage.remaining <= Math.max(1, Math.floor(usage.limit * 0.2));

  const barColor = spent ? "bg-red-500" : low ? "bg-amber-400" : "bg-indigo-500";
  const textColor = spent ? "text-red-400" : low ? "text-amber-400" : "text-neutral-500";

  return (
    <div className="px-3 pb-2">
      <div className="flex items-baseline justify-between gap-2">
        <span className={`text-[11px] ${textColor}`}>
          {usage.used} of {usage.limit} today
        </span>
        <span className="text-[11px] text-neutral-600">
          {spent ? `resets ${resetLabel(usage.resetsAt)}` : `${usage.remaining} left`}
        </span>
      </div>
      <div
        className="mt-1 h-1 w-full overflow-hidden rounded-full bg-neutral-800"
        role="progressbar"
        aria-valuenow={usage.used}
        aria-valuemin={0}
        aria-valuemax={usage.limit}
        aria-label="Generations used today"
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {spent && !usage.signedIn && (
        <p className="mt-1.5 text-[11px] leading-snug text-neutral-400">
          Sign in to raise your limit.
        </p>
      )}
    </div>
  );
}
