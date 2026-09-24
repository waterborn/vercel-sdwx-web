import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function ArrowRight(props: IconProps) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" {...props}><path d="M4 12h15M13 5l7 7-7 7" /></svg>;
}

export function ArrowUpRight(props: IconProps) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" {...props}><path d="M6 18 18 6M6 6h12v12" /></svg>;
}

export function SearchIcon(props: IconProps) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" {...props}><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>;
}

export function FlowerMark(props: IconProps) {
  return <svg width="42" height="42" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" {...props}><ellipse cx="24" cy="24" rx="8" ry="21" /><ellipse cx="24" cy="24" rx="8" ry="21" transform="rotate(60 24 24)" /><ellipse cx="24" cy="24" rx="8" ry="21" transform="rotate(120 24 24)" /></svg>;
}
