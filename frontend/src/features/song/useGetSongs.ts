import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getSongs as getSongsApi } from '../../services/apiSong';

function useGetSongs() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));
  const levelFilter =
    !searchParams.get('level') || searchParams.get('level') === 'all'
      ? 'all'
      : Number(searchParams.get('level'));
  // Fetch current page
  const { isLoading, data, error } = useQuery({
    queryKey: ['songs', page, levelFilter],
    queryFn: () => getSongsApi({ page, levelFilter }),
  });

  const pageCount = data?.pageCount ?? 0;

  // Pre-fetch next page
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['songs', page + 1, levelFilter],
      queryFn: () => getSongsApi({ page: page + 1, levelFilter }),
    });

  // Pre-fetch previous page
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['songs', page - 1, levelFilter],
      queryFn: () => getSongsApi({ page: page - 1, levelFilter }),
    });

  return {
    isLoading,
    error,
    songs: data?.data,
    pageCount,
    count: data?.count ?? 0,
  };
}

export default useGetSongs;
