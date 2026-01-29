interface ForFreeIconProps {
    width?: number;
    height?: number;
    viewBox?: {
        width: number;
        height: number;
    }
}
const ForFreeIcon = ({ width, height, viewBox = { width: 100, height: 100 } }: ForFreeIconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={`0 0 ${viewBox?.width} ${viewBox?.height}`} fill="none">
            <defs>
                <linearGradient id="dogGrad" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#fde68a" />
                    <stop offset="0.5" stop-color="#fbbf24" />
                    <stop offset="1" stop-color="#f59e0b" />
                </linearGradient>
                <linearGradient id="catGrad" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#c4b5fd" />
                    <stop offset="1" stop-color="#7c3aed" />
                </linearGradient>
                <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#6ee7b7" />
                    <stop offset="0.5" stop-color="#10b981" />
                    <stop offset="1" stop-color="#059669" />
                </linearGradient>
                <radialGradient id="heartGrad" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#f9a8d4" />
                    <stop offset="1" stop-color="#db2777" />
                </radialGradient>
                <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#d1fae5" stop-opacity="0.3" />
                    <stop offset="1" stop-color="#fce7f3" stop-opacity="0.4" />
                </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="58" fill="url(#bgGrad)" />
            <ellipse cx="60" cy="90" rx="45" ry="3" fill="#000000" opacity="0.2" />
            <circle cx="35" cy="52" r="15" fill="url(#dogGrad)" stroke="#f59e0b" stroke-width="1.5" />
            <path d="M25 44 C23 46 21 52 23 56 C25 54 27 50 27 46 Z" fill="#fbbf24" stroke="#f59e0b" stroke-width="1" />
            <path d="M45 44 C47 46 49 52 47 56 C45 54 43 50 43 46 Z" fill="#fbbf24" stroke="#f59e0b" stroke-width="1" />
            <ellipse cx="35" cy="57" rx="8" ry="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="0.8" />
            <circle cx="30" cy="50" r="2.5" fill="#1f2937" />
            <circle cx="29.5" cy="49.5" r="0.8" fill="#ffffff" />
            <circle cx="40" cy="50" r="2.5" fill="#1f2937" />
            <circle cx="39.5" cy="49.5" r="0.8" fill="#ffffff" />
            <ellipse cx="35" cy="56" rx="2" ry="1.5" fill="#1f2937" stroke="#111827" stroke-width="0.5" />
            <path d="M31 58 C33 60 37 60 39 58" fill="none" stroke="#f59e0b" stroke-width="1.2" />
            <ellipse cx="35" cy="60" rx="1.5" ry="2" fill="#f87171" stroke="#dc2626" stroke-width="0.5" />
            <circle cx="85" cy="52" r="13" fill="url(#catGrad)" stroke="#7c3aed" stroke-width="1.5" />
            <path d="M77 42 L74 36 L80 40 Z" fill="#a78bfa" stroke="#7c3aed" stroke-width="1" />
            <path d="M77 41 L76 38 L79 40 Z" fill="#f9a8d4" stroke="none" />
            <path d="M93 42 L96 36 L90 40 Z" fill="#a78bfa" stroke="#7c3aed" stroke-width="1" />
            <path d="M93 41 L94 38 L91 40 Z" fill="#f9a8d4" stroke="none" />
            <ellipse cx="81" cy="50" rx="1.5" ry="2.5" fill="#1f2937" />
            <ellipse cx="81" cy="50" rx="0.5" ry="1.5" fill="#22c55e" />
            <circle cx="80.7" cy="49" r="0.5" fill="#ffffff" />
            <ellipse cx="89" cy="50" rx="1.5" ry="2.5" fill="#1f2937" />
            <ellipse cx="89" cy="50" rx="0.5" ry="1.5" fill="#22c55e" />
            <circle cx="88.7" cy="49" r="0.5" fill="#ffffff" />
            <path d="M85 54 L83.5 52 L86.5 52 Z" fill="#f9a8d4" stroke="#ec4899" stroke-width="0.5" />
            <path d="M85 54 L85 56" fill="none" stroke="#7c3aed" stroke-width="1" />
            <path d="M85 56 C83 57 81 56 80 55" fill="none" stroke="#7c3aed" stroke-width="1" />
            <path d="M85 56 C87 57 89 56 90 55" fill="none" stroke="#7c3aed" stroke-width="1" />
            <path d="M79 50.0 L73 49.0" stroke="#7c3aed" stroke-width="0.5" />
            <path d="M79 51.5 L73 50.5" stroke="#7c3aed" stroke-width="0.5" />
            <path d="M79 53.0 L73 52.0" stroke="#7c3aed" stroke-width="0.5" />
            <path d="M91 50.0 L97 49.0" stroke="#7c3aed" stroke-width="0.5" />
            <path d="M91 51.5 L97 50.5" stroke="#7c3aed" stroke-width="0.5" />
            <path d="M91 53.0 L97 52.0" stroke="#7c3aed" stroke-width="0.5" />
            <path d="M60 22 L72.0 22.0 L76.62983158520316 28.888301782571617 Z" fill="#10b981" opacity="0.3" />
            <path d="M60 22 L68.48528137423857 30.485281374238568 L66.88830178257162 38.62983158520316 Z" fill="#10b981" opacity="0.3" />
            <path d="M60 22 L60.0 34.0 L53.11169821742838 38.62983158520316 Z" fill="#10b981" opacity="0.3" />
            <path d="M60 22 L51.51471862576143 30.48528137423857 L43.37016841479684 28.888301782571617 Z" fill="#10b981" opacity="0.3" />
            <path d="M60 22 L48.0 22.0 L43.37016841479684 15.111698217428387 Z" fill="#10b981" opacity="0.3" />
            <path d="M60 22 L51.51471862576143 13.51471862576143 L53.111698217428376 5.370168414796844 Z" fill="#10b981" opacity="0.3" />
            <path d="M60 22 L60.0 10.0 L66.88830178257162 5.37016841479684 Z" fill="#10b981" opacity="0.3" />
            <path d="M60 22 L68.48528137423857 13.514718625761429 L76.62983158520316 15.111698217428373 Z" fill="#10b981" opacity="0.3" />
            <circle cx="60" cy="22" r="14" fill="url(#badgeGrad)" stroke="#059669" stroke-width="2" />
            <circle cx="60" cy="22" r="11" fill="none" stroke="#ffffff" stroke-width="1.5" />
            <rect x="54" y="20" width="4" height="2" rx="0.5" fill="#ffffff" opacity="0.9" />
            <rect x="59" y="20" width="3" height="2" rx="0.5" fill="#ffffff" opacity="0.9" />
            <rect x="63" y="20" width="3" height="2" rx="0.5" fill="#ffffff" opacity="0.9" />
            <rect x="59" y="24" width="2" height="4" rx="1" fill="#ffffff" opacity="0.9" />
            <circle cx="60" cy="29" r="1" fill="#ffffff" opacity="0.9" />
            <path d="M60 88 C50 76 50 72 55 72 C58 74 60 76 60 78 C60 76 62 74 65 72 C70 72 70 76 60 88 Z" fill="url(#heartGrad)" stroke="#db2777" stroke-width="2" />
            <ellipse cx="58" cy="76" rx="2" ry="3" fill="#ffffff" opacity="0.4" />
            <path d="M45 74 C42 71 42 70 43.5 70 C45 70.5 45 71 45 72 C45 71 45 70.5 46.5 70 C48 70 48 71 45 74 Z" fill="#ec4899" stroke="#db2777" stroke-width="0.8" opacity="0.6" />
            <path d="M75 72 C72 69 72 68 73.5 68 C75 68.5 75 69 75 70 C75 69 75 68.5 76.5 68 C78 68 78 69 75 72 Z" fill="#ec4899" stroke="#db2777" stroke-width="0.8" opacity="0.6" />
            <path d="M30 42 C27 39 27 38 28.5 38 C30 38.5 30 39 30 40 C30 39 30 38.5 31.5 38 C33 38 33 39 30 42 Z" fill="#ec4899" stroke="#db2777" stroke-width="0.8" opacity="0.6" />
            <path d="M90 44 C87 41 87 40 88.5 40 C90 40.5 90 41 90 42 C90 41 90 40.5 91.5 40 C93 40 93 41 90 44 Z" fill="#ec4899" stroke="#db2777" stroke-width="0.8" opacity="0.6" />
            <ellipse cx="20" cy="28" rx="2.5" ry="3.5" fill="#92400e" opacity="0.3" />
            <circle cx="18.5" cy="25.5" r="1.2" fill="#92400e" opacity="0.3" />
            <circle cx="20" cy="25" r="1.2" fill="#92400e" opacity="0.3" />
            <circle cx="21.5" cy="25.5" r="1.2" fill="#92400e" opacity="0.3" />
            <ellipse cx="100" cy="30" rx="2.5" ry="3.5" fill="#92400e" opacity="0.3" />
            <circle cx="98.5" cy="27.5" r="1.2" fill="#92400e" opacity="0.3" />
            <circle cx="100" cy="27" r="1.2" fill="#92400e" opacity="0.3" />
            <circle cx="101.5" cy="27.5" r="1.2" fill="#92400e" opacity="0.3" />
            <path d="M25 58.5 L25.45 59.55 L26.5 60 L25.45 60.45 L25 61.5 L24.55 60.45 L23.5 60 L24.55 59.55 Z" fill="#fbbf24" stroke="#f59e0b" stroke-width="0.5" opacity="0.6" />
            <path d="M95 60.7 L95.39 61.61 L96.3 62 L95.39 62.39 L95 63.3 L94.61 62.39 L93.7 62 L94.61 61.61 Z" fill="#fbbf24" stroke="#f59e0b" stroke-width="0.5" opacity="0.6" />
            <path d="M60 38.8 L60.36 39.64 L61.2 40 L60.36 40.36 L60 41.2 L59.64 40.36 L58.8 40 L59.64 39.64 Z" fill="#fbbf24" stroke="#f59e0b" stroke-width="0.5" opacity="0.6" />
        </svg>
    );
};


export default ForFreeIcon;