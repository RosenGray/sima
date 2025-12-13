interface ScooterIconProps {
  width?: number;
  height?: number;
  viewBox?: {
    width: number;
    height: number;
  }
}
const ScooterIcon = ({ width, height, viewBox = { width: 100, height: 100 } }: ScooterIconProps) => {
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
          id="scooterBodyGrad"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#0891b2" />
        </linearGradient>
        <radialGradient id="scooterWheelGrad" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4b5563" />
          <stop offset="1" stopColor="#1f2937" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="#06b6d4" opacity="0.08" />
      <ellipse cx="60" cy="88" rx="45" ry="2" fill="#000000" opacity="0.2" />
      <circle
        cx="38"
        cy="78"
        r="10"
        fill="url(#scooterWheelGrad)"
        stroke="#1f2937"
        strokeWidth="1.5"
      />
      <circle cx="38" cy="78" r="6" fill="#6b7280" />
      <circle cx="38" cy="78" r="2" fill="#1f2937" />
      <circle
        cx="82"
        cy="78"
        r="10"
        fill="url(#scooterWheelGrad)"
        stroke="#1f2937"
        strokeWidth="1.5"
      />
      <circle cx="82" cy="78" r="6" fill="#6b7280" />
      <circle cx="82" cy="78" r="2" fill="#1f2937" />
      <rect
        x="35"
        y="68"
        width="50"
        height="8"
        rx="2"
        fill="#d1d5db"
        stroke="#9ca3af"
        strokeWidth="1.5"
      />
      <path
        d="M35 52 C36 48 38 45 42 44 L55 44 C58 45 60 47 60 50 L60 65 L35 65 Z"
        fill="url(#scooterBodyGrad)"
        stroke="#0891b2"
        strokeWidth="1.5"
      />
      <path
        d="M38 52 L57 52 C59 53 60 55 60 57 C60 59 59 60 57 60 L38 60 C36 59 35 57 35 55 Z"
        fill="#1f2937"
        stroke="#111827"
        strokeWidth="1"
      />
      <path d="M75 68 L78 50" stroke="#d1d5db" strokeWidth="3" />
      <path d="M72 48 L78 48 L84 48" stroke="#d1d5db" strokeWidth="2.5" />
      <circle
        cx="72"
        cy="48"
        r="2"
        fill="#9ca3af"
        stroke="#6b7280"
        strokeWidth="0.5"
      />
      <circle
        cx="84"
        cy="48"
        r="2"
        fill="#9ca3af"
        stroke="#6b7280"
        strokeWidth="0.5"
      />
      <circle
        cx="78"
        cy="55"
        r="3.5"
        fill="#fde047"
        stroke="#facc15"
        strokeWidth="1"
      />
      <circle cx="78" cy="55" r="2" fill="#fff7ed" opacity="0.7" />
      <rect
        x="28"
        y="58"
        width="10"
        height="8"
        rx="1"
        fill="#0891b2"
        stroke="#0891b2"
        strokeWidth="1"
      />
      <path d="M40 48 L55 48" stroke="#0891b2" strokeWidth="1" opacity="0.5" />
    </svg>
  );
};

export default ScooterIcon;
