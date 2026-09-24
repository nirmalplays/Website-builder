import Link from "next/link";
import { ConnectionsPanel } from "@/components/ConnectionsPanel";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <header className="flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="font-['Manrope',sans-serif] text-4xl tracking-tight text-ink">Settings</h1>
        <Link
          href="/"
          className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
        >
          Back to the builder
        </Link>
      </header>

      <div className="mt-10">
        <ConnectionsPanel />
      </div>
    </main>
  );
}
