import type { PreviewKind } from "@/lib/templates";

/**
 * Abstract wireframe previews. Drawn with divs instead of shipped screenshots:
 * nothing to host, nothing that 404s, and they restyle with the theme.
 */

const bar = "rounded-[2px] bg-line-strong";
const soft = "rounded-[2px] bg-line";

function Dashboard() {
  return (
    <div className="flex h-full gap-1.5 p-2.5">
      <div className="flex w-1/5 flex-col gap-1 rounded-sm bg-line/60 p-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-1 ${i === 0 ? "bg-ink/50" : "bg-line-strong"} rounded-[1px]`} />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="grid grid-cols-4 gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-5 rounded-sm bg-line/70 p-1">
              <div className={`h-1 w-2/3 ${bar}`} />
            </div>
          ))}
        </div>
        <div className="flex-1 space-y-1 rounded-sm bg-line/40 p-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`h-1 ${soft}`} style={{ width: `${95 - i * 12}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Landing() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-1.5 p-3">
      <div className={`h-1.5 w-1/2 ${bar}`} />
      <div className={`h-1 w-2/3 ${soft}`} />
      <div className="mt-1 flex gap-1">
        <div className="h-2.5 w-8 rounded-sm bg-ink/70" />
        <div className="h-2.5 w-8 rounded-sm bg-line-strong" />
      </div>
      <div className="mt-1.5 h-6 w-4/5 rounded-sm bg-line/60" />
    </div>
  );
}

function Pricing() {
  return (
    <div className="flex h-full items-center justify-center gap-1.5 p-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`flex h-full w-1/3 flex-col gap-1 rounded-sm p-1.5 ${
            i === 1 ? "bg-line/80 ring-1 ring-ink/25" : "bg-line/40"
          }`}
        >
          <div className={`h-1 w-2/3 ${bar}`} />
          <div className={`h-2 w-1/2 rounded-[2px] ${i === 1 ? "bg-ink/60" : "bg-line-strong"}`} />
          {[0, 1, 2].map((j) => (
            <div key={j} className={`h-[3px] w-full ${soft}`} />
          ))}
        </div>
      ))}
    </div>
  );
}

function Form() {
  return (
    <div className="flex h-full flex-col justify-center gap-1.5 px-6 py-3">
      {[0, 1].map((i) => (
        <div key={i} className="space-y-1">
          <div className={`h-1 w-1/4 ${bar}`} />
          <div className="h-3 w-full rounded-sm bg-line/60" />
        </div>
      ))}
      <div className="h-6 w-full rounded-sm bg-line/60" />
      <div className="h-3 w-16 self-end rounded-sm bg-ink/70" />
    </div>
  );
}

function Grid() {
  return (
    <div className="flex h-full flex-col gap-1.5 p-2.5">
      <div className="flex gap-1">
        {[10, 14, 12].map((w, i) => (
          <div key={i} className="h-2 rounded-full bg-line-strong" style={{ width: w }} />
        ))}
      </div>
      <div className="grid flex-1 grid-cols-3 gap-1.5">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col gap-1 rounded-sm bg-line/50 p-1">
            <div className="flex-1 rounded-[2px] bg-line-strong/60" />
            <div className={`h-[3px] w-3/4 ${bar}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Table() {
  return (
    <div className="flex h-full flex-col gap-1.5 p-2.5">
      <div className="h-2.5 w-1/3 rounded-sm bg-line/70" />
      <div className="flex-1 overflow-hidden rounded-sm bg-line/40">
        <div className="flex gap-2 border-b border-line-strong/60 px-1.5 py-1">
          {[16, 24, 14].map((w, i) => (
            <div key={i} className={`h-1 ${bar}`} style={{ width: w }} />
          ))}
        </div>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2 px-1.5 py-[5px]">
            <div className="h-2 w-2 rounded-full bg-line-strong" />
            <div className={`h-1 flex-1 ${soft}`} />
            <div className="h-1.5 w-5 rounded-full bg-line-strong" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Chat() {
  return (
    <div className="flex h-full gap-1.5 p-2.5">
      <div className="flex w-1/4 flex-col gap-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`h-3 rounded-sm ${i === 0 ? "bg-line/80" : "bg-line/40"}`} />
        ))}
      </div>
      <div className="flex flex-1 flex-col justify-end gap-1">
        <div className="h-2.5 w-2/3 rounded-md rounded-bl-sm bg-line/70" />
        <div className="h-2.5 w-1/2 self-end rounded-md rounded-br-sm bg-ink/50" />
        <div className="h-2.5 w-3/5 rounded-md rounded-bl-sm bg-line/70" />
        <div className="mt-0.5 h-3 w-full rounded-sm bg-line/40" />
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-1.5 p-2.5">
      <div className="flex w-full justify-between px-2">
        <div className={`h-1 w-6 ${bar}`} />
        <div className={`h-1 w-4 ${bar}`} />
      </div>
      <div className="grid grid-cols-4 gap-1">
        {Array.from({ length: 16 }, (_, i) => (
          <div
            key={i}
            className={`h-3 w-3 rounded-[2px] ${
              i === 5 || i === 10 ? "bg-ink/60" : "bg-line/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function Calendar() {
  return (
    <div className="flex h-full gap-2 p-2.5">
      <div className="flex-1">
        <div className={`mb-1 h-1 w-1/3 ${bar}`} />
        <div className="grid grid-cols-7 gap-[3px]">
          {Array.from({ length: 28 }, (_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-[1px] ${i === 12 ? "bg-ink/70" : "bg-line/70"}`}
            />
          ))}
        </div>
      </div>
      <div className="flex w-1/4 flex-col gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-2 rounded-sm ${i === 1 ? "bg-ink/50" : "bg-line/60"}`} />
        ))}
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div className="flex h-full flex-col gap-1.5 p-2.5">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1 w-6 rounded-full ${i === 0 ? "bg-ink/60" : "bg-line-strong"}`}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-line-strong" />
        <div className="space-y-1">
          <div className={`h-1 w-10 ${bar}`} />
          <div className={`h-1 w-14 ${soft}`} />
        </div>
      </div>
      <div className="flex-1 space-y-1">
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center justify-between rounded-sm bg-line/40 px-1.5 py-1">
            <div className={`h-1 w-1/3 ${soft}`} />
            <div className={`h-1.5 w-4 rounded-full ${i === 0 ? "bg-ink/60" : "bg-line-strong"}`} />
          </div>
        ))}
      </div>
    </div>
  );
}


function Website() {
  return (
    <div className="flex h-full flex-col gap-1 p-2">
      <div className="flex items-center justify-between rounded-sm bg-line/60 px-1.5 py-1">
        <div className="h-1 w-5 rounded-[1px] bg-ink/50" />
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-1 w-3 rounded-[1px] bg-line-strong" />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-1 rounded-sm bg-line/40 py-2.5">
        <div className={`h-1.5 w-1/2 ${bar}`} />
        <div className={`h-1 w-1/3 ${soft}`} />
        <div className="mt-0.5 h-2 w-10 rounded-sm bg-ink/60" />
      </div>
      <div className="grid grid-cols-3 gap-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-4 rounded-sm bg-line/50" />
        ))}
      </div>
      <div className="mt-auto flex gap-1 rounded-sm bg-line/40 p-1">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-1 flex-1 rounded-[1px] bg-line-strong" />
        ))}
      </div>
    </div>
  );
}

function Gallery() {
  return (
    <div className="grid h-full grid-cols-3 gap-1 p-2">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          className={`rounded-[2px] ${i % 4 === 0 ? "bg-line-strong/70" : "bg-line/60"}`}
        />
      ))}
    </div>
  );
}

function Article() {
  return (
    <div className="flex h-full gap-1.5 p-2">
      <div className="flex flex-1 flex-col gap-1">
        <div className="h-8 rounded-sm bg-line/60" />
        <div className={`h-1.5 w-3/4 ${bar}`} />
        <div className={`h-1 w-full ${soft}`} />
        <div className={`h-1 w-5/6 ${soft}`} />
        <div className="mt-auto grid grid-cols-2 gap-1">
          {[0, 1].map((i) => (
            <div key={i} className="h-4 rounded-sm bg-line/50" />
          ))}
        </div>
      </div>
      <div className="flex w-1/4 flex-col gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-2 rounded-sm bg-line/50`} />
        ))}
      </div>
    </div>
  );
}

function Menu() {
  return (
    <div className="flex h-full flex-col gap-1.5 p-2.5">
      <div className="h-6 rounded-sm bg-line/60" />
      <div className="space-y-1">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-baseline gap-1">
            <div className={`h-1 ${soft}`} style={{ width: `${34 - i * 4}%` }} />
            <div className="h-px flex-1 bg-line-strong/60" />
            <div className="h-1 w-3 rounded-[1px] bg-line-strong" />
          </div>
        ))}
      </div>
      <div className="mt-auto h-3 w-14 self-center rounded-sm bg-ink/60" />
    </div>
  );
}

function Listing() {
  return (
    <div className="flex h-full flex-col gap-1.5 p-2">
      <div className="h-3 rounded-full bg-line/70" />
      <div className="grid flex-1 grid-cols-2 gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-1 rounded-sm bg-line/50 p-1">
            <div className="flex-1 rounded-[2px] bg-line-strong/60" />
            <div className={`h-1 w-1/2 ${bar}`} />
            <div className={`h-[3px] w-3/4 ${soft}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

const KINDS: Record<PreviewKind, () => React.JSX.Element> = {
  website: Website,
  gallery: Gallery,
  article: Article,
  menu: Menu,
  listing: Listing,
  dashboard: Dashboard,
  landing: Landing,
  pricing: Pricing,
  form: Form,
  grid: Grid,
  table: Table,
  chat: Chat,
  game: Game,
  calendar: Calendar,
  profile: Profile,
};

export function TemplateThumb({ kind }: { kind: PreviewKind }) {
  const Shape = KINDS[kind] ?? Dashboard;
  return (
    <div
      aria-hidden="true"
      className="aspect-[16/10] w-full overflow-hidden rounded-lg border border-line bg-gradient-to-b from-raised to-surface transition-colors duration-200 group-hover:border-line-strong"
    >
      <Shape />
    </div>
  );
}
