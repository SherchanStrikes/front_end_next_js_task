import { useQuery, useQueryClient } from '@tanstack/react-query';

const getSample = async (key) => {
    const { pageNumber } = key.queryKey[1];
  
    if (pageNumber) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}products`
      );
      const data = await res.json();
      return data;
    }
  };

export const useSampleData = (data, pData) => {
    return useQuery(['sample', { pageNumber: pData }], getSample, {
      keepPreviousData: true,
      initialData: data,
    });
  };