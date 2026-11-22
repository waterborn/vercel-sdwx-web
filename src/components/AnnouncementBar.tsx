import Link from "next/link";
export default function AnnouncementBar() {
  return <div className="bg-glintic-linen text-glintic-slate text-center px-4 py-2.5 text-[11px] sm:text-xs tracking-[.04em]">A considered collection for studios &amp; brands.<span className="hidden sm:inline"> From your first sample to your next chapter.</span>{" "}<Link href="/#sample-box" className="underline underline-offset-4 inline-flex items-center min-h-11 -my-3 ml-2">Explore the Sample Box →</Link></div>;
}
