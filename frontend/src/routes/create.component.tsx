import React, { useState } from "react";

import { useNavigate } from "@tanstack/react-router";

import { useMutation } from "@tanstack/react-query";

import { useForm } from "@tanstack/react-form";

import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";

const MilkType = z.object({
  type: z.string().min(3).max(100),
  rating: z.number().min(0).max(5),
});
type MilkType = z.infer<typeof MilkType>;

export const component = function CreatePage() {
  const form = useForm({
    defaultValues: {
      type: "",
      rating: 0,
    },
    onSubmit: async ({ value }) => {
      // wait
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await mutateAsync(value);
      navigate({ to: "/" });
    },
    validatorAdapter: zodValidator,
  });

  const { error, isPending, mutateAsync } = useMutation({
    mutationKey: ["create-milk"],
    mutationFn: async ({ type, rating }: MilkType) => {
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

  return (
    <>
      {error && <p className="text-red-500">Error: try again later</p>}

      <form.Provider>
        <form
          className="mt-10 flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <form.Field
            name="type"
            validators={{
              onChange: MilkType.shape.type,
            }}
            children={(field) => (
              <>
                <label className="block mb-2">Type</label>
                <input
                  className="border border-gray-400 rounded px-2 py-1 mb-4"
                  type="text"
                  placeholder="Type"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors && (
                  <em role="alert">{field.state.meta.errors.join(", ")}</em>
                )}
              </>
            )}
          />

          <form.Field
            name="rating"
            validators={{
              onChange: MilkType.shape.rating,
            }}
            children={(field) => (
              <>
                <label className="block mb-2">Rating</label>
                <input
                  className="border border-gray-400 rounded px-2 py-1 mb-4"
                  type="number"
                  placeholder="Rating"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
                {field.state.meta.errors && (
                  <em role="alert">{field.state.meta.errors.join(", ")}</em>
                )}
              </>
            )}
          />

          {/* <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={isPending}
          >
            {isPending ? "..." : "Create"}
          </button> */}

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                type="submit"
                disabled={!canSubmit || isSubmitting}
              >
                {isSubmitting ? "..." : "Submit"}
              </button>
            )}
          ></form.Subscribe>
        </form>
      </form.Provider>
    </>
  );
};
