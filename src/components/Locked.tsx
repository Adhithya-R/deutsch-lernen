import Link from "next/link";
import Icon from "@/components/Icon";

export default function Locked({ previous, loggedIn }: { previous: string; loggedIn: boolean }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-6 text-center">
      <span className="grid h-20 w-20 place-items-center rounded-full border-b-[7px] border-[#cdb89f] bg-[#ead7c1] text-[#9b8570]">
        <Icon name="lock" size={32} />
      </span>
      <h1 className="mt-5 text-3xl font-extrabold">Not open yet</h1>
      <p className="mt-2 text-muted">
        Pass the check in “{previous}” to unlock this chapter.
        {!loggedIn && " Log in so your progress is saved."}
      </p>
      <div className="mt-6 flex w-full flex-col gap-3">
        <Link href="/" className="btn3d">Back to the path</Link>
        {!loggedIn && <Link href="/login" className="btn3d btn3d-ghost">Log in</Link>}
      </div>
    </main>
  );
}
