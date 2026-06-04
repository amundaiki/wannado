function ShimmerBar({ className }: { className: string }) {
  return (
    <div
      className={`rounded bg-[linear-gradient(110deg,#e4ddd3,45%,#f5f2ed,55%,#e4ddd3)] bg-[length:200%_100%] animate-shimmer ${className}`}
      aria-hidden="true"
    />
  );
}

export default function BlogPostLoading() {
  return (
    <main
      className="min-h-screen bg-cream"
      role="status"
      aria-live="polite"
    >
      <div className="relative h-80 md:h-[28rem] w-full bg-warm-white" aria-hidden="true" />

      <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl border border-border shadow-sm p-8 md:p-12">
          <ShimmerBar className="h-4 w-32 mb-6" />
          <ShimmerBar className="h-10 w-full mb-4" />
          <ShimmerBar className="h-10 w-3/4 mb-8" />
          <ShimmerBar className="h-5 w-full mb-3" />
          <ShimmerBar className="h-5 w-5/6" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 space-y-4">
        <ShimmerBar className="h-5 w-full" />
        <ShimmerBar className="h-5 w-full" />
        <ShimmerBar className="h-5 w-2/3" />
        <ShimmerBar className="h-5 w-full mt-8" />
        <ShimmerBar className="h-5 w-5/6" />
        <ShimmerBar className="h-5 w-3/4" />
      </div>

      <span className="sr-only">Artikkelen laster, vennligst vent.</span>
    </main>
  );
}
