interface HouseIconProps {
  width?: number;
  height?: number;
  viewBox?: {
    width: number;
    height: number;
  }
}
  const HouseIcon = ({ width, height, viewBox = { width: 120, height: 120 } }: HouseIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${viewBox?.width} ${viewBox?.height}`}
      fill="none"
    >
      <defs>
        <linearGradient
          id="houseGrad"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#f87171" />
          <stop offset="1" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient
          id="roofGrad"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#991b1b" />
          <stop offset="1" stopColor="#7f1d1d" />
        </linearGradient>
        <radialGradient id="keyGrad" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fde047" />
          <stop offset="0.6" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f59e0b" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="#ef4444" opacity="0.08" />
      <ellipse cx="60" cy="88" rx="45" ry="3" fill="#000000" opacity="0.2" />
      <rect
        x="35"
        y="50"
        width="50"
        height="35"
        fill="#fef3c7"
        stroke="#fde68a"
        strokeWidth="2"
      />
      <path
        d="M35 55 L85 55"
        stroke="#fde68a"
        strokeWidth="0.8"
        opacity="0.5"
      />
      <path
        d="M35 61 L85 61"
        stroke="#fde68a"
        strokeWidth="0.8"
        opacity="0.5"
      />
      <path
        d="M35 67 L85 67"
        stroke="#fde68a"
        strokeWidth="0.8"
        opacity="0.5"
      />
      <path
        d="M35 73 L85 73"
        stroke="#fde68a"
        strokeWidth="0.8"
        opacity="0.5"
      />
      <path
        d="M35 79 L85 79"
        stroke="#fde68a"
        strokeWidth="0.8"
        opacity="0.5"
      />
      <path
        d="M35 85 L85 85"
        stroke="#fde68a"
        strokeWidth="0.8"
        opacity="0.5"
      />
      <path
        d="M60 28 L90 50 L85 50 L85 48 L60 32 L35 48 L35 50 L30 50 Z"
        fill="url(#roofGrad)"
        stroke="#7f1d1d"
        strokeWidth="2"
      />
      <rect
        x="70"
        y="35"
        width="6"
        height="12"
        fill="#7f1d1d"
        stroke="#581c0f"
        strokeWidth="1"
      />
      <rect
        x="69"
        y="34"
        width="8"
        height="2"
        fill="#450a0a"
        stroke="#581c0f"
        strokeWidth="0.8"
      />
      <rect
        x="52"
        y="62"
        width="16"
        height="23"
        rx="1"
        fill="#92400e"
        stroke="#78350f"
        strokeWidth="1.5"
      />
      <rect
        x="54"
        y="65"
        width="5"
        height="8"
        rx="0.5"
        fill="#92400e"
        stroke="#78350f"
        strokeWidth="0.8"
        opacity="0.6"
      />
      <rect
        x="61"
        y="65"
        width="5"
        height="8"
        rx="0.5"
        fill="#92400e"
        stroke="#78350f"
        strokeWidth="0.8"
        opacity="0.6"
      />
      <rect
        x="54"
        y="75"
        width="5"
        height="8"
        rx="0.5"
        fill="#92400e"
        stroke="#78350f"
        strokeWidth="0.8"
        opacity="0.6"
      />
      <rect
        x="61"
        y="75"
        width="5"
        height="8"
        rx="0.5"
        fill="#92400e"
        stroke="#78350f"
        strokeWidth="0.8"
        opacity="0.6"
      />
      <circle
        cx="64"
        cy="74"
        r="1.5"
        fill="#fbbf24"
        stroke="#f59e0b"
        strokeWidth="0.5"
      />
      <rect
        x="40"
        y="56"
        width="10"
        height="10"
        rx="1"
        fill="#93c5fd"
        stroke="#60a5fa"
        strokeWidth="1.5"
      />
      <path d="M45 56 L45 66" stroke="#60a5fa" strokeWidth="1.2" />
      <path d="M40 61 L50 61" stroke="#60a5fa" strokeWidth="1.2" />
      <rect
        x="70"
        y="56"
        width="10"
        height="10"
        rx="1"
        fill="#93c5fd"
        stroke="#60a5fa"
        strokeWidth="1.5"
      />
      <path d="M75 56 L75 66" stroke="#60a5fa" strokeWidth="1.2" />
      <path d="M70 61 L80 61" stroke="#60a5fa" strokeWidth="1.2" />
      <rect
        x="38"
        y="66"
        width="14"
        height="3"
        rx="0.5"
        fill="#92400e"
        stroke="#78350f"
        strokeWidth="0.8"
      />
      <rect
        x="68"
        y="66"
        width="14"
        height="3"
        rx="0.5"
        fill="#92400e"
        stroke="#78350f"
        strokeWidth="0.8"
      />
      <circle cx="40" cy="67" r="1" fill="#ec4899" />
      <circle cx="70" cy="67" r="1" fill="#f43f5e" />
      <circle cx="44" cy="67" r="1" fill="#ec4899" />
      <circle cx="74" cy="67" r="1" fill="#f43f5e" />
      <circle cx="48" cy="67" r="1" fill="#ec4899" />
      <circle cx="78" cy="67" r="1" fill="#f43f5e" />
      <circle
        cx="25"
        cy="35"
        r="6"
        fill="url(#keyGrad)"
        stroke="#f59e0b"
        strokeWidth="1.5"
      />
      <circle
        cx="25"
        cy="35"
        r="3"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="1"
      />
      <rect
        x="29"
        y="33.5"
        width="12"
        height="3"
        fill="#fbbf24"
        stroke="#f59e0b"
        strokeWidth="1"
      />
      <path
        d="M41 33.5 L41 32 L43 32 L43 33.5 L45 33.5 L45 31 L47 31 L47 36.5 L41 36.5 Z"
        fill="#fbbf24"
        stroke="#f59e0b"
        strokeWidth="1"
      />
      <path
        d="M22 33 C24 31 26 31 28 33"
        stroke="#ffffff"
        strokeWidth="1.5"
        opacity="0.5"
      />
    </svg>
  );
};

export default HouseIcon;