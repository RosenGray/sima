interface CastratedMaleIconProps {
  width?: number;
  height?: number;
  viewBox?: {
    width: number;
    height: number;
  };
}

const CastratedMaleIcon = ({
  width,
  height,
  viewBox = { width: 120, height: 120 },
}: CastratedMaleIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${viewBox?.width} ${viewBox?.height}`}
      fill="none"
    >
      <circle cx="60" cy="60" r="58" fill="#dbeafe" opacity="0.3" />
      <rect
        x="52"
        y="45"
        width="16"
        height="30"
        rx="2"
        fill="#10b981"
        stroke="#059669"
        strokeWidth="2"
      />
      <rect
        x="45"
        y="52"
        width="30"
        height="16"
        rx="2"
        fill="#10b981"
        stroke="#059669"
        strokeWidth="2"
      />
      <circle cx="85" cy="40" r="8" fill="#3b82f6" stroke="#2563eb" strokeWidth="2" />
      <path d="M90 35 L95 30" fill="none" stroke="#2563eb" strokeWidth="2.5" />
      <path d="M95 30 L95 36" fill="none" stroke="#2563eb" strokeWidth="2.5" />
      <path d="M95 30 L89 30" fill="none" stroke="#2563eb" strokeWidth="2.5" />
      <path d="M52 60 L58 66 L68 54" fill="none" stroke="#ffffff" strokeWidth="3" />
    </svg>
  );
};

export default CastratedMaleIcon;
