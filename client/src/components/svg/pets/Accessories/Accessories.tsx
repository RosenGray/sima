interface AccessoriesIconProps {
    width?: number;
    height?: number;
    viewBox?: {
        width: number;
        height: number;
    }
}
const AccessoriesIcon = ({ width, height, viewBox = { width: 100, height: 100 } }: AccessoriesIconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={`0 0 ${viewBox?.width} ${viewBox?.height}`} fill="none">
            <defs>
                <linearGradient id="collarGrad" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#f87171" />
                    <stop offset="1" stopColor="#991b1b" />
                </linearGradient>
                <linearGradient id="bowlGrad" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#60a5fa" />
                    <stop offset="0.5" stopColor="#3b82f6" />
                    <stop offset="1" stopColor="#2563eb" />
                </linearGradient>
                <radialGradient id="ballGrad" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#fef3c7" />
                    <stop offset="0.5" stopColor="#fbbf24" />
                    <stop offset="1" stopColor="#f59e0b" />
                </radialGradient>
                <linearGradient id="boneGrad" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#fde68a" />
                </linearGradient>
                <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#dbeafe" stop-opacity="0.3" />
                    <stop offset="1" stopColor="#fef3c7" stop-opacity="0.4" />
                </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="58" fill="url(#bgGrad)" />
            <ellipse cx="60" cy="90" rx="45" ry="3" fill="#000000" opacity="0.2" />
            <circle cx="60" cy="30" r="18" fill="none" stroke="url(#collarGrad)" stroke-width="5" />
            <rect x="75" y="27" width="5" height="6" rx="1" fill="#9ca3af" stroke="#6b7280" stroke-width="1" />
            <circle cx="77.5" cy="30" r="1.5" fill="#4b5563" />
            <circle cx="60" cy="45" r="2" fill="none" stroke="#9ca3af" stroke-width="1.5" />
            <path d="M56 48 C56 46 57 45 58 45 L62 45 C63 45 64 46 64 48 C64 50 63 51 62 51 L58 51 C57 51 56 50 56 48 Z" fill="#d1d5db" stroke="#9ca3af" stroke-width="1.5" />
            <ellipse cx="60" cy="48" rx="1.5" ry="2" fill="#ec4899" opacity="0.7" />
            <circle cx="59" cy="46.5" r="0.6" fill="#ec4899" opacity="0.7" />
            <circle cx="61" cy="46.5" r="0.6" fill="#ec4899" opacity="0.7" />
            <path d="M20 75 L23 85 C25 87 30 88 35 88 C40 88 45 87 47 85 L50 75 Z" fill="url(#bowlGrad)" stroke="#2563eb" stroke-width="2" />
            <ellipse cx="35" cy="75" rx="15" ry="4" fill="#93c5fd" stroke="#2563eb" stroke-width="1.5" />
            <ellipse cx="35" cy="76" rx="12" ry="3" fill="#ffffff" opacity="0.6" />
            <ellipse cx="40" cy="80" rx="2" ry="2.5" fill="#ffffff" opacity="0.5" />
            <circle cx="38.5" cy="78" r="0.8" fill="#ffffff" opacity="0.5" />
            <circle cx="41.5" cy="78" r="0.8" fill="#ffffff" opacity="0.5" />
            <circle cx="85" cy="75" r="12" fill="url(#ballGrad)" stroke="#f59e0b" stroke-width="2" />
            <path d="M77 72 C81 69 89 69 93 72" fill="none" stroke="#ffffff" stroke-width="2" />
            <path d="M77 78 C81 81 89 81 93 78" fill="none" stroke="#ffffff" stroke-width="2" />
            <circle cx="81" cy="71" r="3" fill="#ffffff" opacity="0.4" />
            <path d="M15 50 C13 48 13 47 15 47 C17 47 17 48 18 50 L32 50 C33 48 33 47 35 47 C37 47 37 48 35 50 C37 52 37 53 35 53 C33 53 33 52 32 50 L18 50 C17 52 17 53 15 53 C13 53 13 52 15 50 Z" fill="url(#boneGrad)" stroke="#f59e0b" stroke-width="1.5" />
            <circle cx="20" cy="50" r="1" fill="#f59e0b" opacity="0.3" />
            <circle cx="25" cy="50" r="1" fill="#f59e0b" opacity="0.3" />
            <circle cx="30" cy="50" r="1" fill="#f59e0b" opacity="0.3" />
            <ellipse cx="95" cy="50" rx="5" ry="7" fill="#9ca3af" stroke="#6b7280" stroke-width="1" />
            <circle cx="92" cy="45" r="2.5" fill="#f9a8d4" stroke="#ec4899" stroke-width="0.8" />
            <circle cx="98" cy="45" r="2.5" fill="#f9a8d4" stroke="#ec4899" stroke-width="0.8" />
            <circle cx="93" cy="49" r="0.8" fill="#1f2937" />
            <circle cx="97" cy="49" r="0.8" fill="#1f2937" />
            <circle cx="95" cy="51" r="0.8" fill="#ec4899" />
            <path d="M95 57 C98 60 100 62 102 60" fill="none" stroke="#6b7280" stroke-width="1.5" />
            <path d="M42 25 C15 45 20 55 35 45" fill="none" stroke="#1e40af" stroke-width="2.5" opacity="0.4" />
            <rect x="40" y="23" width="3" height="4" rx="0.5" fill="#9ca3af" stroke="#6b7280" stroke-width="0.8" />
            <ellipse cx="50" cy="55" rx="2" ry="2.5" fill="#ec4899" opacity="0.2" />
            <circle cx="48.8" cy="53" r="0.8" fill="#ec4899" opacity="0.2" />
            <circle cx="50" cy="52.5" r="0.8" fill="#ec4899" opacity="0.2" />
            <circle cx="51.2" cy="53" r="0.8" fill="#ec4899" opacity="0.2" />
            <ellipse cx="70" cy="58" rx="2" ry="2.5" fill="#ec4899" opacity="0.2" />
            <circle cx="68.8" cy="56" r="0.8" fill="#ec4899" opacity="0.2" />
            <circle cx="70" cy="55.5" r="0.8" fill="#ec4899" opacity="0.2" />
            <circle cx="71.2" cy="56" r="0.8" fill="#ec4899" opacity="0.2" />
            <path d="M48 23.5 L48.45 24.55 L49.5 25 L48.45 25.45 L48 26.5 L47.55 25.45 L46.5 25 L47.55 24.55 Z" fill="#fbbf24" stroke="#f59e0b" stroke-width="0.5" opacity="0.6" />
            <path d="M72 26.7 L72.39 27.61 L73.3 28 L72.39 28.39 L72 29.3 L71.61 28.39 L70.7 28 L71.61 27.61 Z" fill="#fbbf24" stroke="#f59e0b" stroke-width="0.5" opacity="0.6" />
            <path d="M60 86.8 L60.36 87.64 L61.2 88 L60.36 88.36 L60 89.2 L59.64 88.36 L58.8 88 L59.64 87.64 Z" fill="#fbbf24" stroke="#f59e0b" stroke-width="0.5" opacity="0.6" />
        </svg>
    );
};


export default AccessoriesIcon;