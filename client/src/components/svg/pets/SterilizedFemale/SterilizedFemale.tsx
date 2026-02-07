interface SterilizedFemaleIconProps {
  width?: number;
  height?: number;
  viewBox?: {
    width: number;
    height: number;
  };
}

const SterilizedFemaleIcon = ({
  width,
  height,
  viewBox = { width: 120, height: 120 },
}: SterilizedFemaleIconProps) => {
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
      <circle cx="85" cy="35" r="8" fill="#ec4899" stroke="#db2777" strokeWidth="2" />
      <path d="M85 43 L85 50" fill="none" stroke="#db2777" strokeWidth="2.5" />
      <path d="M80 48 L90 48" fill="none" stroke="#db2777" strokeWidth="2.5" />
      <path d="M52 60 L58 66 L68 54" fill="none" stroke="#ffffff" strokeWidth="3" />
    </svg>
  );
};

export default SterilizedFemaleIcon;
