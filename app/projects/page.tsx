import Link from "next/link";
import { ProjectsBrowser } from "@/components/ProjectsBrowser";

export const metadata = { title: "Projects - UI Generator" };

export default function ProjectsPage() {
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
          <Link href="/templates" className="rounded-md px-2.5 py-1.5 text-muted transition-colors duration-200 hover:text-ink">
            Templates
          </Link>
          <span className="rounded-md bg-raised px-2.5 py-1.5 text-ink">Projects</span>
        </nav>
      </header>
      <main>
        <ProjectsBrowser />
      </main>
    </div>
  );
}
