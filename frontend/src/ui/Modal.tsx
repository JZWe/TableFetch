import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';
import useOutsideClick from '../hooks/useOutsideClick';

type StyledModalProps = {
  ref?: React.MutableRefObject<HTMLElement | undefined>;
};

const StyledModal = styled.div<StyledModalProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext<{
  openName: string;
  close: () => void;
  open: (name: string) => void;
}>({
  openName: '',
  close: function () {},
  open: function () {},
});

function Modal({ children }: { children: JSX.Element[] }) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = (name: string) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({
  children,
  opens: opensWindowName,
  onOpen,
}: {
  children: JSX.Element;
  opens: string;
  onOpen?: () => void;
}) {
  const { open } = useContext(ModalContext);

  function handleOpen() {
    open(opensWindowName);
    onOpen?.();
  }

  return cloneElement(children, { onClick: handleOpen });
}

function Window({
  children,
  name,
  onClose,
}: {
  children: JSX.Element;
  name: string;
  onClose?: () => void;
}) {
  const { openName, close } = useContext(ModalContext);

  function handleClose() {
    close();
    onClose?.();
  }

  const ref = useOutsideClick(handleClose);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={handleClose}>
          <HiXMark />
        </Button>

        <div>{cloneElement(children, { onCloseModal: handleClose })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
