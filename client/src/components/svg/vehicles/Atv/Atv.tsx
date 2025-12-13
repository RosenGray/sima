interface AtvIconProps {
  width?: number;
  height?: number;
  viewBox?: {
    width: number;
    height: number;
  }
}
  const AtvIcon = ({ width, height, viewBox = { width: 100, height: 100 } }: AtvIconProps) => {
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
          id="atvBodyGrad"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fb923c" />
          <stop offset="1" stopColor="#ea580c" />
        </linearGradient>
        <radialGradient id="atvWheelGrad" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6b7280" />
          <stop offset="0.7" stopColor="#374151" />
          <stop offset="1" stopColor="#1f2937" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="#f97316" opacity="0.08" />
      <ellipse cx="60" cy="90" rx="55" ry="3" fill="#000000" opacity="0.2" />
      <circle
        cx="30"
        cy="80"
        r="13"
        fill="url(#atvWheelGrad)"
        stroke="#1f2937"
        strokeWidth="2"
      />
      <circle
        cx="30"
        cy="80"
        r="9"
        fill="none"
        stroke="#4b5563"
        strokeWidth="2"
      />
      <circle cx="30" cy="80" r="3" fill="#9ca3af" />
      <circle
        cx="30"
        cy="70"
        r="11"
        fill="url(#atvWheelGrad)"
        stroke="#1f2937"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <circle
        cx="90"
        cy="80"
        r="13"
        fill="url(#atvWheelGrad)"
        stroke="#1f2937"
        strokeWidth="2"
      />
      <circle
        cx="90"
        cy="80"
        r="9"
        fill="none"
        stroke="#4b5563"
        strokeWidth="2"
      />
      <circle cx="90" cy="80" r="3" fill="#9ca3af" />
      <circle
        cx="90"
        cy="70"
        r="11"
        fill="url(#atvWheelGrad)"
        stroke="#1f2937"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <path
        d="M30 75 L50 60 L70 60 L90 75"
        stroke="#d1d5db"
        strokeWidth="3.5"
      />
      <path d="M50 60 L50 70" stroke="#d1d5db" strokeWidth="3" />
      <path d="M70 60 L70 70" stroke="#d1d5db" strokeWidth="3" />
      <path
        d="M42 52 C43 46 46 42 50 40 L70 40 C74 42 77 46 78 52 L76 58 L44 58 Z"
        fill="url(#atvBodyGrad)"
        stroke="#ea580c"
        strokeWidth="1.5"
      />
      <path
        d="M46 52 L74 52 C76 53 77 55 77 57 C77 60 75 62 73 62 L47 62 C45 61 44 59 44 57 Z"
        fill="#1f2937"
        stroke="#111827"
        strokeWidth="1"
      />
      <path d="M80 55 L88 50" stroke="#d1d5db" strokeWidth="2.5" />
      <path d="M85 48 L88 48 L91 48" stroke="#d1d5db" strokeWidth="2" />
      <circle cx="85" cy="48" r="1.5" fill="#9ca3af" />
      <circle cx="91" cy="48" r="1.5" fill="#9ca3af" />
      <rect
        x="83"
        y="58"
        width="8"
        height="4"
        rx="1"
        fill="#fde047"
        stroke="#facc15"
        strokeWidth="1"
      />
      <rect
        x="35"
        y="62"
        width="12"
        height="6"
        rx="1"
        fill="none"
        stroke="#d1d5db"
        strokeWidth="1.5"
      />
      <path
        d="M25 68 C27 65 30 63 33 63"
        fill="none"
        stroke="#ea580c"
        strokeWidth="1.5"
      />
      <path
        d="M85 68 C87 65 90 63 93 63"
        fill="none"
        stroke="#ea580c"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default AtvIcon;
