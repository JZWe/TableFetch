import { useQuery } from '@tanstack/react-query';
import { getSong as getSongApi } from '../../services/apiSong';

function useGetSong(id: string | number) {
  // Fetch current page
  const { isLoading, data, error } = useQuery({
    queryKey: ['song', id],
    queryFn: () => getSongApi(id),
  });

  return {
    isLoading,
    error,
    song: data?.data,
  };
}

export default useGetSong;
