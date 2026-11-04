"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto w-full max-w-md px-4 py-16 text-center">
      <h1 className="text-2xl font-extrabold">Something went wrong</h1>
      <p className="mt-1 text-muted">Your saved progress is safe. Try again, or go home.</p>
      <div className="mt-6 grid gap-3">
        <button onClick={reset} className="btn3d">Try again</button>
        <Link href="/" className="btn3d btn3d-ghost">Home</Link>
      </div>
    </main>
  );
}
