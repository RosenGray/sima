interface ChildFriendlyIconProps {
  width?: number;
  height?: number;
  viewBox?: {
    width: number;
    height: number;
  };
}

const ChildFriendlyIcon = ({
  width,
  height,
  viewBox = { width: 120, height: 120 },
}: ChildFriendlyIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${viewBox?.width} ${viewBox?.height}`}
      fill="none"
    >
      <circle cx="60" cy="60" r="58" fill="#fce7f3" opacity="0.3" />
      <circle cx="55" cy="45" r="10" fill="#fde68a" stroke="#f59e0b" strokeWidth="1.5" />
      <path
        d="M55 55 L45 75 L50 75 L55 60 L60 75 L65 75 L55 55 Z"
        fill="#3b82f6"
        stroke="#2563eb"
        strokeWidth="1.5"
      />
      <path d="M48 58 L40 62" stroke="#3b82f6" strokeWidth="3" />
      <path d="M62 58 L70 62" stroke="#3b82f6" strokeWidth="3" />
      <ellipse cx="75" cy="55" rx="8" ry="10" fill="#d97706" stroke="#b45309" strokeWidth="1.5" />
      <ellipse cx="75" cy="57" rx="3" ry="4" fill="#92400e" opacity="0.6" />
      <circle cx="73" cy="52" r="1.5" fill="#92400e" opacity="0.6" />
      <circle cx="77" cy="52" r="1.5" fill="#92400e" opacity="0.6" />
      <path
        d="M60 80 C55 72 50 70 47 72 C45 74 45 76 60 88 C75 76 75 74 73 72 C70 70 65 72 60 80 Z"
        fill="#ec4899"
        stroke="#db2777"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default ChildFriendlyIcon;
