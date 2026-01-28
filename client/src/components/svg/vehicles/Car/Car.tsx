interface CarIconProps {
  width?: number;
  height?: number;
  viewBox?: {
    width: number;
    height: number;
  }
}
  const CarIcon = ({ width, height, viewBox = { width: 100, height: 100 } }: CarIconProps) => {
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
          id="bodyGrad"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#7c8ff0" />
          <stop offset="0.5" stopColor="#667eea" />
          <stop offset="1" stopColor="#5568d3" />
        </linearGradient>
        <linearGradient
          id="windowGrad"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#4facfe" stopOpacity="0.9" />
          <stop offset="1" stopColor="#2196f3" stopOpacity="0.7" />
        </linearGradient>
        <radialGradient id="wheelGrad" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#34495E" />
          <stop offset="0.6" stopColor="#2C3E50" />
          <stop offset="1" stopColor="#1a252f" />
        </radialGradient>
        <radialGradient id="rimGrad" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#95a5a6" />
          <stop offset="0.5" stopColor="#7f8c8d" />
          <stop offset="1" stopColor="#566573" />
        </radialGradient>
        <linearGradient
          id="bgGrad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#667eea" stopOpacity="0.05" />
          <stop offset="1" stopColor="#f093fb" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="url(#bgGrad)" />
      <ellipse cx="60" cy="88" rx="48" ry="3" fill="#000000" opacity="0.15" />
      <path
        d="M26 67 L31 52 L41 47 C43 46 45 45 48 44 L72 44 C75 45 77 46 79 47 L89 52 L94 67 C94 70 93 73 91 75 L29 75 C27 73 26 70 26 67 Z"
        fill="#000000"
        opacity="0.08"
      />
      <path
        d="M25 65 L30 50 L40 45 C42 44 44 43 47 42 L73 42 C76 43 78 44 80 45 L90 50 L95 65 C95 68 94 71 92 73 L28 73 C26 71 25 68 25 65 Z"
        fill="url(#bodyGrad)"
        stroke="#5568d3"
        strokeWidth="1.5"
      />
      <path
        d="M42 43 C43 39 45 35 48 33 L72 33 C75 35 77 39 78 43 L42 43 Z"
        fill="url(#bodyGrad)"
        stroke="#5568d3"
        strokeWidth="1.5"
      />
      <path
        d="M44 41 C45 38 46 36 48 35 L59 35 L59 41 Z"
        fill="url(#windowGrad)"
        stroke="#2196f3"
        strokeWidth="1"
      />
      <path
        d="M61 35 L72 35 C74 36 75 38 76 41 L61 41 Z"
        fill="url(#windowGrad)"
        stroke="#2196f3"
        strokeWidth="1"
      />
      <path d="M46 36 L56 36 L55 38 L46 38 Z" fill="#ffffff" opacity="0.3" />
      <path d="M64 36 L71 36 L70 38 L64 38 Z" fill="#ffffff" opacity="0.3" />
      <path
        d="M30 52 L85 52 C87 54 88 56 88 58 L32 58 C32 56 31 54 30 52 Z"
        fill="#ffffff"
        opacity="0.2"
      />
      <circle
        cx="38"
        cy="73"
        r="10"
        fill="url(#wheelGrad)"
        stroke="#1a252f"
        strokeWidth="1.5"
      />
      <circle
        cx="38"
        cy="73"
        r="6"
        fill="url(#rimGrad)"
        stroke="#566573"
        strokeWidth="1"
      />
      <circle cx="38" cy="73" r="3" fill="#2C3E50" />
      <path d="M41.0 73.0 L43.5 73.0" stroke="#7f8c8d" strokeWidth="0.8" />
      <path
        d="M39.5 75.59807621135332 L40.75 77.76313972081441"
        stroke="#7f8c8d"
        strokeWidth="0.8"
      />
      <path
        d="M36.5 75.59807621135332 L35.25 77.76313972081441"
        stroke="#7f8c8d"
        strokeWidth="0.8"
      />
      <path d="M35.0 73.0 L32.5 73.0" stroke="#7f8c8d" strokeWidth="0.8" />
      <path
        d="M36.5 70.40192378864668 L35.25 68.23686027918559"
        stroke="#7f8c8d"
        strokeWidth="0.8"
      />
      <path
        d="M39.5 70.40192378864668 L40.75 68.23686027918559"
        stroke="#7f8c8d"
        strokeWidth="0.8"
      />
      <circle
        cx="82"
        cy="73"
        r="10"
        fill="url(#wheelGrad)"
        stroke="#1a252f"
        strokeWidth="1.5"
      />
      <circle
        cx="82"
        cy="73"
        r="6"
        fill="url(#rimGrad)"
        stroke="#566573"
        strokeWidth="1"
      />
      <circle cx="82" cy="73" r="3" fill="#2C3E50" />
      <path d="M85.0 73.0 L87.5 73.0" stroke="#7f8c8d" strokeWidth="0.8" />
      <path
        d="M83.5 75.59807621135332 L84.75 77.76313972081441"
        stroke="#7f8c8d"
        strokeWidth="0.8"
      />
      <path
        d="M80.5 75.59807621135332 L79.25 77.76313972081441"
        stroke="#7f8c8d"
        strokeWidth="0.8"
      />
      <path d="M79.0 73.0 L76.5 73.0" stroke="#7f8c8d" strokeWidth="0.8" />
      <path
        d="M80.5 70.40192378864668 L79.25 68.23686027918559"
        stroke="#7f8c8d"
        strokeWidth="0.8"
      />
      <path
        d="M83.5 70.40192378864668 L84.75 68.23686027918559"
        stroke="#7f8c8d"
        strokeWidth="0.8"
      />
      <circle cx="89" cy="55" r="2.5" fill="#fef08a" opacity="0.3" />
      <ellipse
        cx="89"
        cy="55"
        rx="2"
        ry="3"
        fill="#fde047"
        stroke="#facc15"
        strokeWidth="0.5"
      />
      <ellipse
        cx="31"
        cy="55"
        rx="2"
        ry="3"
        fill="#fca5a5"
        stroke="#f87171"
        strokeWidth="0.5"
      />
      <path
        d="M60 43 L60 68"
        stroke="#5568d3"
        strokeWidth="1.2"
        opacity="0.6"
      />
      <rect
        x="63"
        y="56"
        width="6"
        height="2"
        rx="1"
        fill="#2C3E50"
        stroke="#34495E"
        strokeWidth="0.5"
      />
      <path d="M30 68 L90 68" stroke="#5568d3" strokeWidth="1" opacity="0.4" />
    </svg>
  );
};

export default CarIcon;
