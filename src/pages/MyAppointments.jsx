import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';

// Animations
const slideUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
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
  min-height: 80vh;
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

const BookButton = styled(Link)`
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent});
  color: white;
  padding: 0.75rem 1.75rem;
  border-radius: ${theme.borderRadius.pill};
  font-weight: 700;
  font-size: 1.05rem;
  text-transform: uppercase;
  letter-spacing: 1px;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const AppointmentCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.medium};
  border: 1px solid rgba(153, 101, 21, 0.12);
  box-shadow: ${theme.shadows.small};
  padding: 1.75rem;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, ${theme.colors.primary}, ${theme.colors.accent});
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.cardHover};
    border-color: rgba(153, 101, 21, 0.25);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.25rem;
`;

const ServiceName = styled.h3`
  font-size: 1.5rem;
  color: ${theme.colors.primaryDark};
  margin: 0;
  font-weight: 700;
  line-height: 1.2;
`;

const StatusBadge = styled.span`
  background: ${props => props.$cancelled ? '#fde8e8' : '#e6f4ea'};
  color: ${props => props.$cancelled ? theme.colors.danger : theme.colors.success};
  padding: 0.35rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CardBody = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(0, 0, 0, 0.7);
  font-size: 1.1rem;

  i {
    color: ${theme.colors.primary};
    width: 20px;
    text-align: center;
  }
`;

const NotesBox = styled.div`
  background: rgba(153, 101, 21, 0.04);
  border-left: 2px solid ${theme.colors.accent};
  padding: 0.6rem 0.85rem;
  border-radius: 0 8px 8px 0;
  font-size: 0.95rem;
  color: rgba(0, 0, 0, 0.65);
  font-style: italic;
  margin-top: 0.5rem;
  word-break: break-word;
`;

const CardFooter = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding-top: 1.25rem;
  display: flex;
  justify-content: flex-end;
`;

const CancelBtn = styled.button`
  background: transparent;
  border: 1px solid rgba(231, 76, 60, 0.3);
  color: ${theme.colors.danger};
  padding: 0.5rem 1.25rem;
  border-radius: ${theme.borderRadius.pill};
  font-size: 0.95rem;
  font-weight: 700;
  transition: all 0.25s ease;

  &:hover {
    background: rgba(231, 76, 60, 0.08);
    border-color: ${theme.colors.danger};
    transform: scale(1.02);
  }
`;

const EmptyState = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.large};
  border: 1px solid rgba(153, 101, 21, 0.1);
  padding: 4rem 2rem;
  text-align: center;
  box-shadow: ${theme.shadows.medium};
  max-width: 600px;
  margin: 2rem auto;
  animation: ${scaleIn} 0.4s ease-out;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  color: ${theme.colors.primaryLight};
  margin-bottom: 1.5rem;
  opacity: 0.8;
`;

const EmptyTitle = styled.h3`
  font-size: 1.8rem;
  color: ${theme.colors.primaryDark};
  margin-bottom: 0.75rem;
`;

const EmptyText = styled.p`
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 2rem;
  font-size: 1.15rem;
`;

// Confirmation Modal
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
  padding: 2.25rem;
  width: 90%;
  max-width: 450px;
  box-shadow: ${theme.shadows.xl};
  animation: ${scaleIn} 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-align: center;
`;

const ModalIcon = styled.div`
  font-size: 3rem;
  color: ${theme.colors.danger};
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h3`
  font-size: 1.8rem;
  color: #1a1a2e;
  margin-bottom: 0.75rem;
`;

const ModalText = styled.p`
  color: rgba(0, 0, 0, 0.6);
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const ModalBtnGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const ConfirmBtn = styled.button`
  background: ${theme.colors.danger};
  color: white;
  border: none;
  padding: 0.75rem 1.75rem;
  border-radius: ${theme.borderRadius.pill};
  font-weight: 700;
  font-size: 1.05rem;
  transition: all 0.2s;

  &:hover {
    background: #c0392b;
    transform: translateY(-2px);
  }
`;

const KeepBtn = styled.button`
  background: #f1f2f6;
  color: #2f3542;
  border: none;
  padding: 0.75rem 1.75rem;
  border-radius: ${theme.borderRadius.pill};
  font-weight: 700;
  font-size: 1.05rem;
  transition: all 0.2s;

  &:hover {
    background: #dfe4ea;
    transform: translateY(-2px);
  }
`;

function MyAppointments({ user }) {
  const [appointments, setAppointments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState(null);

  useEffect(() => {
    // Cargar citas desde localStorage para el usuario actual
    const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const userAppointments = allAppointments.filter(
      app => app.username === user?.username
    );
    // Ordenar citas por fecha descendente
    userAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));
    setAppointments(userAppointments);
  }, [user]);

  const openCancelModal = (id) => {
    setSelectedAppId(id);
    setModalOpen(true);
  };

  const handleCancelAppointment = () => {
    if (!selectedAppId) return;

    const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    // Eliminar la cita correspondiente
    const updatedAppointments = allAppointments.filter(app => app.id !== selectedAppId);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

    // Actualizar el estado local
    setAppointments(prev => prev.filter(app => app.id !== selectedAppId));
    setModalOpen(false);
    setSelectedAppId(null);
  };

  // Formatear fecha de YYYY-MM-DD a formato más legible
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <PageContainer>
      <HeaderSection>
        <TitleGroup>
          <Title>Mis Citas</Title>
          <Subtitle>Consulta y administra tus citas programadas en Essence De Toi</Subtitle>
        </TitleGroup>
        <BookButton to="/appointments/new">
          <i className="fas fa-plus-circle"></i> Nueva Cita
        </BookButton>
      </HeaderSection>

      {appointments.length === 0 ? (
        <EmptyState>
          <EmptyIcon>📅</EmptyIcon>
          <EmptyTitle>No tienes citas agendadas</EmptyTitle>
          <EmptyText>Reserva tu momento de bienestar hoy mismo y disfruta de una experiencia premium en nuestro spa.</EmptyText>
          <BookButton to="/appointments/new">
            <i className="fas fa-calendar-alt"></i> Agendar Cita Ahora
          </BookButton>
        </EmptyState>
      ) : (
        <Grid>
          {appointments.map((app) => (
            <AppointmentCard key={app.id}>
              <div>
                <CardHeader>
                  <ServiceName>{app.service}</ServiceName>
                  <StatusBadge>Confirmada</StatusBadge>
                </CardHeader>

                <CardBody>
                  <DetailRow>
                    <i className="fas fa-calendar-day"></i>
                    <span>{formatDate(app.date)}</span>
                  </DetailRow>
                  <DetailRow>
                    <i className="fas fa-clock"></i>
                    <span>{app.time}</span>
                  </DetailRow>
                  {app.notes && (
                    <NotesBox>
                      <i className="fas fa-comment-dots" style={{ marginRight: '6px', fontSize: '0.85rem' }}></i>
                      {app.notes}
                    </NotesBox>
                  )}
                </CardBody>
              </div>

              <CardFooter>
                <CancelBtn onClick={() => openCancelModal(app.id)}>
                  Cancelar Cita
                </CancelBtn>
              </CardFooter>
            </AppointmentCard>
          ))}
        </Grid>
      )}

      {modalOpen && (
        <ModalOverlay onClick={() => setModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalIcon>
              <i className="fas fa-exclamation-triangle"></i>
            </ModalIcon>
            <ModalTitle>¿Cancelar esta cita?</ModalTitle>
            <ModalText>
              Esta acción no se puede deshacer. ¿Estás seguro de que deseas cancelar tu reservación?
            </ModalText>
            <ModalBtnGroup>
              <KeepBtn onClick={() => setModalOpen(false)}>Conservar Cita</KeepBtn>
              <ConfirmBtn onClick={handleCancelAppointment}>Sí, Cancelar</ConfirmBtn>
            </ModalBtnGroup>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
}

export default MyAppointments;
