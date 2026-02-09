interface MarketPlaceIconProps {
  width?: number;
  height?: number;
  viewBox?: {
    width: number;
    height: number;
  };
}
const MarketPlaceIcon = ({
  width,
  height,
  viewBox = { width: 100, height: 100 },
}: MarketPlaceIconProps) => {
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
          id="tagGrad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fef3c7" />
          <stop offset="0.5" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient
          id="arrowGrad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#60a5fa" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient
          id="circleGrad"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#34d399" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
        <linearGradient
          id="bgGrad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#10b981" stopOpacity="0.08" />
          <stop offset="1" stopColor="#f59e0b" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="url(#bgGrad)" />
      <ellipse cx="60" cy="88" rx="40" ry="3" fill="#000000" opacity="0.2" />
      <path
        d="M60 35 C75 35 85 45 85 60"
        fill="none"
        stroke="url(#arrowGrad)"
        strokeWidth="4"
      />
      <path d="M85 60 L82 55 L88 58 Z" fill="#3b82f6" />
      <path
        d="M60 85 C45 85 35 75 35 60"
        fill="none"
        stroke="url(#arrowGrad)"
        strokeWidth="4"
      />
      <path d="M35 60 L38 65 L32 62 Z" fill="#3b82f6" />
      <circle
        cx="60"
        cy="60"
        r="18"
        fill="url(#circleGrad)"
        stroke="#059669"
        strokeWidth="2"
      />
      <circle cx="60" cy="60" r="15" fill="#ffffff" opacity="0.2" />
      <path d="M60 50 L60 70" fill="none" stroke="#ffffff" strokeWidth="3" />
      <path
        d="M57 53 C55 53 54 54 54 56 C54 58 56 59 60 59 C64 59 66 60 66 62 C66 64 65 65 63 65"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
      />
      <path
        d="M28 35 L46 35 L46 47 L50 51 L46 55 L46 59 L28 59 Z"
        fill="url(#tagGrad)"
        stroke="#d97706"
        strokeWidth="1.5"
      />
      <circle
        cx="43"
        cy="39"
        r="2"
        fill="#ffffff"
        stroke="#d97706"
        strokeWidth="0.8"
      />
      <rect
        x="31"
        y="45"
        width="12"
        height="3"
        rx="1"
        fill="#dc2626"
        opacity="0.8"
      />
      <rect
        x="31"
        y="50"
        width="8"
        height="2"
        rx="0.5"
        fill="#374151"
        opacity="0.5"
      />
      <circle
        cx="32"
        cy="55"
        r="3.5"
        fill="#dc2626"
        stroke="#991b1b"
        strokeWidth="1"
      />
      <path d="M30 55 L34 55" fill="none" stroke="#ffffff" strokeWidth="1.5" />
      <path
        d="M70 65 L88 65 L88 77 L92 81 L88 85 L88 89 L70 89 Z"
        fill="url(#tagGrad)"
        stroke="#d97706"
        strokeWidth="1.5"
      />
      <circle
        cx="85"
        cy="69"
        r="2"
        fill="#ffffff"
        stroke="#d97706"
        strokeWidth="0.8"
      />
      <rect
        x="73"
        y="75"
        width="12"
        height="3"
        rx="1"
        fill="#dc2626"
        opacity="0.8"
      />
      <rect
        x="73"
        y="80"
        width="10"
        height="2"
        rx="0.5"
        fill="#374151"
        opacity="0.5"
      />
      <rect
        x="72"
        y="83"
        width="14"
        height="5"
        rx="1"
        fill="#10b981"
        stroke="#059669"
        strokeWidth="1"
      />
      <circle cx="75" cy="85.5" r="1" fill="#ffffff" />
      <circle cx="82" cy="85.5" r="1" fill="#ffffff" />
      <path d="M77 84 L80 87" stroke="#ffffff" strokeWidth="1.5" />
      <rect
        x="85"
        y="33"
        width="12"
        height="10"
        rx="1"
        fill="#34d399"
        stroke="#059669"
        strokeWidth="1.2"
      />
      <path
        d="M88 33 C89 30 93 30 94 33"
        fill="none"
        stroke="#059669"
        strokeWidth="1.5"
      />
      <path
        d="M18 75 L22 75 L22 81 L20 83 L18 83 Z"
        fill="#fbbf24"
        stroke="#f59e0b"
        strokeWidth="1"
      />
      <path
        d="M26 75 L30 75 L30 83 L28 83 L28 81 Z"
        fill="#fde047"
        stroke="#fbbf24"
        strokeWidth="1"
      />
      <rect
        x="22"
        y="78"
        width="4"
        height="3"
        fill="#fcd34d"
        stroke="#fbbf24"
        strokeWidth="0.8"
      />
      <path
        d="M50 22 L50.9 24.1 L53 25 L50.9 25.9 L50 28 L49.1 25.9 L47 25 L49.1 24.1 Z"
        fill="#fbbf24"
        stroke="#f59e0b"
        strokeWidth="0.5"
      />
      <path
        d="M95 52.5 L95.75 54.25 L97.5 55 L95.75 55.75 L95 57.5 L94.25 55.75 L92.5 55 L94.25 54.25 Z"
        fill="#fbbf24"
        stroke="#f59e0b"
        strokeWidth="0.5"
      />
      <path
        d="M25 58 L25.6 59.4 L27 60 L25.6 60.6 L25 62 L24.4 60.6 L23 60 L24.4 59.4 Z"
        fill="#fbbf24"
        stroke="#f59e0b"
        strokeWidth="0.5"
      />
      <circle cx="42" cy="80" r="2" fill="#dc2626" opacity="0.6" />
      <circle cx="52" cy="88" r="2" fill="#dc2626" opacity="0.6" />
      <path
        d="M40 82 L54 86"
        stroke="#dc2626"
        strokeWidth="1.5"
        opacity="0.6"
      />
    </svg>
  );
};

export default MarketPlaceIcon;
