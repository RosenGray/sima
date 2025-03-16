"use client";

const Dummy = ({ professionals }: { professionals: any[] }) => {
  return (
    <div>
      {professionals.map((professional) => (
        <div key={professional.id}>{professional.id}</div>
      ))}
    </div>
  );
};

export default Dummy;
