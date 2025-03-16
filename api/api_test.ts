import { endpoints, fetcher } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => fetcher(endpoints.auth.me),
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
    gcTime: 1000 * 60 * 30, // Keep cache for 30 minutes (was cacheTime)
  });
};

