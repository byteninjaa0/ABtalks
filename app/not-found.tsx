export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-foreground">
      <h1 className="text-2xl font-bold">404 – Page not found</h1>
      <a href="/" className="text-primary hover:underline">
        Go home
      </a>
    </div>
  );
}
