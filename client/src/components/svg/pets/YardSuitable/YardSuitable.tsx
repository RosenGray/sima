interface YardSuitableIconProps {
  width?: number;
  height?: number;
  viewBox?: {
    width: number;
    height: number;
  };
}

const YardSuitableIcon = ({
  width,
  height,
  viewBox = { width: 120, height: 120 },
}: YardSuitableIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${viewBox?.width} ${viewBox?.height}`}
      fill="none"
    >
      <circle cx="60" cy="60" r="58" fill="#d1fae5" opacity="0.3" />
      <rect
        x="45"
        y="50"
        width="30"
        height="25"
        fill="#fef3c7"
        stroke="#f59e0b"
        strokeWidth="2"
      />
      <path
        d="M60 35 L40 50 L80 50 Z"
        fill="#dc2626"
        stroke="#991b1b"
        strokeWidth="2"
      />
      <rect
        x="55"
        y="60"
        width="10"
        height="15"
        rx="1"
        fill="#92400e"
        stroke="#78350f"
        strokeWidth="1"
      />
      <rect
        x="25"
        y="78"
        width="4"
        height="15"
        rx="1"
        fill="#92400e"
        stroke="#78350f"
        strokeWidth="1"
      />
      <rect
        x="33"
        y="78"
        width="4"
        height="15"
        rx="1"
        fill="#92400e"
        stroke="#78350f"
        strokeWidth="1"
      />
      <rect
        x="41"
        y="78"
        width="4"
        height="15"
        rx="1"
        fill="#92400e"
        stroke="#78350f"
        strokeWidth="1"
      />
      <rect
        x="49"
        y="78"
        width="4"
        height="15"
        rx="1"
        fill="#92400e"
        stroke="#78350f"
        strokeWidth="1"
      />
      <rect
        x="57"
        y="78"
        width="4"
        height="15"
        rx="1"
        fill="#92400e"
        stroke="#78350f"
        strokeWidth="1"
      />
      <path d="M25 83 L57 83" stroke="#92400e" strokeWidth="2" />
      <path d="M25 88 L57 88" stroke="#92400e" strokeWidth="2" />
      <path d="M65 93 C66 88 67 88 68 93" stroke="#10b981" strokeWidth="2" />
      <path d="M71 93 C72 88 73 88 74 93" stroke="#10b981" strokeWidth="2" />
      <path d="M77 93 C78 88 79 88 80 93" stroke="#10b981" strokeWidth="2" />
      <path d="M83 93 C84 88 85 88 86 93" stroke="#10b981" strokeWidth="2" />
      <path d="M89 93 C90 88 91 88 92 93" stroke="#10b981" strokeWidth="2" />
      <path d="M95 93 C96 88 97 88 98 93" stroke="#10b981" strokeWidth="2" />
      <path d="M101 93 C102 88 103 88 104 93" stroke="#10b981" strokeWidth="2" />
      <path d="M107 93 C108 88 109 88 110 93" stroke="#10b981" strokeWidth="2" />
      <rect
        x="85"
        y="70"
        width="4"
        height="15"
        fill="#92400e"
        stroke="#78350f"
        strokeWidth="1"
      />
      <circle cx="87" cy="68" r="8" fill="#10b981" stroke="#059669" strokeWidth="1.5" />
    </svg>
  );
};

export default YardSuitableIcon;
