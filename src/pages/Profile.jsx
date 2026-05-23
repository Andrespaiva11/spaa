import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';
import { useAuth } from '../contexts/AuthContext';

// Animations
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 10px rgba(153,101,21,0.15), 0 0 20px rgba(153,101,21,0.05); }
  50% { box-shadow: 0 0 25px rgba(201,148,42,0.4), 0 0 40px rgba(153,101,21,0.2); }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
`;

const ProfileWrapper = styled.div`
  min-height: 85vh;
  background: linear-gradient(160deg, #0d0d0d 0%, #1a1008 40%, #0d0d0d 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
`;

const ProfileCard = styled.div`
  width: 100%;
  max-width: 800px;
  background: rgba(15, 10, 5, 0.85);
  backdrop-filter: blur(24px);
  border-radius: ${theme.borderRadius.large};
  border: 1px solid rgba(153, 101, 21, 0.35);
  box-shadow:
    0 0 0 1px rgba(201, 148, 42, 0.08),
    0 32px 80px rgba(0, 0, 0, 0.7),
    inset 0 1px 0 rgba(201, 148, 42, 0.12);
  padding: 3.5rem;
  animation: ${fadeInUp} 0.6s ease-out, ${glowPulse} 5s ease-in-out infinite;
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 2.5rem 1.5rem;
    gap: 2rem;
  }
`;

// Left Column: Avatar & Summary
const ProfileSidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-right: 1px solid rgba(153, 101, 21, 0.2);
  padding-right: 2rem;

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid rgba(153, 101, 21, 0.2);
    padding-right: 0;
    padding-bottom: 2rem;
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const AvatarCircle = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${theme.colors.primaryDark} 0%, ${theme.colors.accent} 50%, ${theme.colors.navbarLinkHover} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.2rem;
  font-weight: 700;
  color: white;
  box-shadow: 0 8px 24px rgba(153, 101, 21, 0.4);
  border: 3px solid rgba(255, 255, 255, 0.1);
  text-transform: uppercase;
  font-family: ${theme.fonts.primary};
`;

const RoleBadge = styled.span`
  background: rgba(153, 101, 21, 0.15);
  border: 1px solid ${theme.colors.primary};
  color: ${theme.colors.navbarLinkHover};
  padding: 0.4rem 1.2rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  display: inline-block;
`;

const UsernameText = styled.h3`
  font-size: 1.6rem;
  color: #f5e9c8;
  margin-bottom: 0.35rem;
  font-family: ${theme.fonts.primary};
`;

const JoinDateText = styled.p`
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.9rem;
`;

// Right Column: Form fields
const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const HeaderGroup = styled.div`
  border-bottom: 1px solid rgba(201, 148, 42, 0.25);
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  color: #f5e9c8;
  margin: 0;
  font-family: ${theme.fonts.primary};
`;

const EditButton = styled.button`
  background: transparent;
  border: 1px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
  padding: 0.5rem 1.5rem;
  border-radius: ${theme.borderRadius.pill};
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${theme.colors.primary};
    color: white;
    box-shadow: 0 4px 15px rgba(153, 101, 21, 0.35);
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
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
  letter-spacing: 1.5px;
  color: ${theme.colors.primary};
`;

// Presentation mode container (read-only)
const InfoValue = styled.div`
  padding: 0.9rem 1.1rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  color: #ebd7b3;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  i {
    color: rgba(201, 148, 42, 0.6);
    font-size: 1.05rem;
  }
`;

const Input = styled.input`
  padding: 0.9rem 1.1rem;
  border-radius: 12px;
  border: 1px solid rgba(153, 101, 21, 0.25);
  background: rgba(255, 255, 255, 0.04);
  color: #f5e9c8;
  font-size: 1.1rem;
  font-family: inherit;
  transition: all 0.25s ease;
  outline: none;

  &:focus {
    border-color: ${theme.colors.accent};
    background: rgba(201, 148, 42, 0.06);
    box-shadow: 0 0 0 3px rgba(153, 101, 21, 0.2), 0 0 18px rgba(201, 148, 42, 0.12);
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.02);
    border-color: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.35);
    cursor: not-allowed;
  }
`;

const ActionButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  animation: ${scaleIn} 0.2s ease-out;
`;

const SaveButton = styled.button`
  flex: 1;
  padding: 1rem;
  background: linear-gradient(135deg, ${theme.colors.primaryDark} 0%, ${theme.colors.accent} 50%, ${theme.colors.navbarLinkHover} 100%);
  background-size: 200% auto;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.05rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(153, 101, 21, 0.3);

  &:hover:not(:disabled) {
    background-position: right center;
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(201, 148, 42, 0.5);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  padding: 1rem 2rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.7);
  border-radius: 50px;
  font-size: 1.05rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.4);
    color: white;
    background: rgba(255, 255, 255, 0.03);
  }
`;

// Alert/Toast notification
const Alert = styled.div`
  background: rgba(39, 174, 96, 0.15);
  border: 1px solid ${theme.colors.success};
  border-radius: 12px;
  padding: 1rem 1.25rem;
  color: #a3e4d7;
  font-size: 1.05rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  animation: ${scaleIn} 0.3s ease-out;

  i {
    font-size: 1.2rem;
    color: ${theme.colors.success};
  }
`;

function Profile() {
  const { user } = useAuth();

  // Local state initialized with user info
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    role: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Hydrate user info from AuthContext
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.fullName || '',
        email: user.email || '',
        username: user.username || '',
        role: user.role || 'CLIENT'
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let val = value;
    if (name === 'fullName') {
      val = value.replace(/[0-9]/g, '');
    }
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    setIsEditing(true);
    setShowAlert(false);
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Reset data to context user
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.fullName || '',
        email: user.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate network save latency
    await new Promise(r => setTimeout(r, 1200));

    // Si el usuario cambia los campos, guardamos de forma simulada en localStorage
    if (user) {
      const updatedUser = {
        ...user,
        fullName: formData.fullName,
        email: formData.email
      };

      // Persistir de forma simulada en localStorage para persistencia básica
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Nota: Para actualizar el context en caliente sin recargar se requeriría una función expuesta,
      // pero actualizando localStorage logramos que persista en refrescos y navegación!
    }

    setIsSaving(false);
    setIsEditing(false);
    setAlertMessage('¡Tu información de perfil ha sido actualizada con éxito!');
    setShowAlert(true);

    // Clear password inputs
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));

    // Auto dismiss notification after 4s
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };

  // Get initials for profile badge
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const translateRole = (role) => {
    const roles = {
      'ADMIN': 'Administrador',
      'CLIENT': 'Cliente Premium',
      'STYLIST': 'Estilista Profesional'
    };
    return roles[role] || 'Cliente';
  };

  return (
    <ProfileWrapper>
      <ProfileCard>

        {/* Sidebar */}
        <ProfileSidebar>
          <AvatarContainer>
            <AvatarCircle>
              {getInitials(formData.fullName || formData.username)}
            </AvatarCircle>
          </AvatarContainer>
          <RoleBadge>{translateRole(formData.role)}</RoleBadge>
          <UsernameText>@{formData.username}</UsernameText>
          <JoinDateText>Miembro desde mayo de 2026</JoinDateText>
        </ProfileSidebar>

        {/* Content & Form */}
        <ProfileContent>
          <HeaderGroup>
            <SectionTitle>Datos Personales</SectionTitle>
            {!isEditing && (
              <EditButton onClick={handleEditClick}>
                <i className="fas fa-edit"></i> Editar Perfil
              </EditButton>
            )}
          </HeaderGroup>

          {showAlert && (
            <Alert>
              <i className="fas fa-check-circle"></i>
              {alertMessage}
            </Alert>
          )}

          <Form onSubmit={handleSave}>
            {/* Nombre Completo */}
            <FormGroup>
              <Label htmlFor="fullName">Nombre Completo</Label>
              {isEditing ? (
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  required
                />
              ) : (
                <InfoValue>
                  <i className="fas fa-user"></i>
                  {formData.fullName || 'No especificado'}
                </InfoValue>
              )}
            </FormGroup>

            {/* Correo Electrónico */}
            <FormGroup>
              <Label htmlFor="email">Correo Electrónico</Label>
              {isEditing ? (
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ejemplo@correo.com"
                  required
                />
              ) : (
                <InfoValue>
                  <i className="fas fa-envelope"></i>
                  {formData.email || 'No especificado'}
                </InfoValue>
              )}
            </FormGroup>

            {/* Nombre de Usuario (Lectura) */}
            <FormGroup>
              <Label>Nombre de Usuario</Label>
              {isEditing ? (
                <Input
                  type="text"
                  value={formData.username}
                  disabled
                />
              ) : (
                <InfoValue>
                  <i className="fas fa-at"></i>
                  {formData.username}
                </InfoValue>
              )}
            </FormGroup>

            {/* Cambiar Contraseña (Solo en Modo Edición) */}
            {isEditing && (
              <>
                <div style={{ height: '1px', background: 'rgba(201,148,42,0.2)', margin: '1.5rem 0 0.5rem 0' }} />
                <SectionTitle style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Seguridad</SectionTitle>

                <FormGroup>
                  <Label htmlFor="currentPassword">Contraseña Actual</Label>
                  <Input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="newPassword">Nueva Contraseña</Label>
                  <Input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Mínimo 6 caracteres"
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repite la nueva contraseña"
                  />
                </FormGroup>
              </>
            )}

            {isEditing && (
              <ActionButtonGroup>
                <CancelButton onClick={handleCancelClick} disabled={isSaving}>
                  Cancelar
                </CancelButton>
                <SaveButton type="submit" disabled={isSaving}>
                  {isSaving ? 'Guardando…' : 'Guardar Cambios'}
                </SaveButton>
              </ActionButtonGroup>
            )}
          </Form>
        </ProfileContent>

      </ProfileCard>
    </ProfileWrapper>
  );
}

export default Profile;
