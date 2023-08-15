import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { uploadSongs as uploadSongsApi } from '../../services/apiSong';
import { SongFormValues } from './types';

function useUploadSongs() {
  const queryClient = useQueryClient();

  const { mutate: uploadSongs, isLoading } = useMutation({
    mutationFn: ({ songs }: { songs: SongFormValues[] }) =>
      uploadSongsApi(songs),
    onSuccess: () => {
      toast.success('Successfully initialize songs');
      queryClient.resetQueries();
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });

  return { isLoading, uploadSongs };
}

export default useUploadSongs;
