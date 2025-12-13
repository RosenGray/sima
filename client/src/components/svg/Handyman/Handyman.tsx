interface HandymanIconProps {
  width?: number;
  height?: number;
  viewBox?: {
    width: number;
    height: number;
  }
}
const HandymanIcon = ({ width, height, viewBox = { width: 100, height: 100 } }: HandymanIconProps) => {
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
      id="hammerGrad"
      x1="0%"
      y1="0%"
      x2="0%"
      y2="100%"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" stopColor="#a8a29e" />
      <stop offset="0.5" stopColor="#94a3b8" />
      <stop offset="1" stopColor="#64748b" />
    </linearGradient>
    <linearGradient
      id="handleGrad"
      x1="0%"
      y1="0%"
      x2="0%"
      y2="100%"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" stopColor="#b45309" />
      <stop offset="1" stopColor="#78350f" />
    </linearGradient>
    <linearGradient
      id="wrenchGrad"
      x1="0%"
      y1="0%"
      x2="100%"
      y2="0%"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" stopColor="#fbbf24" />
      <stop offset="1" stopColor="#d97706" />
    </linearGradient>
    <linearGradient
      id="screwdriverGrad"
      x1="0%"
      y1="0%"
      x2="0%"
      y2="100%"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" stopColor="#f87171" />
      <stop offset="1" stopColor="#dc2626" />
    </linearGradient>
    <linearGradient
      id="toolboxGrad"
      x1="0%"
      y1="0%"
      x2="0%"
      y2="100%"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" stopColor="#60a5fa" />
      <stop offset="1" stopColor="#2563eb" />
    </linearGradient>
    <linearGradient
      id="bgGrad"
      x1="0%"
      y1="0%"
      x2="100%"
      y2="100%"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" stopColor="#f59e0b" stopOpacity="0.08" />
      <stop offset="1" stopColor="#3b82f6" stopOpacity="0.12" />
    </linearGradient>
  </defs>
  <circle cx="60" cy="60" r="58" fill="url(#bgGrad)" />
  <ellipse cx="60" cy="90" rx="45" ry="3" fill="#000000" opacity="0.2" />
  <rect
    x="35"
    y="70"
    width="50"
    height="20"
    rx="2"
    fill="url(#toolboxGrad)"
    stroke="#2563eb"
    strokeWidth="2"
  />
  <rect
    x="33"
    y="68"
    width="54"
    height="4"
    rx="1"
    fill="#2563eb"
    stroke="#1e40af"
    strokeWidth="1"
  />
  <path
    d="M50 68 C52 62 68 62 70 68"
    fill="none"
    stroke="#64748b"
    strokeWidth="3"
  />
  <rect
    x="58"
    y="70"
    width="4"
    height="3"
    rx="0.5"
    fill="#fbbf24"
    stroke="#f59e0b"
    strokeWidth="0.8"
  />
  <path d="M60 72 L60 90" stroke="#2563eb" strokeWidth="1" opacity="0.5" />
  <path d="M35 80 L85 80" stroke="#2563eb" strokeWidth="1" opacity="0.5" />
  <rect
    x="22"
    y="31"
    width="16"
    height="8"
    rx="1"
    fill="url(#hammerGrad)"
    stroke="#64748b"
    strokeWidth="1.5"
  />
  <path
    d="M38 33 L42 30 L44 31 L43 36 L40 38 L38 37 Z"
    fill="#94a3b8"
    stroke="#64748b"
    strokeWidth="1"
  />
  <rect
    x="28"
    y="33"
    width="4"
    height="40"
    rx="2"
    fill="url(#handleGrad)"
    stroke="#78350f"
    strokeWidth="1.2"
  />
  <path d="M28 40 L32 40" stroke="#78350f" strokeWidth="1" opacity="0.5" />
  <path d="M28 46 L32 46" stroke="#78350f" strokeWidth="1" opacity="0.5" />
  <path d="M28 52 L32 52" stroke="#78350f" strokeWidth="1" opacity="0.5" />
  <path d="M28 58 L32 58" stroke="#78350f" strokeWidth="1" opacity="0.5" />
  <path d="M28 64 L32 64" stroke="#78350f" strokeWidth="1" opacity="0.5" />
  <rect
    x="24"
    y="33"
    width="10"
    height="2"
    rx="0.5"
    fill="#ffffff"
    opacity="0.3"
  />
  <path
    d="M70 40 L73 40 L73 75 L70 75 Z"
    fill="url(#wrenchGrad)"
    stroke="#d97706"
    strokeWidth="1.5"
  />
  <path
    d="M67 40 L67 34 L70 34 L70 40 Z"
    fill="#f59e0b"
    stroke="#d97706"
    strokeWidth="1.5"
  />
  <path
    d="M73 40 L76 40 L76 34 L73 34 Z"
    fill="#f59e0b"
    stroke="#d97706"
    strokeWidth="1.5"
  />
  <rect
    x="66"
    y="75"
    width="11"
    height="8"
    rx="1"
    fill="#f59e0b"
    stroke="#d97706"
    strokeWidth="1.5"
  />
  <circle
    cx="71.5"
    cy="79"
    r="3"
    fill="none"
    stroke="#d97706"
    strokeWidth="1.2"
  />
  <rect
    x="70.5"
    y="45"
    width="1.5"
    height="25"
    rx="0.5"
    fill="#ffffff"
    opacity="0.3"
  />
  <rect
    x="89"
    y="30"
    width="2"
    height="25"
    fill="#94a3b8"
    stroke="#64748b"
    strokeWidth="1"
  />
  <path
    d="M89 30 L88 26 L92 26 L91 30 Z"
    fill="#64748b"
    stroke="#475569"
    strokeWidth="1"
  />
  <rect
    x="87"
    y="55"
    width="6"
    height="20"
    rx="3"
    fill="url(#screwdriverGrad)"
    stroke="#dc2626"
    strokeWidth="1.5"
  />
  <ellipse cx="90" cy="58" rx="3" ry="1.5" fill="#dc2626" opacity="0.3" />
  <ellipse cx="90" cy="63" rx="3" ry="1.5" fill="#dc2626" opacity="0.3" />
  <ellipse cx="90" cy="68" rx="3" ry="1.5" fill="#dc2626" opacity="0.3" />
  <ellipse
    cx="90"
    cy="75"
    rx="3"
    ry="2"
    fill="#991b1b"
    stroke="#7f1d1d"
    strokeWidth="1"
  />
  <rect x="89.7" y="32" width="0.6" height="20" fill="#ffffff" opacity="0.5" />
  <polygon
    points="51.0,55.0 49.5,57.598076211353316 46.5,57.598076211353316 45.0,55.0 46.5,52.401923788646684 49.5,52.401923788646684"
    fill="#94a3b8"
    stroke="#64748b"
    strokeWidth="1"
  />
  <circle cx="48" cy="55" r="1.5" fill="#64748b" />
  <circle
    cx="55"
    cy="62"
    r="2.5"
    fill="#94a3b8"
    stroke="#64748b"
    strokeWidth="1"
  />
  <path d="M53.5 62 L56.5 62" stroke="#64748b" strokeWidth="1" />
  <rect
    x="40"
    y="75"
    width="15"
    height="3"
    rx="0.5"
    fill="#fef3c7"
    stroke="#fbbf24"
    strokeWidth="0.8"
  />
  <path d="M41.0 75 L41.0 76.5" stroke="#92400e" strokeWidth="0.5" />
  <path d="M43.5 75 L43.5 76.5" stroke="#92400e" strokeWidth="0.5" />
  <path d="M46.0 75 L46.0 76.5" stroke="#92400e" strokeWidth="0.5" />
  <path d="M48.5 75 L48.5 76.5" stroke="#92400e" strokeWidth="0.5" />
  <path d="M51.0 75 L51.0 76.5" stroke="#92400e" strokeWidth="0.5" />
  <path d="M53.5 75 L53.5 76.5" stroke="#92400e" strokeWidth="0.5" />
  <path
    d="M42.0 21.0 L43.626946572303204 21.345818169429595 L43.0168416076895 22.716136355893497 L43.469463130731185 22.977457514062632 L44.35114100916989 21.76393202250021 L45.46410161513776 23.0 L45.97808758147309 24.581886146929385 L44.486304738420685 24.73867884183087 L44.486304738420685 25.26132115816913 L45.97808758147309 25.418113853070615 L45.46410161513776 27.0 L44.35114100916989 28.23606797749979 L43.469463130731185 27.022542485937368 L43.0168416076895 27.283863644106503 L43.626946572303204 28.654181830570405 L42.0 29.0 L40.373053427696796 28.654181830570405 L40.9831583923105 27.283863644106503 L40.530536869268815 27.022542485937368 L39.64885899083011 28.23606797749979 L38.53589838486224 27.0 L38.02191241852691 25.41811385307061 L39.513695261579315 25.26132115816913 L39.513695261579315 24.73867884183087 L38.02191241852691 24.58188614692939 L38.53589838486224 23.0 L39.64885899083011 21.76393202250021 L40.530536869268815 22.977457514062632 L40.9831583923105 22.716136355893497 L40.3730534276968 21.345818169429595 L42.0 21.0 Z"
    fill="#94a3b8"
    stroke="#64748b"
    strokeWidth="1"
  />
  <circle cx="42" cy="25" r="1.5" fill="#475569" />
</svg>
  );
};

export default HandymanIcon;
