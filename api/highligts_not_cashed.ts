import { endpoints, fetcher } from '@/utils/axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useHighlights = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['highlights'],
    queryFn: () => fetcher(endpoints.highlights.get), // Your endpoint for fetching highlights
    staleTime: 0, // Always considered stale, so refetch on mount
    gcTime: 1000 * 30, // Cache is garbage collected quickly (30 seconds)
  });

  return {
    ...query,
    // Function to force revalidation (manual refresh)
    revalidate: () => queryClient.invalidateQueries({ queryKey: ['highlights'] }),
  };
};

