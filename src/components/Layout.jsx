import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import Navbar from './Navbar';
import Footer from './Footer';
import { GlobalStyle } from '../styles/theme';

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex: 1;
  width: 100%;
`;

function Layout({ isAuthenticated = false, user = null, onLogout }) {
  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <Navbar isAuthenticated={isAuthenticated} user={user} onLogout={onLogout} />
        <Content>
          <Outlet />
        </Content>
        <Footer />
      </MainContainer>
    </>
  );
}

export default Layout;
