import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { editSong as editSongApi } from '../../services/apiSong';
import { SongFormValues } from './types';

function useEditSong() {
  const queryClient = useQueryClient();

  const { mutate: editSong, isLoading } = useMutation({
    mutationFn: ({
      newSong,
      id,
    }: {
      newSong: SongFormValues;
      id: number | string;
    }) => editSongApi(newSong, id),
    onSuccess: () => {
      toast.success('Song successfully updated');
      queryClient.resetQueries();
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });

  return { isLoading, editSong };
}

export default useEditSong;
