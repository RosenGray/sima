const TruckIcon = () => {
  return (
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
<defs>
<linearGradient id="truckBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
<stop offset="0" stopColor="#3d7a3e"/>
<stop offset="0.5" stopColor="#2C5F2D"/>
<stop offset="1" stopColor="#1a3a1b"/>
</linearGradient>
<linearGradient id="truckWindowGrad" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
<stop offset="0" stopColor="#4facfe" stopOpacity="0.8"/>
<stop offset="1" stopColor="#2196f3" stopOpacity="0.6"/>
</linearGradient>
<radialGradient id="truckWheelGrad" gradientUnits="userSpaceOnUse">
<stop offset="0" stopColor="#4b5563"/>
<stop offset="0.6" stopColor="#374151"/>
<stop offset="1" stopColor="#1f2937"/>
</radialGradient>
</defs>
<circle cx="60" cy="60" r="58" fill="#2C5F2D" opacity="0.08"/>
<ellipse cx="60" cy="90" rx="52" ry="3" fill="#000000" opacity="0.2"/>
<path d="M65 52 L92 52 L94 62 L94 70 L65 70 Z" fill="url(#truckBodyGrad)" stroke="#1a3a1b" strokeWidth="1.5"/>
<path d="M25 68 L28 54 L35 48 L45 43 L60 43 L65 48 L65 70 L25 70 Z" fill="url(#truckBodyGrad)" stroke="#1a3a1b" strokeWidth="1.5"/>
<path d="M38 43 L42 35 L58 35 L62 43 Z" fill="url(#truckBodyGrad)" stroke="#1a3a1b" strokeWidth="1.5"/>
<path d="M40 41 L43 37 L52 37 L52 41 Z" fill="url(#truckWindowGrad)" stroke="#2196f3" strokeWidth="1"/>
<path d="M54 37 L58 37 L60 41 L54 41 Z" fill="url(#truckWindowGrad)" stroke="#2196f3" strokeWidth="1"/>
<path d="M75 52 L75 70" stroke="#1a3a1b" strokeWidth="1" opacity="0.5"/>
<path d="M85 52 L85 70" stroke="#1a3a1b" strokeWidth="1" opacity="0.5"/>
<circle cx="35" cy="78" r="12" fill="url(#truckWheelGrad)" stroke="#1f2937" strokeWidth="2"/>
<circle cx="35" cy="78" r="7" fill="#6b7280" stroke="#4b5563" strokeWidth="1.5"/>
<circle cx="35" cy="78" r="3" fill="#1f2937"/>
<circle cx="85" cy="78" r="12" fill="url(#truckWheelGrad)" stroke="#1f2937" strokeWidth="2"/>
<circle cx="85" cy="78" r="7" fill="#6b7280" stroke="#4b5563" strokeWidth="1.5"/>
<circle cx="85" cy="78" r="3" fill="#1f2937"/>
<ellipse cx="92" cy="58" rx="2" ry="2.5" fill="#fde047" stroke="#facc15" strokeWidth="0.5"/>
<path d="M87 62 L92 62" stroke="#1a3a1b" strokeWidth="1.5" opacity="0.6"/>
<path d="M87 64 L92 64" stroke="#1a3a1b" strokeWidth="1.5" opacity="0.6"/>
<path d="M87 66 L92 66" stroke="#1a3a1b" strokeWidth="1.5" opacity="0.6"/>
<rect x="48" y="56" width="5" height="2" rx="1" fill="#374151" stroke="#4b5563" strokeWidth="0.5"/>
<rect x="70" y="60" width="8" height="4" rx="1" fill="#dc2626" stroke="#991b1b" strokeWidth="0.5"/>
</svg>
  );
};

export default TruckIcon;
