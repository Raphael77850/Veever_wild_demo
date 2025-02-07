import type { Params } from "react-router-dom";

export const providerLoader = async ({ params }: { params: Params }) => {
  const { id } = params;
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/chr/${id}`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      return null;
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
