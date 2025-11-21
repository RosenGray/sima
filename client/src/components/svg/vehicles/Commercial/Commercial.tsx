const CommercialCarIcon = () => {
  return (
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
<defs>
<linearGradient id="vanBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
<stop offset="0" stopColor="#fbbf24"/>
<stop offset="0.5" stopColor="#f59e0b"/>
<stop offset="1" stopColor="#d97706"/>
</linearGradient>
<radialGradient id="vanWheelGrad" gradientUnits="userSpaceOnUse">
<stop offset="0" stopColor="#4b5563"/>
<stop offset="1" stopColor="#1f2937"/>
</radialGradient>
</defs>
<circle cx="60" cy="60" r="58" fill="#f59e0b" opacity="0.08"/>
<ellipse cx="60" cy="88" rx="48" ry="3" fill="#000000" opacity="0.2"/>
<path d="M45 45 L92 45 C94 47 95 50 95 53 L95 70 L45 70 Z" fill="url(#vanBodyGrad)" stroke="#d97706" strokeWidth="1.5"/>
<path d="M25 68 L28 52 L35 46 L43 43 L48 43 L48 70 L25 70 Z" fill="url(#vanBodyGrad)" stroke="#d97706" strokeWidth="1.5"/>
<path d="M35 43 C36 38 38 35 40 33 L46 33 L48 38 L48 43 Z" fill="url(#vanBodyGrad)" stroke="#d97706" strokeWidth="1.5"/>
<path d="M37 41 L40 35 L46 35 L46 41 Z" fill="#4facfe" stroke="#2196f3" strokeWidth="1" opacity="0.7"/>
<rect x="52" y="48" width="18" height="20" rx="2" fill="#fbbf24" stroke="#d97706" strokeWidth="1" opacity="0.3"/>
<rect x="72" y="48" width="18" height="20" rx="2" fill="#fbbf24" stroke="#d97706" strokeWidth="1" opacity="0.3"/>
<circle cx="69" cy="58" r="1.5" fill="#374151"/>
<circle cx="89" cy="58" r="1.5" fill="#374151"/>
<circle cx="38" cy="76" r="9" fill="url(#vanWheelGrad)" stroke="#1f2937" strokeWidth="1.5"/>
<circle cx="38" cy="76" r="5" fill="#6b7280"/>
<circle cx="82" cy="76" r="9" fill="url(#vanWheelGrad)" stroke="#1f2937" strokeWidth="1.5"/>
<circle cx="82" cy="76" r="5" fill="#6b7280"/>
<circle cx="90" cy="56" r="2" fill="#fde047" stroke="#facc15" strokeWidth="0.5"/>
<rect x="60" y="52" width="12" height="8" rx="1" fill="#ffffff" stroke="#d97706" strokeWidth="1"/>
</svg>
  );
};

export default CommercialCarIcon;
