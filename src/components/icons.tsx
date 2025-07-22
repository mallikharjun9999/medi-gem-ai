import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      aria-label="MediGem Logo"
      role="img"
      {...props}
    >
      <path
        fill="hsl(var(--primary))"
        d="M128 24a104 104 0 1 0 104 104A104.12 104.12 0 0 0 128 24Zm45.42 137.42-48 48a8 8 0 0 1-11.32-1.74l-48-64a8 8 0 0 1 13.06-9.8l40.19 53.58 42.47-42.47a8 8 0 0 1 11.32 11.31Z"
      />
      <path
        fill="hsl(var(--accent))"
        d="m162.15 85.15-42.48 42.47a8 8 0 0 1-11.31 0L86.94 106.2a8 8 0 1 1 13.06-9.8l21.31 28.42 34.18-34.17a8 8 0 0 1 11.31 11.3Z"
      />
    </svg>
  );
}
