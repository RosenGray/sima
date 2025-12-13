interface DogIconProps {
  width?: number;
  height?: number;
  viewBox?: {
    width: number;
    height: number;
  }
}
  const DogIcon = ({ width, height, viewBox = { width: 100, height: 100 } }: DogIconProps) => {
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
          id="dogBodyGrad"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fbbf24" />
          <stop offset="0.5" stopColor="#f59e0b" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
        <linearGradient
          id="earGrad"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#f59e0b" />
          <stop offset="1" stopColor="#b45309" />
        </linearGradient>
        <radialGradient id="snoutGrad" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fef3c7" />
          <stop offset="0.7" stopColor="#fde68a" />
          <stop offset="1" stopColor="#fbbf24" />
        </radialGradient>
        <linearGradient
          id="bgGrad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#f59e0b" stopOpacity="0.08" />
          <stop offset="1" stopColor="#ef4444" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="url(#bgGrad)" />
      <ellipse cx="60" cy="90" rx="35" ry="3" fill="#000000" opacity="0.2" />
      <path
        d="M38 40 C35 42 32 46 30 52 C28 58 30 64 34 66 C36 62 38 56 40 50 Z"
        fill="url(#earGrad)"
        stroke="#b45309"
        strokeWidth="1.5"
      />
      <path
        d="M82 40 C85 42 88 46 90 52 C92 58 90 64 86 66 C84 62 82 56 80 50 Z"
        fill="url(#earGrad)"
        stroke="#b45309"
        strokeWidth="1.5"
      />
      <circle
        cx="60"
        cy="55"
        r="24"
        fill="url(#dogBodyGrad)"
        stroke="#b45309"
        strokeWidth="2"
      />
      <path
        d="M50 40 C55 35 65 35 70 40 C68 38 52 38 50 40 Z"
        fill="#ffffff"
        opacity="0.2"
      />
      <path
        d="M60 58 C50 58 45 62 45 68 C45 72 50 75 60 75 C70 75 75 72 75 68 C75 62 70 58 60 58 Z"
        fill="url(#snoutGrad)"
        stroke="#d97706"
        strokeWidth="1"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="4"
        ry="5"
        fill="#ffffff"
        stroke="#b45309"
        strokeWidth="1"
      />
      <ellipse cx="50" cy="51" rx="2.5" ry="3" fill="#1f2937" />
      <circle cx="49" cy="50" r="1" fill="#ffffff" opacity="0.8" />
      <ellipse
        cx="70"
        cy="50"
        rx="4"
        ry="5"
        fill="#ffffff"
        stroke="#b45309"
        strokeWidth="1"
      />
      <ellipse cx="70" cy="51" rx="2.5" ry="3" fill="#1f2937" />
      <circle cx="69" cy="50" r="1" fill="#ffffff" opacity="0.8" />
      <ellipse
        cx="60"
        cy="67"
        rx="4"
        ry="3.5"
        fill="#1f2937"
        stroke="#111827"
        strokeWidth="1"
      />
      <ellipse cx="59" cy="66" rx="1.5" ry="1" fill="#4b5563" opacity="0.6" />
      <path d="M60 68 L60 70" fill="none" stroke="#b45309" strokeWidth="1.5" />
      <path
        d="M60 70 C55 72 50 72 48 70"
        fill="none"
        stroke="#b45309"
        strokeWidth="1.5"
      />
      <path
        d="M60 70 C65 72 70 72 72 70"
        fill="none"
        stroke="#b45309"
        strokeWidth="1.5"
      />
      <path
        d="M60 70 C58 72 57 74 58 76 C59 77 61 77 62 76 C63 74 62 72 60 70 Z"
        fill="#f87171"
        stroke="#dc2626"
        strokeWidth="1"
      />
      <path
        d="M45 45 C47 43 50 43 53 44"
        fill="none"
        stroke="#b45309"
        strokeWidth="1.2"
      />
      <path
        d="M67 44 C70 43 73 43 75 45"
        fill="none"
        stroke="#b45309"
        strokeWidth="1.2"
      />
      <path
        d="M42 75 C45 78 52 80 60 80 C68 80 75 78 78 75 L78 79 C75 82 68 84 60 84 C52 84 45 82 42 79 Z"
        fill="#ef4444"
        stroke="#dc2626"
        strokeWidth="1.5"
      />
      <circle
        cx="60"
        cy="80"
        r="4"
        fill="#fbbf24"
        stroke="#f59e0b"
        strokeWidth="1.5"
      />
      <circle cx="60" cy="80" r="2.5" fill="#fde047" />
      <circle cx="60" cy="79" r="1" fill="#ffffff" opacity="0.6" />
      <ellipse cx="42" cy="45" rx="4" ry="3" fill="#b45309" opacity="0.3" />
      <ellipse cx="78" cy="48" rx="3.5" ry="2.5" fill="#b45309" opacity="0.3" />
      <circle cx="42" cy="62" r="0.8" fill="#b45309" />
      <circle cx="78" cy="62" r="0.8" fill="#b45309" />
      <circle cx="40" cy="62" r="0.8" fill="#b45309" />
      <circle cx="80" cy="62" r="0.8" fill="#b45309" />
      <path
        d="M42 78 C38 82 36 88 38 92 C40 94 50 95 60 95 C70 95 80 94 82 92 C84 88 82 82 78 78 Z"
        fill="url(#dogBodyGrad)"
        stroke="#b45309"
        strokeWidth="1.5"
      />
      <ellipse
        cx="48"
        cy="92"
        rx="5"
        ry="6"
        fill="#f59e0b"
        stroke="#b45309"
        strokeWidth="1.2"
      />
      <ellipse cx="48" cy="94" rx="3" ry="2" fill="#b45309" opacity="0.3" />
      <ellipse
        cx="72"
        cy="92"
        rx="5"
        ry="6"
        fill="#f59e0b"
        stroke="#b45309"
        strokeWidth="1.2"
      />
      <ellipse cx="72" cy="94" rx="3" ry="2" fill="#b45309" opacity="0.3" />
      <circle cx="46" cy="95" r="1" fill="#b45309" opacity="0.4" />
      <circle cx="48" cy="95" r="1" fill="#b45309" opacity="0.4" />
      <circle cx="50" cy="95" r="1" fill="#b45309" opacity="0.4" />
      <circle cx="70" cy="95" r="1" fill="#b45309" opacity="0.4" />
      <circle cx="72" cy="95" r="1" fill="#b45309" opacity="0.4" />
      <circle cx="74" cy="95" r="1" fill="#b45309" opacity="0.4" />
    </svg>
  );
};

export default DogIcon;