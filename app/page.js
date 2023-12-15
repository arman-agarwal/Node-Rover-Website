import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        <Link href="/drive-mode">Drive Mode</Link>
        <Link href="/grid-mode">Grid Mode</Link>
      </div>
    </>
  );
}
