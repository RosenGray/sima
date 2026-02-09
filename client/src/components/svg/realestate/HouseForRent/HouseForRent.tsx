interface HouseForRentIconProps {
  width?: number;
  height?: number;
  viewBox?: {
    width: number;
    height: number;
  };
}
const HouseForRentIcon = ({
  width,
  height,
  viewBox = { width: 120, height: 120 },
}: HouseForRentIconProps) => {
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
          <stop offset="0" stopColor="#60a5fa" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient
          id="keyGrad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fef3c7" />
          <stop offset="0.5" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="#dbeafe" opacity="0.3" />
      <ellipse cx="60" cy="90" rx="40" ry="3" fill="#000000" opacity="0.2" />
      <rect
        x="35"
        y="55"
        width="50"
        height="35"
        fill="url(#houseGrad)"
        stroke="#2563eb"
        strokeWidth="2"
      />
      <path
        d="M60 35 L30 55 L90 55 Z"
        fill="#1e40af"
        stroke="#1e3a8a"
        strokeWidth="2"
      />
      <rect
        x="70"
        y="42"
        width="8"
        height="13"
        fill="#1e40af"
        stroke="#1e3a8a"
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
        x="54"
        y="73"
        width="5"
        height="7"
        rx="0.5"
        fill="#78350f"
        opacity="0.5"
      />
      <rect
        x="61"
        y="73"
        width="5"
        height="7"
        rx="0.5"
        fill="#78350f"
        opacity="0.5"
      />
      <rect
        x="40"
        y="62"
        width="10"
        height="10"
        rx="1"
        fill="#fef3c7"
        stroke="#3b82f6"
        strokeWidth="1.5"
      />
      <path d="M45 62 L45 72" stroke="#3b82f6" strokeWidth="1.2" />
      <path d="M40 67 L50 67" stroke="#3b82f6" strokeWidth="1.2" />
      <rect
        x="70"
        y="62"
        width="10"
        height="10"
        rx="1"
        fill="#fef3c7"
        stroke="#3b82f6"
        strokeWidth="1.5"
      />
      <path d="M75 62 L75 72" stroke="#3b82f6" strokeWidth="1.2" />
      <path d="M70 67 L80 67" stroke="#3b82f6" strokeWidth="1.2" />
      <circle
        cx="85"
        cy="25"
        r="6"
        fill="url(#keyGrad)"
        stroke="#f59e0b"
        strokeWidth="1.5"
      />
      <circle
        cx="85"
        cy="25"
        r="3"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="1"
      />
      <rect
        x="89"
        y="23.5"
        width="12"
        height="3"
        fill="#fbbf24"
        stroke="#f59e0b"
        strokeWidth="1"
      />
      <path
        d="M101 23.5 L101 22 L103 22 L103 23.5 L105 23.5 L105 21 L107 21 L107 26.5 L101 26.5 Z"
        fill="#fbbf24"
        stroke="#f59e0b"
        strokeWidth="1"
      />
      <rect
        x="20"
        y="20"
        width="30"
        height="12"
        rx="2"
        fill="#10b981"
        stroke="#059669"
        strokeWidth="1.5"
      />
      <rect
        x="23"
        y="23"
        width="10"
        height="3"
        rx="0.5"
        fill="#ffffff"
        opacity="0.9"
      />
      <rect
        x="23"
        y="27"
        width="14"
        height="3"
        rx="0.5"
        fill="#ffffff"
        opacity="0.9"
      />
    </svg>
  );
};

export default HouseForRentIcon;
