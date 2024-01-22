export type Milk = {
  id: number;
  type: string;
  rating: number;
  createdAt: string;
};

export async function getMilks({
  starRating,
}: {
  starRating?: number;
}): Promise<Milk[]> {
  const url = new URL("/api/Milks", window.location.origin);
  if (starRating !== undefined) {
    url.searchParams.append("starRating", starRating.toString());
  }
  const result = await fetch(url);
  if (!result.ok) {
    throw new Error("Error fetching milks");
  }
  const data: Milk[] = await result.json();
  return data;
}
