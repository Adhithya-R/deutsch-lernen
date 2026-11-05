"use client";

import { useLinkStatus } from "next/link";

/** Inside a <Link>: shows a small pulse the moment you tap, until the next page is ready. */
export default function NavPending() {
  const { pending } = useLinkStatus();
  return <span aria-hidden="true" className={pending ? "nav-pending" : "hidden"} />;
}
