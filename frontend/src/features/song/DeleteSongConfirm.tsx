import ConfirmDelete from '../../ui/ConfirmDelete';
import useDeleteSong from './useDeleteSong';

// 若包覆的外層有使用到 Modal 元件，就會透過 cloneElement 注入 onCloseModal
// 所以有可能會使用到 onCloseModal
function DeleteSongConfirm({
  id,
  name,
  onCloseModal,
}: {
  id: number | string;
  name: string;
  onCloseModal?: () => void;
}) {
  const { deleteSong, isLoading } = useDeleteSong();

  function onConfirm() {
    deleteSong(id, {
      onSuccess: () => {
        onCloseModal?.();
      },
    });
  }

  return (
    <ConfirmDelete
      resourceName={name}
      onConfirm={onConfirm}
      disabled={isLoading}
    />
  );
}

export default DeleteSongConfirm;
