import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";

import { getMilks } from "../network";

export const component = function Home() {
  const {
    isPending,
    error,
    data: milks,
  } = useQuery({
    gcTime: Infinity,
    queryKey: ["get-all-milks"],
    queryFn: () => getMilks({starRating: 0}),
  });

  // const [milks, setMilks] = useState<Milk[]>([]);

  // useEffect(() => {
  //   const abortController = new AbortController();
  //   async function fetchMilks() {
  //     try {
  //       const milks = await getMilks(abortController);
  //       setMilks(milks);
  //     } catch (error) {
  //       if (error instanceof Error && error.name === "AbortError") {
  //         return;
  //       }
  //       alert("Error fetching milks");
  //     }
  //   }

  //   fetchMilks();

  //   return () => {
  //     // cleanup
  //     abortController.abort();
  //   };
  // }, []);

  return (
    <div className="m-4">
      <h1 className="text-4xl mb-10">Milks</h1>
      {isPending ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: try again later</p>
      ) : (
        milks.map((milk) => (
          <div key={milk.id}>
            <h2 className="text-2xl">{milk.type}</h2>
            <p>Rating: {milk.rating}</p>
            <p>Created At: {milk.createdAt}</p>
          </div>
        ))
      )}
    </div>
  );
};
