import React, { useState } from "react";

import { useNavigate } from "@tanstack/react-router";

import { useMutation } from "@tanstack/react-query";

export const component = function CreatePage() {
  const [type, setType] = useState("");
  const [rating, setRating] = useState(0);

  const { error, isPending, mutateAsync } = useMutation({
    mutationKey: ["create-milk"],
    mutationFn: async () => {
      const response = await fetch("/api/milks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, rating }),
      });
      return response.json();
    },
  });

  const navigate = useNavigate({ from: "create" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await mutateAsync();

    navigate({ to: "/" });
  };

  return (
    <>
      {error && <p className="text-red-500">Error: try again later</p>}
      <form className="mt-10 flex flex-col" onSubmit={handleSubmit}>
        <label className="block mb-2">Type</label>
        <input
          className="border border-gray-400 rounded px-2 py-1 mb-4"
          type="text"
          placeholder="Type"
          value={type}
          onChange={(event) => setType(event.target.value)}
        />

        <label className="block mb-2">Rating</label>
        <input
          className="border border-gray-400 rounded px-2 py-1 mb-4"
          type="number"
          placeholder="Rating"
          value={rating}
          onChange={(event) => setRating(Number(event.target.value))}
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={isPending}
        >
          {isPending ? "..." : "Create"}
        </button>
      </form>
    </>
  );
};