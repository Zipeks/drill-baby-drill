export default function Footer() {
  return (
    <footer className="mt-auto py-6 border-t border-border/40 text-center text-sm text-muted-foreground">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
        <span>
          Stworzone przez{" "}
          <a
            href="https://github.com/Zipeks"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            Mateusz Zieliński (Zipeks)
          </a>
        </span>
        <span className="hidden sm:inline">•</span>
        <a
          href="https://github.com/Zipeks/drill-baby-drill"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
