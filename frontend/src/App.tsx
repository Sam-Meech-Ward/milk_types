import { useEffect, useState } from "react";

type Milk = {
  id: number;
  type: string;
  rating: number;
  createdAt: string;
};

export default function App() {
  const [milks, setMilks] = useState<Milk[]>([]);

  useEffect(() => {
    async function fetchMilks() {
      const result = await fetch("/api/Milks");
      const data: Milk[] = await result.json();
      setMilks(data);
    }

    fetchMilks();

    return () => {
      // cleanup
    };
  }, []);

  return (
    <div className="m-4">
      <h1 className="text-4xl mb-10">Milks</h1>
      {milks.map((milk) => (
        <div key={milk.id}>
          <h2 className="text-2xl">{milk.type}</h2>
          <p>Rating: {milk.rating}</p>
          <p>Created At: {milk.createdAt}</p>
        </div>
      ))}
    </div>
  );
}
