interface TrainedIconProps {
  width?: number;
  height?: number;
  viewBox?: {
    width: number;
    height: number;
  };
}

const TrainedIcon = ({
  width,
  height,
  viewBox = { width: 120, height: 120 },
}: TrainedIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${viewBox?.width} ${viewBox?.height}`}
      fill="none"
    >
      <circle cx="60" cy="60" r="58" fill="#fef3c7" opacity="0.3" />
      <circle cx="60" cy="50" r="18" fill="#d97706" stroke="#b45309" strokeWidth="2" />
      <ellipse cx="48" cy="45" rx="6" ry="10" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
      <ellipse cx="72" cy="45" rx="6" ry="10" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
      <ellipse cx="60" cy="55" rx="8" ry="6" fill="#fde68a" stroke="#f59e0b" strokeWidth="1" />
      <circle cx="60" cy="80" r="12" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
      <circle cx="60" cy="80" r="9" fill="#fef3c7" stroke="#fbbf24" strokeWidth="1" />
      <path
        d="M60.0 75.0 L61.469463130731185 77.97745751406264 L64.75528258147577 78.45491502812526 L62.377641290737884 80.77254248593736 L62.93892626146236 84.04508497187474 L60.0 82.5 L57.06107373853764 84.04508497187474 L57.622358709262116 80.77254248593736 L55.24471741852423 78.45491502812527 L58.530536869268815 77.97745751406264 Z"
        fill="#f59e0b"
      />
      <rect x="57" y="68" width="6" height="10" fill="#ef4444" stroke="#dc2626" strokeWidth="1" />
    </svg>
  );
};

export default TrainedIcon;
