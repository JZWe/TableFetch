import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createSong as createSongApi } from '../../services/apiSong';
import { SongFormValues } from './types';

function useCreateSong() {
  const queryClient = useQueryClient();

  const { mutate: createSong, isLoading } = useMutation({
    mutationFn: ({ newSong }: { newSong: SongFormValues }) =>
      createSongApi(newSong),
    onSuccess: () => {
      toast.success('Song successfully created');
      queryClient.resetQueries();
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });

  return { isLoading, createSong };
}

export default useCreateSong;
