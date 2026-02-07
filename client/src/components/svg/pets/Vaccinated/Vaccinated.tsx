interface VaccinatedIconProps {
  width?: number;
  height?: number;
  viewBox?: {
    width: number;
    height: number;
  };
}

const VaccinatedIcon = ({
  width,
  height,
  viewBox = { width: 120, height: 120 },
}: VaccinatedIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${viewBox?.width} ${viewBox?.height}`}
      fill="none"
    >
      <circle cx="60" cy="60" r="58" fill="#fef3c7" opacity="0.3" />
      <rect
        x="45"
        y="50"
        width="30"
        height="12"
        rx="2"
        fill="#ffffff"
        stroke="#64748b"
        strokeWidth="2"
      />
      <rect
        x="70"
        y="52"
        width="15"
        height="8"
        rx="1"
        fill="#94a3b8"
        stroke="#64748b"
        strokeWidth="1.5"
      />
      <rect
        x="83"
        y="54"
        width="4"
        height="4"
        rx="1"
        fill="#ef4444"
        stroke="#dc2626"
        strokeWidth="1"
      />
      <rect
        x="35"
        y="54"
        width="10"
        height="4"
        fill="#cbd5e1"
        stroke="#94a3b8"
        strokeWidth="1"
      />
      <path
        d="M35 54 L30 56 L35 58 Z"
        fill="#94a3b8"
        stroke="#64748b"
        strokeWidth="1"
      />
      <path d="M48 50 L48 52" stroke="#94a3b8" strokeWidth="1" />
      <path d="M54 50 L54 52" stroke="#94a3b8" strokeWidth="1" />
      <path d="M60 50 L60 52" stroke="#94a3b8" strokeWidth="1" />
      <path d="M66 50 L66 52" stroke="#94a3b8" strokeWidth="1" />
      <path
        d="M60 75 L50 80 L50 90 L60 95 L70 90 L70 80 Z"
        fill="#10b981"
        stroke="#059669"
        strokeWidth="2"
      />
      <path
        d="M54 86 L58 90 L66 82"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
      />
    </svg>
  );
};

export default VaccinatedIcon;
