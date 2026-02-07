interface DogFriendlyIconProps {
  width?: number;
  height?: number;
  viewBox?: {
    width: number;
    height: number;
  };
}

const DogFriendlyIcon = ({
  width,
  height,
  viewBox = { width: 120, height: 120 },
}: DogFriendlyIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${viewBox?.width} ${viewBox?.height}`}
      fill="none"
    >
      <circle cx="60" cy="60" r="58" fill="#fef3c7" opacity="0.3" />
      <circle cx="45" cy="55" r="14" fill="#d97706" stroke="#b45309" strokeWidth="1.5" />
      <ellipse cx="35" cy="50" rx="5" ry="8" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
      <ellipse cx="55" cy="50" rx="5" ry="8" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
      <ellipse cx="45" cy="60" rx="6" ry="4" fill="#fde68a" stroke="#f59e0b" strokeWidth="0.8" />
      <circle cx="75" cy="55" r="14" fill="#94a3b8" stroke="#64748b" strokeWidth="1.5" />
      <ellipse cx="65" cy="50" rx="5" ry="8" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
      <ellipse cx="85" cy="50" rx="5" ry="8" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
      <ellipse cx="75" cy="60" rx="6" ry="4" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="0.8" />
      <path
        d="M60 75 C56 68 52 67 50 68 C48 70 48 72 60 82 C72 72 72 70 70 68 C68 67 64 68 60 75 Z"
        fill="#ec4899"
        stroke="#db2777"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default DogFriendlyIcon;
