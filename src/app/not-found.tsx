import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-6">
      <div className="text-center">
        <p className="mb-3 font-body text-xs uppercase tracking-[0.35em] text-accent">
          404
        </p>
        <h1 className="mb-4 font-display text-4xl text-foreground md:text-5xl">
          Page not found
        </h1>
        <p className="mb-6 font-body text-muted-foreground">
          The page you requested does not exist or may have moved.
        </p>
        <Link href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
