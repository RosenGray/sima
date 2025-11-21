const TransportIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
    >
      <defs>
        <linearGradient
          id="carGrad"
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
          id="truckGrad"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient
          id="busGrad"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#f87171" />
          <stop offset="1" stopColor="#dc2626" />
        </linearGradient>
        <radialGradient id="transportWheelGrad" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4b5563" />
          <stop offset="1" stopColor="#1f2937" />
        </radialGradient>
        <linearGradient
          id="bgGrad"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#64748b" stopOpacity="0.1" />
          <stop offset="1" stopColor="#334155" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="url(#bgGrad)" />
      <rect
        x="10"
        y="55"
        width="100"
        height="30"
        fill="#475569"
        opacity="0.2"
      />
      <rect
        x="12"
        y="68"
        width="8"
        height="3"
        rx="1"
        fill="#ffffff"
        opacity="0.3"
      />
      <rect
        x="26"
        y="68"
        width="8"
        height="3"
        rx="1"
        fill="#ffffff"
        opacity="0.3"
      />
      <rect
        x="40"
        y="68"
        width="8"
        height="3"
        rx="1"
        fill="#ffffff"
        opacity="0.3"
      />
      <rect
        x="54"
        y="68"
        width="8"
        height="3"
        rx="1"
        fill="#ffffff"
        opacity="0.3"
      />
      <rect
        x="68"
        y="68"
        width="8"
        height="3"
        rx="1"
        fill="#ffffff"
        opacity="0.3"
      />
      <rect
        x="82"
        y="68"
        width="8"
        height="3"
        rx="1"
        fill="#ffffff"
        opacity="0.3"
      />
      <rect
        x="96"
        y="68"
        width="8"
        height="3"
        rx="1"
        fill="#ffffff"
        opacity="0.3"
      />
      <rect
        x="110"
        y="68"
        width="8"
        height="3"
        rx="1"
        fill="#ffffff"
        opacity="0.3"
      />
      <ellipse cx="60" cy="88" rx="50" ry="3" fill="#000000" opacity="0.15" />
      <rect
        x="15"
        y="45"
        width="30"
        height="18"
        rx="2"
        fill="url(#busGrad)"
        stroke="#dc2626"
        strokeWidth="1.5"
      />
      <rect
        x="17"
        y="48"
        width="6"
        height="6"
        rx="1"
        fill="#93c5fd"
        opacity="0.7"
      />
      <rect
        x="25"
        y="48"
        width="6"
        height="6"
        rx="1"
        fill="#93c5fd"
        opacity="0.7"
      />
      <rect
        x="33"
        y="48"
        width="6"
        height="6"
        rx="1"
        fill="#93c5fd"
        opacity="0.7"
      />
      <circle
        cx="23"
        cy="65"
        r="4"
        fill="url(#transportWheelGrad)"
        stroke="#1f2937"
        strokeWidth="1"
      />
      <circle cx="23" cy="65" r="2.5" fill="#6b7280" />
      <circle
        cx="37"
        cy="65"
        r="4"
        fill="url(#transportWheelGrad)"
        stroke="#1f2937"
        strokeWidth="1"
      />
      <circle cx="37" cy="65" r="2.5" fill="#6b7280" />
      <path
        d="M45 55 L45 42 L50 38 L56 38 L58 42 L58 55 Z"
        fill="url(#truckGrad)"
        stroke="#f59e0b"
        strokeWidth="1.2"
      />
      <rect
        x="58"
        y="45"
        width="15"
        height="10"
        rx="1"
        fill="#fbbf24"
        stroke="#f59e0b"
        strokeWidth="1.2"
      />
      <polygon
        points="47,40 51,40 52,43 47,43"
        fill="#93c5fd"
        stroke="#60a5fa"
        strokeWidth="0.8"
        opacity="0.7"
      />
      <circle
        cx="50"
        cy="57"
        r="3.5"
        fill="url(#transportWheelGrad)"
        stroke="#1f2937"
        strokeWidth="1"
      />
      <circle cx="50" cy="57" r="2" fill="#6b7280" />
      <circle
        cx="67"
        cy="57"
        r="3.5"
        fill="url(#transportWheelGrad)"
        stroke="#1f2937"
        strokeWidth="1"
      />
      <circle cx="67" cy="57" r="2" fill="#6b7280" />
      <path
        d="M75 52 L77 45 L82 42 L92 42 L95 45 L97 52 L97 57 L75 57 Z"
        fill="url(#carGrad)"
        stroke="#2563eb"
        strokeWidth="1.2"
      />
      <polygon
        points="80,42 83,36 89,36 92,42"
        fill="#3b82f6"
        stroke="#2563eb"
        strokeWidth="1"
      />
      <polygon
        points="81,41 83,37 86,37 86,41"
        fill="#93c5fd"
        stroke="#60a5fa"
        strokeWidth="0.8"
        opacity="0.7"
      />
      <polygon
        points="86,37 89,37 91,41 86,41"
        fill="#93c5fd"
        stroke="#60a5fa"
        strokeWidth="0.8"
        opacity="0.7"
      />
      <circle
        cx="81"
        cy="59"
        r="3.5"
        fill="url(#transportWheelGrad)"
        stroke="#1f2937"
        strokeWidth="1"
      />
      <circle cx="81" cy="59" r="2" fill="#6b7280" />
      <circle
        cx="91"
        cy="59"
        r="3.5"
        fill="url(#transportWheelGrad)"
        stroke="#1f2937"
        strokeWidth="1"
      />
      <circle cx="91" cy="59" r="2" fill="#6b7280" />
      <ellipse cx="95" cy="48" rx="1" ry="1.5" fill="#fde047" opacity="0.9" />
      <path
        d="M10 30 L25 30"
        stroke="#ffffff"
        strokeWidth="2"
        opacity="0.15"
      />
      <path
        d="M30 30 L40 30"
        stroke="#ffffff"
        strokeWidth="2"
        opacity="0.15"
      />
      <path
        d="M10 36 L25 36"
        stroke="#ffffff"
        strokeWidth="2"
        opacity="0.12"
      />
      <path
        d="M30 36 L40 36"
        stroke="#ffffff"
        strokeWidth="2"
        opacity="0.12"
      />
      <path
        d="M10 42 L25 42"
        stroke="#ffffff"
        strokeWidth="2"
        opacity="0.09"
      />
      <path
        d="M30 42 L40 42"
        stroke="#ffffff"
        strokeWidth="2"
        opacity="0.09"
      />
      <circle
        cx="95"
        cy="25"
        r="8"
        fill="#ffffff"
        stroke="#dc2626"
        strokeWidth="2"
      />
      <circle cx="95" cy="25" r="6" fill="#ef4444" opacity="0.2" />
      <path d="M91 25 L99 25" fill="none" stroke="#1f2937" strokeWidth="1.5" />
      <path d="M99 25 L97 23 L97 27 Z" fill="#1f2937" />
    </svg>
  );
};

export default TransportIcon;
