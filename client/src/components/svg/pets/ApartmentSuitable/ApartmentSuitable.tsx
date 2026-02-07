interface ApartmentSuitableIconProps {
  width?: number;
  height?: number;
  viewBox?: {
    width: number;
    height: number;
  };
}

const ApartmentSuitableIcon = ({
  width,
  height,
  viewBox = { width: 120, height: 120 },
}: ApartmentSuitableIconProps) => {
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
        x="40"
        y="35"
        width="40"
        height="50"
        rx="2"
        fill="#60a5fa"
        stroke="#2563eb"
        strokeWidth="2"
      />
      <rect
        x="45"
        y="40"
        width="8"
        height="7"
        rx="1"
        fill="#fef3c7"
        stroke="#3b82f6"
        strokeWidth="1"
      />
      <rect
        x="57"
        y="40"
        width="8"
        height="7"
        rx="1"
        fill="#fef3c7"
        stroke="#3b82f6"
        strokeWidth="1"
      />
      <rect
        x="69"
        y="40"
        width="8"
        height="7"
        rx="1"
        fill="#fef3c7"
        stroke="#3b82f6"
        strokeWidth="1"
      />
      <rect
        x="45"
        y="51"
        width="8"
        height="7"
        rx="1"
        fill="#fef3c7"
        stroke="#3b82f6"
        strokeWidth="1"
      />
      <rect
        x="57"
        y="51"
        width="8"
        height="7"
        rx="1"
        fill="#fef3c7"
        stroke="#3b82f6"
        strokeWidth="1"
      />
      <rect
        x="69"
        y="51"
        width="8"
        height="7"
        rx="1"
        fill="#fef3c7"
        stroke="#3b82f6"
        strokeWidth="1"
      />
      <rect
        x="45"
        y="62"
        width="8"
        height="7"
        rx="1"
        fill="#fef3c7"
        stroke="#3b82f6"
        strokeWidth="1"
      />
      <rect
        x="57"
        y="62"
        width="8"
        height="7"
        rx="1"
        fill="#fef3c7"
        stroke="#3b82f6"
        strokeWidth="1"
      />
      <rect
        x="69"
        y="62"
        width="8"
        height="7"
        rx="1"
        fill="#fef3c7"
        stroke="#3b82f6"
        strokeWidth="1"
      />
      <rect
        x="45"
        y="73"
        width="8"
        height="7"
        rx="1"
        fill="#fef3c7"
        stroke="#3b82f6"
        strokeWidth="1"
      />
      <rect
        x="57"
        y="73"
        width="8"
        height="7"
        rx="1"
        fill="#fef3c7"
        stroke="#3b82f6"
        strokeWidth="1"
      />
      <rect
        x="69"
        y="73"
        width="8"
        height="7"
        rx="1"
        fill="#fef3c7"
        stroke="#3b82f6"
        strokeWidth="1"
      />
      <rect
        x="54"
        y="75"
        width="12"
        height="10"
        rx="1"
        fill="#92400e"
        stroke="#78350f"
        strokeWidth="1.5"
      />
      <rect
        x="38"
        y="32"
        width="44"
        height="4"
        fill="#1e40af"
        stroke="#1e3a8a"
        strokeWidth="1"
      />
      <circle cx="57" cy="44" r="3" fill="#d97706" stroke="#b45309" strokeWidth="0.8" />
      <ellipse cx="55" cy="42" rx="1.5" ry="2" fill="#f59e0b" />
      <ellipse cx="59" cy="42" rx="1.5" ry="2" fill="#f59e0b" />
    </svg>
  );
};

export default ApartmentSuitableIcon;
