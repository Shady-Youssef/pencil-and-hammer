type AuthStatusMessageProps = {
  fallbackMessage?: string;
  message?: string;
  error?: string;
};

export default function AuthStatusMessage({
  fallbackMessage,
  message = "",
  error = "",
}: AuthStatusMessageProps) {
  const resolvedMessage = message || fallbackMessage || "";

  if (!resolvedMessage && !error) {
    return null;
  }

  return (
    <div
      className={`rounded-md border px-4 py-3 font-body text-sm ${
        error
          ? "border-destructive/30 bg-destructive/10 text-destructive"
          : "border-accent/25 bg-accent/10 text-foreground"
      }`}
    >
      {error || resolvedMessage}
    </div>
  );
}
