interface SimaLightLogoProps {
  width?: number;
  height?: number;
  viewBox?: {
    width: number;
    height: number;
  };
}

const SimaLightLogo = ({
  width,
  height,
  viewBox = { width: 200, height: 60 },
}: SimaLightLogoProps) => {
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
          id="textGrad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#a78bfa" />
          <stop offset="0.5" stopColor="#7c3aed" />
          <stop offset="1" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient
          id="bgGrad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f3f4f6" />
        </linearGradient>
        <radialGradient id="glowGrad" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#a78bfa" stopOpacity="0.15" />
          <stop offset="1" stopColor="#f9a8d4" stopOpacity="0.05" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="200" height="60" fill="url(#bgGrad)" />
      <ellipse cx="100" cy="30" rx="90" ry="25" fill="url(#glowGrad)" />
      <ellipse cx="100" cy="55" rx="80" ry="2" fill="#000000" opacity="0.1" />
      <path
        d="M50 15 C45 15 40 18 40 22 C40 26 43 28 47 30 L48 30 C52 32 54 35 54 39 C54 43 50 45 45 45 L43 45 L43 41 L45 41 C48 41 50 40 50 38 C50 36 48 35 46 33 L45 33 C42 31 40 28 40 24 C40 21 43 19 47 19 L50 19 Z"
        fill="url(#textGrad)"
        stroke="#6d28d9"
        strokeWidth="1.5"
      />
      <rect
        x="70"
        y="20"
        width="4"
        height="24"
        rx="2"
        fill="url(#textGrad)"
        stroke="#6d28d9"
        strokeWidth="1.5"
      />
      <circle
        cx="72"
        cy="14"
        r="2.5"
        fill="url(#textGrad)"
        stroke="#6d28d9"
        strokeWidth="1"
      />
      <rect
        x="88"
        y="20"
        width="4"
        height="24"
        rx="2"
        fill="url(#textGrad)"
        stroke="#6d28d9"
        strokeWidth="1.5"
      />
      <rect
        x="96"
        y="20"
        width="4"
        height="24"
        rx="2"
        fill="url(#textGrad)"
        stroke="#6d28d9"
        strokeWidth="1.5"
      />
      <rect
        x="104"
        y="20"
        width="4"
        height="24"
        rx="2"
        fill="url(#textGrad)"
        stroke="#6d28d9"
        strokeWidth="1.5"
      />
      <path
        d="M92 20 C93 18 94 17 96 17 C98 17 99 18 100 20 L96 20 Z"
        fill="url(#textGrad)"
        stroke="#6d28d9"
        strokeWidth="1.5"
      />
      <path
        d="M100 20 C101 18 102 17 104 17 C106 17 107 18 108 20 L104 20 Z"
        fill="url(#textGrad)"
        stroke="#6d28d9"
        strokeWidth="1.5"
      />
      <circle
        cx="143"
        cy="32"
        r="8"
        fill="url(#textGrad)"
        stroke="#6d28d9"
        strokeWidth="1.5"
      />
      <circle cx="143" cy="32" r="5" fill="#ffffff" />
      <rect
        x="148"
        y="24"
        width="4"
        height="20"
        rx="2"
        fill="url(#textGrad)"
        stroke="#6d28d9"
        strokeWidth="1.5"
      />
      <path
        d="M30 10.5 L30.45 11.55 L31.5 12 L30.45 12.45 L30 13.5 L29.55 12.45 L28.5 12 L29.55 11.55 Z"
        fill="#f9a8d4"
        stroke="#ec4899"
        strokeWidth="0.5"
        opacity="0.7"
      />
      <path
        d="M170 13.8 L170.36 14.64 L171.2 15 L170.36 15.36 L170 16.2 L169.64 15.36 L168.8 15 L169.64 14.64 Z"
        fill="#f9a8d4"
        stroke="#ec4899"
        strokeWidth="0.5"
        opacity="0.7"
      />
      <path
        d="M35 48.7 L35.39 49.61 L36.3 50 L35.39 50.39 L35 51.3 L34.61 50.39 L33.7 50 L34.61 49.61 Z"
        fill="#f9a8d4"
        stroke="#ec4899"
        strokeWidth="0.5"
        opacity="0.7"
      />
      <path
        d="M165 46.5 L165.45 47.55 L166.5 48 L165.45 48.45 L165 49.5 L164.55 48.45 L163.5 48 L164.55 47.55 Z"
        fill="#f9a8d4"
        stroke="#ec4899"
        strokeWidth="0.5"
        opacity="0.7"
      />
      <path
        d="M35 50 L165 50"
        stroke="url(#textGrad)"
        strokeWidth="2.5"
        opacity="0.6"
      />
      <circle cx="25" cy="8" r="1" fill="#ec4899" opacity="0.5" />
      <circle cx="32" cy="8" r="1" fill="#ec4899" opacity="0.5" />
      <circle cx="39" cy="8" r="1" fill="#ec4899" opacity="0.5" />
      <path d="M40 18 L155 18 L153 22 L42 22 Z" fill="#ffffff" opacity="0.4" />
    </svg>
  );
};
export default SimaLightLogo;
