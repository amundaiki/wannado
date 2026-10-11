export default function Loading() {
  return (
    <div
      className="min-h-screen bg-cream flex flex-col items-center justify-center gap-6"
      role="status"
      aria-live="polite"
    >
      <span
        className="h-12 w-12 rounded-full border-4 border-border border-t-teal animate-spin"
        aria-hidden="true"
      />
      <p className="font-inter text-sm font-medium text-brown-mid">
        Laster inn
      </p>
      <span className="sr-only">Innholdet laster, vennligst vent.</span>
    </div>
  );
}
