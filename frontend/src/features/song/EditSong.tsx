import { HiPencil } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import ButtonIcon from '../../ui/ButtonIcon';
import EditSongForm from './EditSongForm';

function EditSong({ id }: { id: number | string }) {
  return (
    <Modal>
      <Modal.Open opens="song-edit">
        <ButtonIcon variation="primary">
          <HiPencil />
        </ButtonIcon>
      </Modal.Open>
      <Modal.Window name="song-edit">
        <EditSongForm id={id} />
      </Modal.Window>
    </Modal>
  );
}

export default EditSong;
