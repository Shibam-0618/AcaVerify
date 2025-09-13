import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M14.5 10.5 12 12l-2.5-1.5" />
      <path d="m12 15-2.5-1.5" />
      <path d="M12 12v3" />
      <path d="m14.5 13.5-2.5 1.5" />
    </svg>
  );
}
