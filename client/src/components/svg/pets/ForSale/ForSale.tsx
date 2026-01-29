interface ForSaleIconProps {
    width?: number;
    height?: number;
    viewBox?: {
        width: number;
        height: number;
    }
}
const ForSaleIcon = ({ width, height, viewBox = { width: 100, height: 100 } }: ForSaleIconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={`0 0 ${viewBox?.width} ${viewBox?.height}`} fill="none">
            <defs>
                <linearGradient id="dogGrad" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#fbbf24" />
                    <stop offset="0.5" stop-color="#f59e0b" />
                    <stop offset="1" stop-color="#d97706" />
                </linearGradient>
                <linearGradient id="catGrad" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#cbd5e1" />
                    <stop offset="1" stop-color="#64748b" />
                </linearGradient>
                <linearGradient id="tagGrad" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#fef3c7" />
                    <stop offset="0.5" stop-color="#fbbf24" />
                    <stop offset="1" stop-color="#f59e0b" />
                </linearGradient>
                <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#fef3c7" stop-opacity="0.3" />
                    <stop offset="1" stop-color="#fde68a" stop-opacity="0.4" />
                </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="58" fill="url(#bgGrad)" />
            <ellipse cx="60" cy="90" rx="45" ry="3" fill="#000000" opacity="0.2" />
            <circle cx="35" cy="50" r="15" fill="url(#dogGrad)" stroke="#d97706" stroke-width="1.5" />
            <path d="M25 42 C23 44 21 50 23 54 C25 52 27 48 27 44 Z" fill="#f59e0b" stroke="#d97706" stroke-width="1" />
            <path d="M45 42 C47 44 49 50 47 54 C45 52 43 48 43 44 Z" fill="#f59e0b" stroke="#d97706" stroke-width="1" />
            <ellipse cx="35" cy="55" rx="8" ry="6" fill="#fef3c7" stroke="#d97706" stroke-width="0.8" />
            <circle cx="30" cy="48" r="2.5" fill="#1f2937" />
            <circle cx="29.5" cy="47.5" r="0.8" fill="#ffffff" />
            <circle cx="40" cy="48" r="2.5" fill="#1f2937" />
            <circle cx="39.5" cy="47.5" r="0.8" fill="#ffffff" />
            <ellipse cx="35" cy="54" rx="2" ry="1.5" fill="#1f2937" stroke="#111827" stroke-width="0.5" />
            <path d="M31 56 C33 58 37 58 39 56" fill="none" stroke="#d97706" stroke-width="1.2" />
            <ellipse cx="35" cy="58" rx="1.5" ry="2" fill="#f87171" stroke="#dc2626" stroke-width="0.5" />
            <circle cx="85" cy="50" r="13" fill="url(#catGrad)" stroke="#64748b" stroke-width="1.5" />
            <path d="M77 40 L74 34 L80 38 Z" fill="#94a3b8" stroke="#64748b" stroke-width="1" />
            <path d="M77 39 L76 36 L79 38 Z" fill="#f9a8d4" stroke="none" />
            <path d="M93 40 L96 34 L90 38 Z" fill="#94a3b8" stroke="#64748b" stroke-width="1" />
            <path d="M93 39 L94 36 L91 38 Z" fill="#f9a8d4" stroke="none" />
            <ellipse cx="81" cy="48" rx="1.5" ry="2.5" fill="#1f2937" />
            <ellipse cx="81" cy="48" rx="0.5" ry="1.5" fill="#22c55e" />
            <circle cx="80.7" cy="47" r="0.5" fill="#ffffff" />
            <ellipse cx="89" cy="48" rx="1.5" ry="2.5" fill="#1f2937" />
            <ellipse cx="89" cy="48" rx="0.5" ry="1.5" fill="#22c55e" />
            <circle cx="88.7" cy="47" r="0.5" fill="#ffffff" />
            <path d="M85 52 L83.5 50 L86.5 50 Z" fill="#f9a8d4" stroke="#ec4899" stroke-width="0.5" />
            <path d="M85 52 L85 54" fill="none" stroke="#64748b" stroke-width="1" />
            <path d="M85 54 C83 55 81 54 80 53" fill="none" stroke="#64748b" stroke-width="1" />
            <path d="M85 54 C87 55 89 54 90 53" fill="none" stroke="#64748b" stroke-width="1" />
            <path d="M79 48.0 L73 47.0" stroke="#64748b" stroke-width="0.5" />
            <path d="M79 49.5 L73 48.5" stroke="#64748b" stroke-width="0.5" />
            <path d="M79 51.0 L73 50.0" stroke="#64748b" stroke-width="0.5" />
            <path d="M91 48.0 L97 47.0" stroke="#64748b" stroke-width="0.5" />
            <path d="M91 49.5 L97 48.5" stroke="#64748b" stroke-width="0.5" />
            <path d="M91 51.0 L97 50.0" stroke="#64748b" stroke-width="0.5" />
            <path d="M50 20 L70 20 L70 32 L74 36 L70 40 L50 40 L50 32 L46 36 Z" fill="url(#tagGrad)" stroke="#f59e0b" stroke-width="1.5" />
            <circle cx="60" cy="24" r="2" fill="#ffffff" stroke="#f59e0b" stroke-width="0.8" />
            <rect x="53" y="30" width="6" height="2" rx="0.5" fill="#dc2626" opacity="0.8" />
            <rect x="60" y="30" width="7" height="2" rx="0.5" fill="#dc2626" opacity="0.8" />
            <path d="M56 34 L56 38" fill="none" stroke="#dc2626" stroke-width="2" />
            <path d="M54 35 C53 35 53 36 55 36 C57 36 57 37 55 37" fill="none" stroke="#dc2626" stroke-width="1.5" />
            <circle cx="63" cy="34" r="1.5" fill="#dc2626" opacity="0.7" />
            <circle cx="66" cy="37" r="1.5" fill="#dc2626" opacity="0.7" />
            <path d="M62 35 L67 36" stroke="#dc2626" stroke-width="1.2" opacity="0.7" />
            <ellipse cx="25" cy="85" rx="3" ry="4" fill="#92400e" opacity="0.4" />
            <circle cx="23" cy="82" r="1.5" fill="#92400e" opacity="0.4" />
            <circle cx="25" cy="81" r="1.5" fill="#92400e" opacity="0.4" />
            <circle cx="27" cy="82" r="1.5" fill="#92400e" opacity="0.4" />
            <ellipse cx="95" cy="85" rx="3" ry="4" fill="#92400e" opacity="0.4" />
            <circle cx="93" cy="82" r="1.5" fill="#92400e" opacity="0.4" />
            <circle cx="95" cy="81" r="1.5" fill="#92400e" opacity="0.4" />
            <circle cx="97" cy="82" r="1.5" fill="#92400e" opacity="0.4" />
            <path d="M50 78 C46 74 46 72 48 72 C50 73 50 74 50 75 C50 74 50 73 52 72 C54 72 54 74 50 78 Z" fill="#ec4899" stroke="#db2777" stroke-width="0.8" opacity="0.6" />
            <path d="M70 78 C66 74 66 72 68 72 C70 73 70 74 70 75 C70 74 70 73 72 72 C74 72 74 74 70 78 Z" fill="#ec4899" stroke="#db2777" stroke-width="0.8" opacity="0.6" />
            <path d="M20 28.5 L20.45 29.55 L21.5 30 L20.45 30.45 L20 31.5 L19.55 30.45 L18.5 30 L19.55 29.55 Z" fill="#fbbf24" stroke="#f59e0b" stroke-width="0.5" opacity="0.7" />
            <path d="M100 33.7 L100.39 34.61 L101.3 35 L100.39 35.39 L100 36.3 L99.61 35.39 L98.7 35 L99.61 34.61 Z" fill="#fbbf24" stroke="#f59e0b" stroke-width="0.5" opacity="0.7" />
        </svg>
    );
};


export default ForSaleIcon;