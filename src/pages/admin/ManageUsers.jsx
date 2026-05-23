import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../styles/theme';
import { useAuth } from '../../contexts/AuthContext';

// Animations
const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  animation: ${slideUp} 0.5s ease-out;
`;

const HeaderSection = styled.div`
  margin-bottom: 2.5rem;
  border-bottom: 1px solid rgba(153, 101, 21, 0.15);
  padding-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const TitleGroup = styled.div``;

const Title = styled.h1`
  color: ${theme.colors.primary};
  margin-bottom: 0.35rem;
  font-size: 2.8rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: rgba(0, 0, 0, 0.6);
  font-size: 1.15rem;
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent});
  color: white;
  padding: 0.75rem 1.75rem;
  border-radius: ${theme.borderRadius.pill};
  font-weight: 700;
  font-size: 1.05rem;
  border: none;
  box-shadow: 0 4px 15px rgba(153, 101, 21, 0.3);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(153, 101, 21, 0.5);
    color: white;
  }
`;

const GlassCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.large};
  border: 1px solid rgba(153, 101, 21, 0.12);
  box-shadow: ${theme.shadows.medium};
  overflow: hidden;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const Th = styled.th`
  background: rgba(153, 101, 21, 0.05);
  color: ${theme.colors.primaryDark};
  padding: 1.25rem 1.5rem;
  font-weight: 700;
  font-size: 1.1rem;
  border-bottom: 2px solid rgba(153, 101, 21, 0.15);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Td = styled.td`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  font-size: 1.15rem;
  vertical-align: middle;
`;

const UserRow = styled.tr`
  transition: background ${theme.transitions.fast};

  &:hover {
    background: rgba(153, 101, 21, 0.02);
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent});
  color: white;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  text-transform: uppercase;
  box-shadow: 0 4px 10px rgba(153, 101, 21, 0.15);
`;

const FullName = styled.div`
  font-weight: 600;
  color: ${theme.colors.text};
`;

const Username = styled.div`
  font-size: 0.95rem;
  color: ${theme.colors.textMuted};
`;

const RoleBadge = styled.span`
  background: ${props => {
    if (props.$role === 'ADMIN') return '#fde8e8';
    if (props.$role === 'STYLIST') return '#e8f0fe';
    return '#e6f4ea';
  }};
  color: ${props => {
    if (props.$role === 'ADMIN') return theme.colors.danger;
    if (props.$role === 'STYLIST') return '#1a73e8';
    return theme.colors.success;
  }};
  padding: 0.35rem 0.85rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const MiniBtn = styled.button`
  background: transparent;
  border: 1px solid ${props => props.$danger ? 'rgba(231, 76, 60, 0.3)' : 'rgba(153, 101, 21, 0.3)'};
  color: ${props => props.$danger ? theme.colors.danger : theme.colors.primary};
  padding: 0.4rem 0.85rem;
  border-radius: ${theme.borderRadius.pill};
  font-size: 0.9rem;
  font-weight: 700;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$danger ? 'rgba(231, 76, 60, 0.08)' : 'rgba(153, 101, 21, 0.08)'};
    border-color: ${props => props.$danger ? theme.colors.danger : theme.colors.primary};
    transform: scale(1.03);
  }
`;

// Modal
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.25s ease;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.large};
  border: 1px solid rgba(153, 101, 21, 0.25);
  padding: 2.5rem;
  width: 90%;
  max-width: 500px;
  box-shadow: ${theme.shadows.xl};
  animation: ${scaleIn} 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

const ModalTitle = styled.h3`
  font-size: 1.8rem;
  color: ${theme.colors.primaryDark};
  margin-bottom: 1.5rem;
  font-family: ${theme.fonts.primary};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${theme.colors.primary};
`;

const Input = styled.input`
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.12);
  font-size: 1.1rem;
  outline: none;

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(153,101,21,0.1);
  }
`;

const Select = styled.select`
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.12);
  font-size: 1.1rem;
  outline: none;
  background: white;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const CancelBtn = styled.button`
  background: #f1f2f6;
  color: #2f3542;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: ${theme.borderRadius.pill};
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.2s;

  &:hover {
    background: #dfe4ea;
  }
`;

const SubmitBtn = styled.button`
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent});
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: ${theme.borderRadius.pill};
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(153, 101, 21, 0.35);
  }
`;

function ManageUsers() {
  const { PREDEFINED_USERS } = useAuth();
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newUser, setNewUser] = useState({
    username: '',
    fullName: '',
    email: '',
    role: 'CLIENT'
  });

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (!storedUsers) {
      localStorage.setItem('users', JSON.stringify(PREDEFINED_USERS));
      setUsers(PREDEFINED_USERS);
    } else {
      setUsers(JSON.parse(storedUsers));
    }
  }, [PREDEFINED_USERS]);

  const saveUsers = (updatedList) => {
    localStorage.setItem('users', JSON.stringify(updatedList));
    setUsers(updatedList);
  };

  const handleRoleChange = (username) => {
    const roleCycle = { 'CLIENT': 'STYLIST', 'STYLIST': 'ADMIN', 'ADMIN': 'CLIENT' };
    const updated = users.map(user => {
      if (user.username === username) {
        return { ...user, role: roleCycle[user.role] };
      }
      return user;
    });
    saveUsers(updated);
  };

  const handleDeleteUser = (username) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar al usuario @${username}?`)) {
      const updated = users.filter(user => user.username !== username);
      saveUsers(updated);
    }
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (users.some(u => u.username === newUser.username)) {
      alert('El nombre de usuario ya existe');
      return;
    }
    const defaultPassword = newUser.username + '123';
    const userToSave = {
      ...newUser,
      password: defaultPassword
    };
    const updated = [...users, userToSave];
    saveUsers(updated);
    alert(`Usuario creado exitosamente. La contraseña temporal es: ${defaultPassword}`);
    setIsModalOpen(false);
    setNewUser({ username: '', fullName: '', email: '', role: 'CLIENT' });
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
  };

  return (
    <PageContainer>
      <HeaderSection>
        <TitleGroup>
          <Title>Gestionar Usuarios</Title>
          <Subtitle>Administra las cuentas, roles y credenciales de clientes y personal</Subtitle>
        </TitleGroup>
        <ActionButton onClick={() => setIsModalOpen(true)}>
          <i className="fas fa-user-plus"></i> Agregar Usuario
        </ActionButton>
      </HeaderSection>

      <GlassCard>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>Usuario / Nombre</Th>
                <Th>Correo Electrónico</Th>
                <Th>Rol</Th>
                <Th>Acciones</Th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <UserRow key={u.username}>
                  <Td>
                    <UserInfo>
                      <Avatar>{getInitials(u.fullName || u.username)}</Avatar>
                      <div>
                        <FullName>{u.fullName}</FullName>
                        <Username>@{u.username}</Username>
                      </div>
                    </UserInfo>
                  </Td>
                  <Td>{u.email}</Td>
                  <Td>
                    <RoleBadge $role={u.role}>{u.role}</RoleBadge>
                  </Td>
                  <Td>
                    <ActionGroup>
                      <MiniBtn onClick={() => handleRoleChange(u.username)}>
                        Cambiar Rol
                      </MiniBtn>
                      <MiniBtn $danger onClick={() => handleDeleteUser(u.username)}>
                        <i className="fas fa-trash-alt"></i>
                      </MiniBtn>
                    </ActionGroup>
                  </Td>
                </UserRow>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      </GlassCard>

      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalTitle>Agregar Nuevo Usuario</ModalTitle>
            <Form onSubmit={handleCreateUser}>
              <FormGroup>
                <Label htmlFor="fullName">Nombre Completo</Label>
                <Input
                  type="text"
                  id="fullName"
                  value={newUser.fullName}
                  onChange={e => setNewUser({ ...newUser, fullName: e.target.value.replace(/[0-9]/g, '') })}
                  placeholder="Ej. Juan Pérez"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="username">Nombre de Usuario</Label>
                <Input
                  type="text"
                  id="username"
                  value={newUser.username}
                  onChange={e => setNewUser({ ...newUser, username: e.target.value.toLowerCase().replace(/\s/g, '') })}
                  placeholder="Ej. juanperez"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  type="email"
                  id="email"
                  value={newUser.email}
                  onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="Ej. juan@correo.com"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="role">Rol en el Sistema</Label>
                <Select
                  id="role"
                  value={newUser.role}
                  onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option value="CLIENT">Cliente (CLIENT)</option>
                  <option value="STYLIST">Estilista (STYLIST)</option>
                  <option value="ADMIN">Administrador (ADMIN)</option>
                </Select>
              </FormGroup>

              <ModalButtons>
                <CancelBtn type="button" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </CancelBtn>
                <SubmitBtn type="submit">
                  Guardar Usuario
                </SubmitBtn>
              </ModalButtons>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
}

export default ManageUsers;
