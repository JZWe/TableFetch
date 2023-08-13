import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteSong as deleteSongApi } from '../../services/apiSong';

function useDeleteSong() {
  const queryClient = useQueryClient();

  const { mutate: deleteSong, isLoading } = useMutation({
    mutationFn: (id: number | string) => deleteSongApi(id),
    onSuccess: () => {
      toast.success('Song successfully deleted');
      queryClient.resetQueries();
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });

  return { isLoading, deleteSong };
}

export default useDeleteSong;
