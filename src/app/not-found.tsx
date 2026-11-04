import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-md px-4 py-16 text-center">
      <p className="font-display text-5xl font-extrabold text-pri">404</p>
      <h1 className="mt-2 text-2xl font-extrabold">This page does not exist</h1>
      <p className="mt-1 text-muted">The link may be old. Go back to the start.</p>
      <Link href="/" className="btn3d mt-6">Home</Link>
    </main>
  );
}
