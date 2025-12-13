interface CaravanIconProps {
  width?: number;
  height?: number;
  viewBox?: {
    width: number;
    height: number;
  }
}
  const CaravanIcon = ({ width, height, viewBox = { width: 100, height: 100 } }: CaravanIconProps) => {
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
          id="caravanBodyGrad"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#e0e7ff" />
          <stop offset="1" stopColor="#c7d2fe" />
        </linearGradient>
        <linearGradient
          id="caravanStripeGrad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#818cf8" />
          <stop offset="1" stopColor="#6366f1" />
        </linearGradient>
        <radialGradient id="caravanWheelGrad" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4b5563" />
          <stop offset="1" stopColor="#1f2937" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="#818cf8" opacity="0.08" />
      <ellipse cx="60" cy="88" rx="45" ry="3" fill="#000000" opacity="0.2" />
      <path
        d="M30 70 L30 50 C30 42 35 35 42 32 L78 32 C85 35 90 42 90 50 L90 70 Z"
        fill="url(#caravanBodyGrad)"
        stroke="#a5b4fc"
        strokeWidth="2"
      />
      <path
        d="M32 52 L88 52 L88 56 L32 56 Z"
        fill="url(#caravanStripeGrad)"
        opacity="0.6"
      />
      <rect
        x="38"
        y="38"
        width="14"
        height="10"
        rx="2"
        fill="#93c5fd"
        stroke="#60a5fa"
        strokeWidth="1"
      />
      <path d="M45 38 L45 48" stroke="#60a5fa" strokeWidth="0.8" />
      <rect
        x="68"
        y="38"
        width="14"
        height="10"
        rx="2"
        fill="#93c5fd"
        stroke="#60a5fa"
        strokeWidth="1"
      />
      <path d="M75 38 L75 48" stroke="#60a5fa" strokeWidth="0.8" />
      <rect
        x="54"
        y="42"
        width="10"
        height="28"
        rx="1"
        fill="#fef3c7"
        stroke="#fbbf24"
        strokeWidth="1.5"
      />
      <circle cx="62" cy="57" r="1" fill="#92400e" />
      <path d="M54 56 L64 56" stroke="#fbbf24" strokeWidth="0.8" />
      <circle
        cx="45"
        cy="77"
        r="9"
        fill="url(#caravanWheelGrad)"
        stroke="#1f2937"
        strokeWidth="1.5"
      />
      <circle
        cx="45"
        cy="77"
        r="5"
        fill="#6b7280"
        stroke="#4b5563"
        strokeWidth="1"
      />
      <circle
        cx="75"
        cy="77"
        r="9"
        fill="url(#caravanWheelGrad)"
        stroke="#1f2937"
        strokeWidth="1.5"
      />
      <circle
        cx="75"
        cy="77"
        r="5"
        fill="#6b7280"
        stroke="#4b5563"
        strokeWidth="1"
      />
      <path d="M30 60 L20 60" stroke="#9ca3af" strokeWidth="3" />
      <circle
        cx="20"
        cy="60"
        r="3"
        fill="#d1d5db"
        stroke="#9ca3af"
        strokeWidth="1"
      />
      <rect
        x="56"
        y="28"
        width="8"
        height="3"
        rx="1"
        fill="#d1d5db"
        stroke="#9ca3af"
        strokeWidth="0.8"
      />
      <rect
        x="32"
        y="32"
        width="4"
        height="38"
        rx="1"
        fill="#6366f1"
        stroke="#6366f1"
        strokeWidth="0.8"
        opacity="0.3"
      />
    </svg>
  );
};

export default CaravanIcon;
