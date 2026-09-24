import Link from 'next/link';
import { ArrowRight } from '@/app/components/Icons';

export default function NotFound() {
  return (
    <main id="main-content" className="flex min-h-[65vh] items-center bg-[#faf9f6] py-24 text-[#252822] sm:py-32">
      <div className="site-container w-full text-center">
        <p className="eyebrow text-[#68705c]">404 — Page not found</p>
        <h1 className="mx-auto mt-6 max-w-2xl text-[44px] leading-[1.1] font-normal tracking-[-0.045em] sm:text-[64px]">
          A little off <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>the path.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-base leading-7 text-[#68705c]">
          This page may have moved or no longer be here. Find your way back to the collection, or start fresh at home.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
          <Link href="/collections" className="button-dark">
            Explore the collection
            <span aria-hidden="true" className="[&>svg]:h-4 [&>svg]:w-4"><ArrowRight /></span>
          </Link>
          <Link href="/" className="text-link text-sm">Back to home</Link>
        </div>
      </div>
    </main>
  );
}
