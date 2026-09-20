import Link from "next/link";
import { TemplatesBrowser } from "@/components/TemplatesBrowser";
import { TEMPLATE_CODE } from "@/lib/templateCode.generated";

export const metadata = { title: "Templates - UI Generator" };

export default function TemplatesPage() {
  return (
    <div className="min-h-dvh bg-canvas">
      <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-line bg-canvas/85 px-4 backdrop-blur">
        <Link href="/" className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-80">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" aria-hidden="true" width={26} height={26} className="h-[26px] w-[26px] rounded-[7px]" />
          <span className="text-[13px] font-semibold tracking-tight">ui/gen</span>
        </Link>
        <nav className="ml-4 flex items-center gap-1 text-[13px]">
          <Link href="/" className="rounded-md px-2.5 py-1.5 text-muted transition-colors duration-200 hover:text-ink">
            Home
          </Link>
          <span className="rounded-md bg-raised px-2.5 py-1.5 text-ink">Templates</span>
        </nav>
        <Link
          href="/"
          className="ml-auto flex h-8 items-center rounded-lg bg-accent px-3 text-xs font-medium text-accent-ink transition-opacity duration-200 hover:opacity-90"
        >
          Start from scratch
        </Link>
      </header>
      <main>
        <TemplatesBrowser bakedTemplates={Object.keys(TEMPLATE_CODE)} />
      </main>
    </div>
  );
}
