import Link from "next/link";
export default function AnnouncementBar() {
  return <div className="bg-glintic-linen text-glintic-slate text-center px-4 py-2.5 text-[11px] sm:text-xs tracking-[.04em]">Studio Sample Box available<span className="hidden sm:inline"> · Private label from sampling · DDP quoted per destination</span>{" "}<Link href="/#sample-box" className="underline underline-offset-4 inline-flex items-center min-h-11 -my-3 ml-2">Explore the Sample Box →</Link></div>;
}
