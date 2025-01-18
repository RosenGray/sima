import React from "react";

const animation = `
        .svg-spinner {
          display: inline-block;
          animation: spin-and-scale 4s ease-in-out infinite;
        }

        @keyframes spin-and-scale {
          0% {
            transform: rotate(0deg) scale(0.8);
          }
          25% {
            transform: rotate(0deg) scale(1.05);
          }
          50% {
            transform: rotate(180deg) scale(1.1); /* Grow slightly */
          }
            75% {
            transform: rotate(0deg) scale(1.05);
          }
          100% {
            transform: rotate(360deg) scale(0.8); /* Return to original size */
          }
        }
`;

interface LoaderProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  background?: string;
  isSpin?: boolean;
  isSuccess?: boolean;
  backgroundGradient?: {
    colors: string[];
    angle?: number;
  };
}

const Loader: React.FC<LoaderProps> = ({
  width = 800,
  height = 600,
  className,
  background = "transparent",
  backgroundGradient,
  isSpin,
  isSuccess = false,
}) => {
  const getBackground = () => {
    return backgroundGradient ? `url(#backgroundGradient)` : background;
  };

  return (
    <>
      <style>{animation}</style>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 600"
        width={width}
        height={height}
        className={`${isSpin ? "svg-spinner" : ""} ${className}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {backgroundGradient && (
            <linearGradient
              id="backgroundGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
              gradientTransform={`rotate(${backgroundGradient?.angle || 45}, 0.5, 0.5)`}
            >
              {backgroundGradient.colors.map((color, index) => (
                <stop
                  key={index}
                  offset={`${(index / (backgroundGradient.colors.length - 1)) * 100}%`}
                  stopColor={color}
                />
              ))}
            </linearGradient>
          )}

          <linearGradient
            id="letterGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FF0000">
              <animate
                attributeName="stop-color"
                values="#FF0000; #FF00FF; #0000FF; #00FFFF; #00FF00; #FFFF00; #FF0000"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#00FF00">
              <animate
                attributeName="stop-color"
                values="#00FF00; #FF0000; #FF00FF; #0000FF; #00FFFF; #00FF00; #FFFF00"
                dur="10s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 10 -5"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background */}
        <rect width="100%" height="100%" fill={getBackground()} />

        {/* Animated circles */}
        <g transform="translate(400, 300)">
          {/* Outer rotating circle */}
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0"
              to="360"
              dur="10s"
              repeatCount="indefinite"
            />
            <circle
              r="150"
              fill="none"
              stroke="url(#letterGradient)"
              strokeWidth="4"
              filter="url(#glow)"
            >
              <animate
                attributeName="r"
                values="150;160;150"
                dur="4s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-width"
                values="4;6;4"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          {/* Inner rotating circle */}
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="360"
              to="0"
              dur="6s"
              repeatCount="indefinite"
            />
            <circle
              r="140"
              fill="none"
              stroke="url(#letterGradient)"
              strokeWidth="2"
              opacity="0.5"
            >
              <animate
                attributeName="r"
                values="140;145;140"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </g>

        {/* Letter S */}
        <g style={{ transform: "translate(50%, 50%)" }} filter="url(#glow)">
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0"
              to="360"
              dur="8s"
              repeatCount="indefinite"
            />
            {isSuccess ? (
              <path
                d="M-70 0 L-20 50 L70 -40"
                fill="none"
                stroke="#00FF00"
                strokeWidth="30"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <animate
                  attributeName="stroke-width"
                  values="30;35;30"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </path>
            ) : (
              <text
                x="0"
                y="0"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="250"
                fontFamily="Arial, sans-serif"
                fill="url(#letterGradient)"
                stroke="url(#letterGradient)"
                strokeWidth="2"
                fontStretch="extra-expanded"
              >
                S
                <animate
                  attributeName="stroke-width"
                  values="2;4;2"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </text>
            )}
          </g>
        </g>

        {/* Sparkles */}
        <g transform="translate(400, 300)">
          {[0, 60, 120, 180, 240, 300].map((angle, index) => (
            <circle
              key={index}
              cx={Math.cos((angle * Math.PI) / 180) * 170}
              cy={Math.sin((angle * Math.PI) / 180) * 170}
              r="3"
              fill="white"
            >
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur={`${1 + index * 0.2}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      </svg>
    </>
  );
};

export default Loader;
