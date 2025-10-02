import Loader from "@/components/Loader/Loader";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Loader size="xlarge" />
    </div>
  );
}
