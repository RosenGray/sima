interface JobOfferIconProps {
    width?: number;
    height?: number;
    viewBox?: {
        width: number;
        height: number;
    }
}
const JobOfferIcon = ({ width, height, viewBox = { width: 100, height: 100 } }: JobOfferIconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={`0 0 ${viewBox?.width} ${viewBox?.height}`} fill="none">
            <defs>
                <linearGradient id="docGrad" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#f9fafb" />
                </linearGradient>
                <linearGradient id="highlightGrad" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#fef3c7" />
                    <stop offset="0.5" stopColor="#fbbf24" />
                    <stop offset="1" stopColor="#f59e0b" />
                </linearGradient>
                <linearGradient id="handshakeGrad" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#fde68a" />
                    <stop offset="1" stopColor="#f59e0b" />
                </linearGradient>
                <radialGradient id="sealGrad" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#f87171" />
                    <stop offset="1" stopColor="#dc2626" />
                </radialGradient>
                <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#3b82f6" stop-opacity="0.08" />
                    <stop offset="1" stopColor="#fbbf24" stop-opacity="0.12" />
                </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="58" fill="url(#bgGrad)" />
            <ellipse cx="60" cy="90" rx="40" ry="3" fill="#000000" opacity="0.2" />
            <rect x="35" y="25" width="50" height="60" rx="3" fill="url(#docGrad)" stroke="#d1d5db" stroke-width="2" />
            <path d="M77 25 L85 25 L85 33 Z" fill="#e5e7eb" stroke="#d1d5db" stroke-width="1" />
            <path d="M77 25 L77 33 L85 33" stroke="#d1d5db" stroke-width="1" />
            <rect x="40" y="30" width="40" height="8" rx="1" fill="url(#highlightGrad)" stroke="#f59e0b" stroke-width="0.8" />
            <rect x="43" y="32" width="12" height="2" rx="0.5" fill="#92400e" opacity="0.7" />
            <rect x="57" y="32" width="14" height="2" rx="0.5" fill="#92400e" opacity="0.7" />
            <rect x="40" y="43" width="30" height="1.5" rx="0.5" fill="#6b7280" opacity="0.5" />
            <rect x="40" y="47" width="40" height="1.5" rx="0.5" fill="#6b7280" opacity="0.5" />
            <rect x="40" y="51" width="40" height="1.5" rx="0.5" fill="#6b7280" opacity="0.5" />
            <rect x="40" y="55" width="40" height="1.5" rx="0.5" fill="#6b7280" opacity="0.5" />
            <rect x="40" y="59" width="40" height="1.5" rx="0.5" fill="#6b7280" opacity="0.5" />
            <rect x="40" y="63" width="40" height="1.5" rx="0.5" fill="#6b7280" opacity="0.5" />
            <rect x="40" y="67" width="40" height="1.5" rx="0.5" fill="#6b7280" opacity="0.5" />
            <rect x="40" y="71" width="40" height="1.5" rx="0.5" fill="#6b7280" opacity="0.5" />
            <rect x="40" y="75" width="30" height="1.5" rx="0.5" fill="#6b7280" opacity="0.5" />
            <rect x="40" y="59" width="40" height="3" rx="0.5" fill="#fbbf24" opacity="0.3" />
            <path d="M43 57 L43 63" fill="none" stroke="#f59e0b" stroke-width="2" />
            <path d="M41 58 C40 58 39 59 39 60 C39 61 41 62 43 62" fill="none" stroke="#f59e0b" stroke-width="1.5" />
            <circle cx="70" cy="77" r="5" fill="#10b981" stroke="#059669" stroke-width="1.2" />
            <path d="M68 77 L69 79 L72 75" fill="none" stroke="#ffffff" stroke-width="2" />
            <path d="M25 35 L28 35 L28 43 L26 45 L24 45 L24 43 Z" fill="url(#handshakeGrad)" stroke="#f59e0b" stroke-width="1" />
            <path d="M35 35 L38 35 L38 43 L38 45 L36 45 L36 43 Z" fill="#fde047" stroke="#eab308" stroke-width="1" />
            <rect x="28" y="38" width="7" height="5" fill="#fcd34d" stroke="#f59e0b" stroke-width="0.8" />
            <path d="M26 39 L27 39" stroke="#f59e0b" stroke-width="0.8" />
            <path d="M36 39 L37 39" stroke="#eab308" stroke-width="0.8" />
            <path d="M26 41 L27 41" stroke="#f59e0b" stroke-width="0.8" />
            <path d="M36 41 L37 41" stroke="#eab308" stroke-width="0.8" />
            <circle cx="90" cy="75" r="8" fill="url(#sealGrad)" stroke="#dc2626" stroke-width="1.5" />
            <circle cx="90" cy="75" r="5" fill="none" stroke="#ffffff" stroke-width="1" />
            <path d="M88 75 L89 77 L92 73" fill="none" stroke="#ffffff" stroke-width="1.5" />
            <path d="M87 83 L88 89 L90 87 L89 83 Z" fill="#dc2626" opacity="0.7" />
            <path d="M93 83 L92 89 L90 87 L91 83 Z" fill="#ef4444" opacity="0.7" />
            <rect x="20" y="75" width="3" height="18" rx="1.5" fill="#3b82f6" stroke="#2563eb" stroke-width="1" />
            <path d="M23 79 C25 79 26 80 25 82" fill="none" stroke="#60a5fa" stroke-width="1" />
            <path d="M20 93 L21.5 96 L23 93 Z" fill="#94a3b8" stroke="#64748b" stroke-width="0.8" />
            <rect x="20" y="75" width="3" height="3" fill="#1e40af" stroke="#1e3a8a" stroke-width="0.8" />
            <path d="M40 81 L65 81" stroke="#6b7280" stroke-width="1" opacity="0.6" />
            <path d="M43 79 C47 77 51 80 55 78 C57 77 59 79 61 78" fill="none" stroke="#2563eb" stroke-width="1.2" />
            <path d="M95 28 L95.6 29.4 L97 30 L95.6 30.6 L95 32 L94.4 30.6 L93 30 L94.4 29.4 Z" fill="#fbbf24" stroke="#f59e0b" stroke-width="0.5" opacity="0.7" />
            <path d="M28 18.5 L28.45 19.55 L29.5 20 L28.45 20.45 L28 21.5 L27.55 20.45 L26.5 20 L27.55 19.55 Z" fill="#fbbf24" stroke="#f59e0b" stroke-width="0.5" opacity="0.7" />
            <path d="M88 48.2 L88.54 49.46 L89.8 50 L88.54 50.54 L88 51.8 L87.46 50.54 L86.2 50 L87.46 49.46 Z" fill="#fbbf24" stroke="#f59e0b" stroke-width="0.5" opacity="0.7" />
        </svg>
    );
};


export default JobOfferIcon;