import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import { AuthContextProvider } from '../features/authentication/AuthContext';

const StyledAppLayout = styled.div`
  width: 100%;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: hidden;
  display: flex;
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  overflow: hidden;
`;

function AppLayout() {
  return (
    <AuthContextProvider>
      <StyledAppLayout>
        <Header />
        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </StyledAppLayout>
    </AuthContextProvider>
  );
}

export default AppLayout;
