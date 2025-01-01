import Loader from "@/components/Loader/Loader"; // Adjust the path as needed

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
interface LoadingProps {
  width?: number;
  height?: number;
}
export default function Loading({ width, height }: LoadingProps) {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <Loader width={width} height={height} className="svg-spinner" />
      <style>{animation}</style>
    </div>
  );
}
