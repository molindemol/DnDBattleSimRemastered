import { JSX } from "react";

type EnemyIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

function EnemyIcon({
  size = 20,
  color = "currentColor",
}: EnemyIconProps): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 2c0 4 1.5 6.5 4 8" />
      <path d="M20 2c0 4-1.5 6.5-4 8" />
      <path d="M12 5a7 7 0 0 1 7 7v3a2 2 0 0 1-2 2h-1l-1 3h-6l-1-3H7a2 2 0 0 1-2-2v-3a7 7 0 0 1 7-7z" />
      <circle cx="9.5" cy="12.5" r="1" fill={color} stroke="none" />
      <circle cx="14.5" cy="12.5" r="1" fill={color} stroke="none" />
    </svg>
  );
}

export default EnemyIcon;
