import { Trophy } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.7 5.38-5.27 5.66.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <a href="#" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-ink">
            <Trophy className="size-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-bold">NFSMW Saves</span>
            <span className="text-xs text-muted">Need for Speed: Most Wanted (2005)</span>
          </span>
        </a>
        <nav className="flex items-center gap-2">
          <a
            href="#saves"
            className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-muted hover:text-accent sm:block"
          >
            Saves
          </a>
          <a
            href="#como-usar"
            className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-muted hover:text-accent sm:block"
          >
            Como usar
          </a>
          <a
            href="https://github.com/prolud/nfsmw-saves"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm font-semibold text-foreground hover:border-accent hover:text-accent"
          >
            <GithubIcon className="size-4" />
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
