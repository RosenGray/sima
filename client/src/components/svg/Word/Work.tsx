interface WorkIconProps {
  width?: number;
  height?: number;
  viewBox?: {
    width: number;
    height: number;
  }
}
const WorkIcon = ({ width, height, viewBox = { width: 100, height: 100 } }: WorkIconProps) => {
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
          id="briefcaseGrad"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#3b82f6" />
          <stop offset="0.5" stopColor="#1e40af" />
          <stop offset="1" stopColor="#1e3a8a" />
        </linearGradient>
        <linearGradient
          id="suitGrad"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#374151" />
          <stop offset="1" stopColor="#111827" />
        </linearGradient>
        <linearGradient
          id="tieGrad"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#ef4444" />
          <stop offset="1" stopColor="#991b1b" />
        </linearGradient>
        <radialGradient id="personGrad" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fde68a" />
          <stop offset="1" stopColor="#f59e0b" />
        </radialGradient>
        <linearGradient
          id="bgGrad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#1e40af" stopOpacity="0.08" />
          <stop offset="1" stopColor="#f59e0b" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="url(#bgGrad)" />
      <ellipse cx="60" cy="90" rx="40" ry="3" fill="#000000" opacity="0.2" />
      <rect
        x="30"
        y="55"
        width="60"
        height="35"
        rx="3"
        fill="url(#briefcaseGrad)"
        stroke="#1e3a8a"
        strokeWidth="2"
      />
      <rect
        x="32"
        y="49"
        width="56"
        height="8"
        rx="2"
        fill="#1e3a8a"
        stroke="#1e3a8a"
        strokeWidth="1.5"
      />
      <path
        d="M48 49 C50 41 70 41 72 49"
        fill="none"
        stroke="#94a3b8"
        strokeWidth="4"
      />
      <path
        d="M49 49 C51 42 69 42 71 49"
        fill="none"
        stroke="#cbd5e1"
        strokeWidth="2"
      />
      <rect
        x="57"
        y="57"
        width="6"
        height="6"
        rx="1"
        fill="#fbbf24"
        stroke="#f59e0b"
        strokeWidth="1.2"
      />
      <circle cx="60" cy="60" r="1.5" fill="#92400e" />
      <path
        d="M30 70 L90 70"
        stroke="#1e3a8a"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <path d="M60 55 L60 90" stroke="#1e3a8a" strokeWidth="1" opacity="0.3" />
      <rect
        x="32"
        y="57"
        width="3"
        height="3"
        rx="0.5"
        fill="#94a3b8"
        stroke="#64748b"
        strokeWidth="0.8"
      />
      <rect
        x="86"
        y="57"
        width="3"
        height="3"
        rx="0.5"
        fill="#94a3b8"
        stroke="#64748b"
        strokeWidth="0.8"
      />
      <rect
        x="32"
        y="88"
        width="3"
        height="3"
        rx="0.5"
        fill="#94a3b8"
        stroke="#64748b"
        strokeWidth="0.8"
      />
      <rect
        x="86"
        y="88"
        width="3"
        height="3"
        rx="0.5"
        fill="#94a3b8"
        stroke="#64748b"
        strokeWidth="0.8"
      />
      <path d="M35 60 L80 60 L78 67 L37 67 Z" fill="#ffffff" opacity="0.15" />
      <circle
        cx="60"
        cy="30"
        r="10"
        fill="url(#personGrad)"
        stroke="#d97706"
        strokeWidth="1.5"
      />
      <circle cx="57" cy="28" r="2.5" fill="#ffffff" opacity="0.4" />
      <path
        d="M45 38 L42 48 L52 48 L50 40 L60 38 L70 40 L68 48 L78 48 L75 38 C72 35 68 34 65 34 C62 35 58 35 55 34 C52 34 48 35 45 38 Z"
        fill="url(#suitGrad)"
        stroke="#111827"
        strokeWidth="1.5"
      />
      <path
        d="M52 40 L50 46 L56 46 L60 42 L64 46 L70 46 L68 40 Z"
        fill="#ffffff"
        stroke="#e5e7eb"
        strokeWidth="1"
      />
      <path
        d="M60 40 L58 42 L58.5 50 L60 54 L61.5 50 L62 42 Z"
        fill="url(#tieGrad)"
        stroke="#991b1b"
        strokeWidth="1"
      />
      <path
        d="M58 40 L60 42 L62 40 L60 39 Z"
        fill="#991b1b"
        stroke="#7f1d1d"
        strokeWidth="0.8"
      />
      <rect
        x="59.5"
        y="43"
        width="1"
        height="8"
        rx="0.5"
        fill="#ffffff"
        opacity="0.2"
      />
      <rect
        x="18"
        y="65"
        width="12"
        height="16"
        rx="1"
        fill="#ffffff"
        stroke="#d1d5db"
        strokeWidth="1.5"
      />
      <path d="M20 68 L28 68" stroke="#9ca3af" strokeWidth="0.8" />
      <path d="M20 71 L28 71" stroke="#9ca3af" strokeWidth="0.8" />
      <path d="M20 74 L28 74" stroke="#9ca3af" strokeWidth="0.8" />
      <path d="M20 77 L28 77" stroke="#9ca3af" strokeWidth="0.8" />
      <path
        d="M21 78 L23 80 L27 75"
        fill="none"
        stroke="#10b981"
        strokeWidth="1.5"
      />
      <path
        d="M91 70 L92 78 C92 80 94 81 96 81 C98 81 100 80 100 78 L101 70 Z"
        fill="#ffffff"
        stroke="#9ca3af"
        strokeWidth="1.5"
      />
      <path
        d="M91.5 71 L92 76 C93 77 95 77 97 77 C99 77 100 76 100 76 L100.5 71 Z"
        fill="#92400e"
        opacity="0.8"
      />
      <path
        d="M101 73 C104 73 105 75 104 77"
        fill="none"
        stroke="#9ca3af"
        strokeWidth="1.5"
      />
      <path
        d="M94 68 C93 65 95 63 94 61"
        fill="none"
        stroke="#9ca3af"
        strokeWidth="1"
        opacity="0.5"
      />
      <path
        d="M96 68 C95 65 97 63 96 61"
        fill="none"
        stroke="#9ca3af"
        strokeWidth="1"
        opacity="0.5"
      />
      <path
        d="M25 45 L28 42 L31 44 L34 39 L37 35"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
      />
      <circle
        cx="25"
        cy="45"
        r="1.5"
        fill="#10b981"
        stroke="#059669"
        strokeWidth="0.8"
      />
      <circle
        cx="28"
        cy="42"
        r="1.5"
        fill="#10b981"
        stroke="#059669"
        strokeWidth="0.8"
      />
      <circle
        cx="31"
        cy="44"
        r="1.5"
        fill="#10b981"
        stroke="#059669"
        strokeWidth="0.8"
      />
      <circle
        cx="34"
        cy="39"
        r="1.5"
        fill="#10b981"
        stroke="#059669"
        strokeWidth="0.8"
      />
      <circle
        cx="37"
        cy="35"
        r="1.5"
        fill="#10b981"
        stroke="#059669"
        strokeWidth="0.8"
      />
      <rect
        x="75"
        y="75"
        width="10"
        height="12"
        rx="1"
        fill="#fef3c7"
        stroke="#f59e0b"
        strokeWidth="1"
      />
      <rect x="77" y="77" width="6" height="5" rx="0.5" fill="#d1d5db" />
      <path d="M77 83 L83 83" stroke="#92400e" strokeWidth="0.5" />
      <path d="M77 85 L83 85" stroke="#92400e" strokeWidth="0.5" />
    </svg>
  );
};


export default WorkIcon;