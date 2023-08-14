import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import LoginForm from './LoginForm';

function LoginModal() {
  return (
    <Modal>
      <Modal.Open opens="login">
        <Button>Login</Button>
      </Modal.Open>
      <Modal.Window name="login">
        <LoginForm />
      </Modal.Window>
    </Modal>
  );
}

export default LoginModal;
