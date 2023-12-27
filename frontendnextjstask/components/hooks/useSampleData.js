import { useQuery, useQueryClient } from "@tanstack/react-query";

const getSample = async (key) => {
  const { id, category } = key.queryKey[1];
  
  if (id) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}products/${id}`
    );
    const data = await res.json();
    return data;
  }
  if (category) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}products/category/${category}`
    );
    const data = await res.json();
    return data;
  }
};


export const useSamplesData = (id, category) => {
  return useQuery({
    queryKey: ['sample', { id, category }],
    queryFn: getSample, 
    config: {
      keepPreviousData: true,
    },
  });
};
