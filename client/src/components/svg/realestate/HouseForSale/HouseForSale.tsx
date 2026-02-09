interface HouseForSaleIconProps {
  width?: number;
  height?: number;
  viewBox?: {
    width: number;
    height: number;
  };
}
const HouseForSaleIcon = ({
  width,
  height,
  viewBox = { width: 120, height: 120 },
}: HouseForSaleIconProps) => {
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
          id="signGrad"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fef3c7" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="#fee2e2" opacity="0.3" />
      <ellipse cx="60" cy="90" rx="40" ry="3" fill="#000000" opacity="0.2" />
      <rect
        x="35"
        y="55"
        width="50"
        height="35"
        fill="url(#houseGrad)"
        stroke="#dc2626"
        strokeWidth="2"
      />
      <path
        d="M60 35 L30 55 L90 55 Z"
        fill="#991b1b"
        stroke="#7f1d1d"
        strokeWidth="2"
      />
      <rect
        x="70"
        y="42"
        width="8"
        height="13"
        fill="#991b1b"
        stroke="#7f1d1d"
        strokeWidth="1.5"
      />
      <rect
        x="52"
        y="70"
        width="16"
        height="20"
        rx="1"
        fill="#92400e"
        stroke="#78350f"
        strokeWidth="1.5"
      />
      <rect
        x="40"
        y="62"
        width="10"
        height="10"
        rx="1"
        fill="#fef3c7"
        stroke="#ef4444"
        strokeWidth="1.5"
      />
      <path d="M45 62 L45 72" stroke="#ef4444" strokeWidth="1.2" />
      <path d="M40 67 L50 67" stroke="#ef4444" strokeWidth="1.2" />
      <rect
        x="70"
        y="62"
        width="10"
        height="10"
        rx="1"
        fill="#fef3c7"
        stroke="#ef4444"
        strokeWidth="1.5"
      />
      <path d="M75 62 L75 72" stroke="#ef4444" strokeWidth="1.2" />
      <path d="M70 67 L80 67" stroke="#ef4444" strokeWidth="1.2" />
      <rect
        x="88"
        y="75"
        width="4"
        height="20"
        fill="#92400e"
        stroke="#78350f"
        strokeWidth="1"
      />
      <rect
        x="75"
        y="57"
        width="30"
        height="18"
        rx="2"
        fill="url(#signGrad)"
        stroke="#f59e0b"
        strokeWidth="2"
      />
      <rect
        x="78"
        y="60"
        width="8"
        height="3"
        rx="0.5"
        fill="#dc2626"
        opacity="0.8"
      />
      <rect
        x="88"
        y="60"
        width="10"
        height="3"
        rx="0.5"
        fill="#dc2626"
        opacity="0.8"
      />
      <path d="M85 67 L85 71" fill="none" stroke="#dc2626" strokeWidth="2" />
      <path
        d="M83 68 C82 68 82 68.5 84 68.5 C86 68.5 86 69.5 84 69.5"
        fill="none"
        stroke="#dc2626"
        strokeWidth="1.5"
      />
      <path
        d="M93 67 L100 67 L100 71 L102 69 L100 67 Z"
        fill="#dc2626"
        stroke="#991b1b"
        strokeWidth="1"
      />
    </svg>
  );
};

export default HouseForSaleIcon;
