interface SimaDarkIconProps {
  width?: number;
  height?: number;
  viewBox?: {
    width: number;
    height: number;
  };
}
const SimaDarkIcon = ({
  width,
  height,
  viewBox = { width: 100, height: 100 },
}: SimaDarkIconProps) => {
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
          <stop offset="0" stopColor="#7a3d52" />
          <stop offset="0.5" stopColor="#5c2e3e" />
          <stop offset="1" stopColor="#3d1f2a" />
        </linearGradient>
        <linearGradient
          id="bgGrad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#2a2227" />
          <stop offset="1" stopColor="#3d1f2a" />
        </linearGradient>
        <radialGradient id="glowGrad" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5c2e3e" stopOpacity="0.3" />
          <stop offset="1" stopColor="#3d1f2a" stopOpacity="0.1" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="url(#bgGrad)" />
      <circle cx="60" cy="60" r="45" fill="url(#glowGrad)" />
      <ellipse cx="60" cy="88" rx="40" ry="3" fill="#000000" opacity="0.3" />
      <path
        d="M30 45 C25 45 20 48 20 52 C20 56 23 58 27 60 L28 60 C32 62 34 65 34 69 C34 73 30 75 25 75 L23 75 L23 71 L25 71 C28 71 30 70 30 68 C30 66 28 65 26 63 L25 63 C22 61 20 58 20 54 C20 51 23 49 27 49 L30 49 Z"
        fill="url(#textGrad)"
        stroke="#3d1f2a"
        strokeWidth="1.5"
      />
      <rect
        x="38"
        y="50"
        width="4"
        height="24"
        rx="2"
        fill="url(#textGrad)"
        stroke="#3d1f2a"
        strokeWidth="1.5"
      />
      <circle
        cx="40"
        cy="44"
        r="2.5"
        fill="url(#textGrad)"
        stroke="#3d1f2a"
        strokeWidth="1"
      />
      <rect
        x="48"
        y="50"
        width="4"
        height="24"
        rx="2"
        fill="url(#textGrad)"
        stroke="#3d1f2a"
        strokeWidth="1.5"
      />
      <rect
        x="56"
        y="50"
        width="4"
        height="24"
        rx="2"
        fill="url(#textGrad)"
        stroke="#3d1f2a"
        strokeWidth="1.5"
      />
      <rect
        x="64"
        y="50"
        width="4"
        height="24"
        rx="2"
        fill="url(#textGrad)"
        stroke="#3d1f2a"
        strokeWidth="1.5"
      />
      <path
        d="M52 50 C53 48 54 47 56 47 C58 47 59 48 60 50 L56 50 Z"
        fill="url(#textGrad)"
        stroke="#3d1f2a"
        strokeWidth="1.5"
      />
      <path
        d="M60 50 C61 48 62 47 64 47 C66 47 67 48 68 50 L64 50 Z"
        fill="url(#textGrad)"
        stroke="#3d1f2a"
        strokeWidth="1.5"
      />
      <circle
        cx="83"
        cy="62"
        r="8"
        fill="url(#textGrad)"
        stroke="#3d1f2a"
        strokeWidth="1.5"
      />
      <circle cx="83" cy="62" r="5" fill="#2a2227" />
      <rect
        x="88"
        y="54"
        width="4"
        height="20"
        rx="2"
        fill="url(#textGrad)"
        stroke="#3d1f2a"
        strokeWidth="1.5"
      />
      <path
        d="M15 33 L15.6 34.4 L17 35 L15.6 35.6 L15 37 L14.4 35.6 L13 35 L14.4 34.4 Z"
        fill="#924d66"
        stroke="#5c2e3e"
        strokeWidth="0.5"
        opacity="0.5"
      />
      <path
        d="M98 36.5 L98.45 37.55 L99.5 38 L98.45 38.45 L98 39.5 L97.55 38.45 L96.5 38 L97.55 37.55 Z"
        fill="#924d66"
        stroke="#5c2e3e"
        strokeWidth="0.5"
        opacity="0.5"
      />
      <path
        d="M25 78.2 L25.54 79.46 L26.8 80 L25.54 80.54 L25 81.8 L24.46 80.54 L23.2 80 L24.46 79.46 Z"
        fill="#924d66"
        stroke="#5c2e3e"
        strokeWidth="0.5"
        opacity="0.5"
      />
      <path
        d="M90 73 L90.6 74.4 L92 75 L90.6 75.6 L90 77 L89.4 75.6 L88 75 L89.4 74.4 Z"
        fill="#924d66"
        stroke="#5c2e3e"
        strokeWidth="0.5"
        opacity="0.5"
      />
      <path
        d="M15 78 L95 78"
        stroke="url(#textGrad)"
        strokeWidth="2.5"
        opacity="0.5"
      />
      <circle cx="12" cy="25" r="1.2" fill="#924d66" opacity="0.4" />
      <circle cx="17" cy="25" r="1.2" fill="#924d66" opacity="0.4" />
      <circle cx="22" cy="25" r="1.2" fill="#924d66" opacity="0.4" />
      <path d="M20 48 L85 48 L83 52 L22 52 Z" fill="#c8a4b5" opacity="0.15" />
    </svg>
  );
};

export default SimaDarkIcon;
