import styled from 'styled-components';
import LoginModal from '../features/authentication/LoginModal';
import Button from './Button';

import { useAuth } from '../features/authentication/AuthContext';
import { useLogout } from '../features/authentication/useLogout';
import UploadSongs from '../features/song/UploadSongs';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

function Header() {
  const { logout } = useLogout();
  const { logout: authLogout, isAdmin } = useAuth();
  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        authLogout();
      },
    });
  };
  return (
    <StyledHeader>
      {!isAdmin && <LoginModal />}
      {isAdmin && (
        <>
          <Button onClick={handleLogout}>Logout</Button>
          <UploadSongs />
        </>
      )}
    </StyledHeader>
  );
}

export default Header;
