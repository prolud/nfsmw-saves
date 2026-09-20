export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-semibold text-foreground">NFSMW Saves</span> — saves
          organizados da blacklist de Need for Speed: Most Wanted (2005).
        </p>
        <p>
          Projeto de fãs, sem afiliação com a EA. ·{" "}
          <a
            href="https://github.com/prolud/nfsmw-saves"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-accent hover:underline"
          >
            Ver no GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
