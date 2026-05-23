import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const glowPulse = keyframes`
  0%, 100% { text-shadow: 0 0 4px rgba(201, 148, 42, 0.3), 0 0 8px rgba(153, 101, 21, 0.15); }
  50% { text-shadow: 0 0 12px rgba(201, 148, 42, 0.6), 0 0 24px rgba(153, 101, 21, 0.3); }
`;

const borderShine = keyframes`
  0% { border-color: rgba(153, 101, 21, 0.05); }
  50% { border-color: rgba(201, 148, 42, 0.35); }
  100% { border-color: rgba(153, 101, 21, 0.05); }
`;

const buttonGlow = keyframes`
  0%, 100% { box-shadow: 0 2px 10px rgba(153, 101, 21, 0.3); }
  50% { box-shadow: 0 4px 20px rgba(153, 101, 21, 0.55), 0 0 30px rgba(201, 148, 42, 0.15); }
`;

const NavbarContainer = styled.nav`
  position: sticky;
  top: 0;
  z-index: 1030;
  background-color: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: ${props => props.$scrolled
    ? '0 4px 30px rgba(0, 0, 0, 0.3)'
    : '0 1px 0 rgba(255,255,255,0.05)'};
  padding: 0;
  transition: all ${theme.transitions.normal};
  border-bottom: 1px solid rgba(153, 101, 21, ${props => props.$scrolled ? '0.2' : '0.05'});
  animation: ${borderShine} 4s ease-in-out infinite;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.85rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Brand = styled(Link)`
  font-family: ${theme.fonts.primary};
  font-size: 2.2rem;
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 0.5px;
  transition: all ${theme.transitions.normal};
  position: relative;
  background: linear-gradient(
    90deg,
    ${theme.colors.primary} 0%,
    ${theme.colors.navbarLinkHover} 25%,
    #fff 50%,
    ${theme.colors.navbarLinkHover} 75%,
    ${theme.colors.primary} 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 4s linear infinite, ${glowPulse} 3s ease-in-out infinite;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.navbarLinkHover});
    transition: width ${theme.transitions.normal};
  }

  &:hover {
    text-decoration: none;

    &::after {
      width: 100%;
    }
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
  align-items: center;

  @media (max-width: 768px) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: rgba(10, 10, 10, 0.98);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(153, 101, 21, 0.2);
    transition: all ${theme.transitions.normal};
    max-height: ${props => props.$isOpen ? '85vh' : '0'};
    opacity: ${props => props.$isOpen ? '1' : '0'};
    overflow-y: ${props => props.$isOpen ? 'auto' : 'hidden'};
    pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.55);
  }
`;

const NavLink = styled(Link)`
  color: ${theme.colors.navbarText};
  font-family: ${theme.fonts.secondary};
  font-weight: 500;
  font-size: 1.15rem;
  text-decoration: none;
  transition: all ${theme.transitions.normal};
  padding: 0.5rem 0.9rem;
  border-radius: ${theme.borderRadius.small};
  position: relative;
  letter-spacing: 0.3px;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: ${theme.colors.navbarLinkHover};
    transition: width ${theme.transitions.normal};
    border-radius: 2px;
  }

  &:hover {
    color: ${theme.colors.navbarLinkHover};
    text-decoration: none;
    background: rgba(153, 101, 21, 0.08);
    text-shadow: 0 0 8px rgba(201, 148, 42, 0.4);

    &::before {
      width: 60%;
    }
  }

  &.active {
    color: ${theme.colors.navbarLinkHover};
    text-shadow: 0 0 8px rgba(201, 148, 42, 0.3);
  }

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    padding: 0.85rem 2rem;
    border-radius: 0;

    &::before {
      display: none;
    }

    &:hover {
      background: rgba(153, 101, 21, 0.15);
      padding-left: 2.5rem;
    }
  }
`;

const LoginButton = styled(Link)`
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent});
  border: none;
  color: white;
  padding: 0.55rem 1.5rem;
  border-radius: ${theme.borderRadius.pill};
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all ${theme.transitions.normal};
  letter-spacing: 0.3px;
  animation: ${buttonGlow} 3s ease-in-out infinite;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(153, 101, 21, 0.5);
    color: white;
    text-decoration: none;
    filter: brightness(1.1);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    display: block;
    margin: 0.75rem 2rem;
    text-align: center;
    border-radius: ${theme.borderRadius.small};
  }
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
  }
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.navbarText};
  font-family: ${theme.fonts.secondary};
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 0.9rem;
  font-size: 1.15rem;
  transition: color ${theme.transitions.normal};
  border-radius: ${theme.borderRadius.small};

  &:hover {
    color: ${theme.colors.navbarLinkHover};
    background: rgba(153, 101, 21, 0.08);
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: left;
    padding: 0.85rem 2rem;
    border-radius: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      background: rgba(153, 101, 21, 0.15);
    }
  }
`;

const DropdownContent = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: absolute;
  right: 0;
  background: rgba(20, 20, 20, 0.98);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  min-width: 200px;
  box-shadow: ${theme.shadows.large};
  border-radius: ${theme.borderRadius.medium};
  z-index: 10;
  margin-top: 0.5rem;
  border: 1px solid rgba(153, 101, 21, 0.15);
  overflow: hidden;
  animation: dropIn 0.2s ease-out;

  @keyframes dropIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  a, button {
    display: block;
    padding: 0.85rem 1.25rem;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.8);
    transition: all ${theme.transitions.fast};
    font-size: 1.1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background: rgba(153, 101, 21, 0.15);
      color: ${theme.colors.navbarLinkHover};
      padding-left: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    position: static;
    width: 100%;
    background: rgba(255, 255, 255, 0.03);
    border: none;
    border-radius: 0;
    box-shadow: none;
    margin-top: 0;

    a, button {
      padding-left: 3rem;
      font-size: 1.05rem;

      &:hover {
        padding-left: 3.5rem;
        background: rgba(153, 101, 21, 0.1);
      }
    }
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${theme.colors.navbarText};
  font-size: 1.65rem;
  cursor: pointer;
  padding: 0.25rem;
  transition: color ${theme.transitions.normal};

  &:hover {
    color: ${theme.colors.navbarLinkHover};
  }

  @media (max-width: 768px) {
    display: block;
  }
`;


function Navbar({ isAuthenticated = false, user = null, onLogout }) {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [stylistDropdownOpen, setStylistDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on screen resize to desktop sizes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-cerrar el menú desplegable del usuario después de 5 segundos de inactividad
  useEffect(() => {
    let timer;
    if (userDropdownOpen) {
      timer = setTimeout(() => {
        setUserDropdownOpen(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [userDropdownOpen]);

  // Auto-cerrar el menú desplegable del admin después de 5 segundos de inactividad
  useEffect(() => {
    let timer;
    if (adminDropdownOpen) {
      timer = setTimeout(() => {
        setAdminDropdownOpen(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [adminDropdownOpen]);

  // Auto-cerrar el menú desplegable del estilista después de 5 segundos de inactividad
  useEffect(() => {
    let timer;
    if (stylistDropdownOpen) {
      timer = setTimeout(() => {
        setStylistDropdownOpen(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [stylistDropdownOpen]);

  const handleUserDropdownClick = () => {
    setUserDropdownOpen(prev => !prev);
    setAdminDropdownOpen(false);
    setStylistDropdownOpen(false);
  };

  const handleAdminDropdownClick = () => {
    setAdminDropdownOpen(prev => !prev);
    setUserDropdownOpen(false);
    setStylistDropdownOpen(false);
  };

  const handleStylistDropdownClick = () => {
    setStylistDropdownOpen(prev => !prev);
    setUserDropdownOpen(false);
    setAdminDropdownOpen(false);
  };

  return (
    <NavbarContainer $scrolled={scrolled}>
      <Container>
        <Brand to="/" onClick={() => setIsMobileMenuOpen(false)}>✦ Essence De Toi</Brand>
        
        <HamburgerButton onClick={() => setIsMobileMenuOpen(prev => !prev)} aria-label="Menu principal">
          <i className={isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </HamburgerButton>

        <NavLinks $isOpen={isMobileMenuOpen}>
          <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Inicio</NavLink>
          <NavLink to="/services" onClick={() => setIsMobileMenuOpen(false)}>Servicios</NavLink>
          
          {isAuthenticated && (
            <>
              <NavLink to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</NavLink>
              <NavLink to="/appointments/my" onClick={() => setIsMobileMenuOpen(false)}>Mis Citas</NavLink>
            </>
          )}
          
          <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contáctanos</NavLink>
          
          {!isAuthenticated && (
            <>
              <NavLink to="/appointments/new" onClick={() => setIsMobileMenuOpen(false)}>Agendar Cita</NavLink>
              <LoginButton to="/login" onClick={() => setIsMobileMenuOpen(false)}>Iniciar Sesión</LoginButton>
            </>
          )}

          {isAuthenticated && user && (
            <Dropdown>
              <DropdownButton onClick={handleUserDropdownClick}>
                <span>
                  <i className="fas fa-user-circle" style={{ marginRight: '6px' }}></i>
                  {user.username}
                </span>
                <i className={`fas fa-chevron-${userDropdownOpen ? 'up' : 'down'}`} style={{ marginLeft: '8px', fontSize: '0.85rem', opacity: 0.8 }}></i>
              </DropdownButton>
              <DropdownContent isOpen={userDropdownOpen}>
                <Link to="/profile" onClick={() => { setUserDropdownOpen(false); setIsMobileMenuOpen(false); }}>Mi Perfil</Link>
                <button 
                  onClick={() => {
                    onLogout();
                    setUserDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                  style={{
                    width: '100%',
                    border: 'none',
                    background: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontFamily: theme.fonts.secondary,
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '0.9rem',
                  }}
                >
                  <i className="fas fa-sign-out-alt" style={{ marginRight: '8px' }}></i>
                  Cerrar Sesión
                </button>
              </DropdownContent>
            </Dropdown>
          )}

          {isAuthenticated && user?.role === 'ADMIN' && (
            <Dropdown>
              <DropdownButton onClick={handleAdminDropdownClick}>
                <span>
                  <i className="fas fa-shield-alt" style={{ marginRight: '6px' }}></i>
                  Admin
                </span>
                <i className={`fas fa-chevron-${adminDropdownOpen ? 'up' : 'down'}`} style={{ marginLeft: '8px', fontSize: '0.85rem', opacity: 0.8 }}></i>
              </DropdownButton>
              <DropdownContent isOpen={adminDropdownOpen}>
                <Link to="/admin/dashboard" onClick={() => { setAdminDropdownOpen(false); setIsMobileMenuOpen(false); }}>
                  <i className="fas fa-tachometer-alt" style={{ marginRight: '8px', opacity: 0.7 }}></i>Panel de Admin
                </Link>
                <Link to="/admin/users" onClick={() => { setAdminDropdownOpen(false); setIsMobileMenuOpen(false); }}>
                  <i className="fas fa-users-cog" style={{ marginRight: '8px', opacity: 0.7 }}></i>Gestionar Usuarios
                </Link>
                <Link to="/admin/services" onClick={() => { setAdminDropdownOpen(false); setIsMobileMenuOpen(false); }}>
                  <i className="fas fa-concierge-bell" style={{ marginRight: '8px', opacity: 0.7 }}></i>Gestionar Servicios
                </Link>
                <Link to="/appointments/all" onClick={() => { setAdminDropdownOpen(false); setIsMobileMenuOpen(false); }}>
                  <i className="fas fa-calendar-alt" style={{ marginRight: '8px', opacity: 0.7 }}></i>Todas las Citas
                </Link>
                <Link to="/admin/reports" onClick={() => { setAdminDropdownOpen(false); setIsMobileMenuOpen(false); }}>
                  <i className="fas fa-chart-line" style={{ marginRight: '8px', opacity: 0.7 }}></i>Reportes
                </Link>
              </DropdownContent>
            </Dropdown>
          )}

          {isAuthenticated && user?.role === 'STYLIST' && (
            <Dropdown>
              <DropdownButton onClick={handleStylistDropdownClick}>
                <span>
                  <i className="fas fa-cut" style={{ marginRight: '6px' }}></i>
                  Estilista
                </span>
                <i className={`fas fa-chevron-${stylistDropdownOpen ? 'up' : 'down'}`} style={{ marginLeft: '8px', fontSize: '0.85rem', opacity: 0.8 }}></i>
              </DropdownButton>
              <DropdownContent isOpen={stylistDropdownOpen}>
                <Link to="/stylist/dashboard" onClick={() => { setStylistDropdownOpen(false); setIsMobileMenuOpen(false); }}>Dashboard Estilista</Link>
                <Link to="/stylist/appointments" onClick={() => { setStylistDropdownOpen(false); setIsMobileMenuOpen(false); }}>Mis Citas</Link>
                <Link to="/stylist/schedule" onClick={() => { setStylistDropdownOpen(false); setIsMobileMenuOpen(false); }}>Mi Horario</Link>
              </DropdownContent>
            </Dropdown>
          )}
        </NavLinks>
      </Container>
    </NavbarContainer>
  );
}

export default Navbar;
