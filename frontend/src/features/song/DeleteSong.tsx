import { HiTrash } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import ButtonIcon from '../../ui/ButtonIcon';
import DeleteSongConfirm from './DeleteSongConfirm';

function DeleteSong({ id, name }: { id: number | string; name: string }) {
  return (
    <Modal>
      <Modal.Open opens="song-deletion">
        <ButtonIcon variation="danger">
          <HiTrash />
        </ButtonIcon>
      </Modal.Open>
      <Modal.Window name="song-deletion">
        <DeleteSongConfirm name={name} id={id} />
      </Modal.Window>
    </Modal>
  );
}

export default DeleteSong;
