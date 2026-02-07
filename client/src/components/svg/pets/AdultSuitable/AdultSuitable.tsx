interface AdultSuitableIconProps {
  width?: number;
  height?: number;
  viewBox?: {
    width: number;
    height: number;
  };
}

const AdultSuitableIcon = ({
  width,
  height,
  viewBox = { width: 120, height: 120 },
}: AdultSuitableIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${viewBox?.width} ${viewBox?.height}`}
      fill="none"
    >
      <circle cx="60" cy="60" r="58" fill="#f3e8ff" opacity="0.3" />
      <circle cx="60" cy="40" r="12" fill="#fde68a" stroke="#f59e0b" strokeWidth="2" />
      <path
        d="M60 52 L45 75 L50 75 L60 60 L70 75 L75 75 L60 52 Z"
        fill="#1f2937"
        stroke="#111827"
        strokeWidth="2"
      />
      <path
        d="M54 52 L52 58 L58 58 L60 54 L62 58 L68 58 L66 52 Z"
        fill="#ffffff"
        stroke="#e5e7eb"
        strokeWidth="1"
      />
      <path
        d="M60 54 L58 56 L58 68 L60 70 L62 68 L62 56 Z"
        fill="#dc2626"
        stroke="#991b1b"
        strokeWidth="1"
      />
      <circle cx="80" cy="70" r="10" fill="#d97706" stroke="#b45309" strokeWidth="1.5" />
      <ellipse cx="75" cy="66" rx="4" ry="6" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
      <ellipse cx="85" cy="66" rx="4" ry="6" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
      <path d="M70 75 L75 72" fill="none" stroke="#ec4899" strokeWidth="2" />
    </svg>
  );
};

export default AdultSuitableIcon;
