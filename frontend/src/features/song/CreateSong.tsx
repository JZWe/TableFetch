import { HiOutlinePlus } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import CreateSongForm from './CreateSongForm';
import { useAuth } from '../authentication/AuthContext';

function CreateSong() {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return null;
  }

  return (
    <Modal>
      <Modal.Open opens="song-create">
        <Button>
          <HiOutlinePlus />
          <span>Create Song</span>
        </Button>
      </Modal.Open>
      <Modal.Window name="song-create">
        <CreateSongForm />
      </Modal.Window>
    </Modal>
  );
}

export default CreateSong;
