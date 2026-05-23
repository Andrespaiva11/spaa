import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../styles/theme';

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
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

// Metrics Section
const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

const MetricCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.medium};
  border: 1px solid rgba(153, 101, 21, 0.12);
  padding: 1.5rem;
  box-shadow: ${theme.shadows.small};
  display: flex;
  align-items: center;
  gap: 1.25rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props => props.$color || theme.colors.primary};
  }
`;

const MetricIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.$bgColor || 'rgba(153, 101, 21, 0.1)'};
  color: ${props => props.$color || theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
`;

const MetricInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const MetricValue = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${theme.colors.text};
  line-height: 1.2;
`;

const MetricLabel = styled.span`
  font-size: 0.95rem;
  color: ${theme.colors.textMuted};
  font-weight: 500;
`;

// Filter Buttons
const FilterContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const FilterBtn = styled.button`
  background: ${props => props.$active ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})` : 'white'};
  color: ${props => props.$active ? 'white' : theme.colors.primary};
  border: 1px solid ${props => props.$active ? 'transparent' : 'rgba(153, 101, 21, 0.25)'};
  padding: 0.5rem 1.5rem;
  border-radius: ${theme.borderRadius.pill};
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.25s ease;
  box-shadow: ${props => props.$active ? '0 4px 12px rgba(153, 101, 21, 0.25)' : 'none'};

  &:hover {
    transform: translateY(-1px);
    background: ${props => props.$active ? '' : 'rgba(153, 101, 21, 0.05)'};
  }
`;

// Table and Cards
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

const AppRow = styled.tr`
  transition: background ${theme.transitions.fast};

  &:hover {
    background: rgba(153, 101, 21, 0.02);
  }
`;

const ClientName = styled.div`
  font-weight: 600;
  color: ${theme.colors.text};
`;

const Username = styled.div`
  font-size: 0.95rem;
  color: ${theme.colors.textMuted};
`;

const ServiceBadge = styled.span`
  font-weight: 600;
  color: ${theme.colors.primaryDark};
  display: block;
`;

const DateTimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 1.05rem;
`;

const StatusBadge = styled.span`
  background: ${props => {
    if (props.$status === 'CANCELLED') return '#fde8e8';
    if (props.$status === 'CONFIRMED') return '#e6f4ea';
    return '#fff3cd';
  }};
  color: ${props => {
    if (props.$status === 'CANCELLED') return theme.colors.danger;
    if (props.$status === 'CONFIRMED') return theme.colors.success;
    return '#856404';
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
  border: 1px solid ${props => {
    if (props.$variant === 'danger') return 'rgba(231, 76, 60, 0.3)';
    if (props.$variant === 'success') return 'rgba(39, 174, 96, 0.3)';
    return 'rgba(153, 101, 21, 0.3)';
  }};
  color: ${props => {
    if (props.$variant === 'danger') return theme.colors.danger;
    if (props.$variant === 'success') return theme.colors.success;
    return theme.colors.primary;
  }};
  padding: 0.4rem 0.85rem;
  border-radius: ${theme.borderRadius.pill};
  font-size: 0.9rem;
  font-weight: 700;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;

  &:hover {
    background: ${props => {
      if (props.$variant === 'danger') return 'rgba(231, 76, 60, 0.08)';
      if (props.$variant === 'success') return 'rgba(39, 174, 96, 0.08)';
      return 'rgba(153, 101, 21, 0.08)';
    }};
    border-color: ${props => {
      if (props.$variant === 'danger') return theme.colors.danger;
      if (props.$variant === 'success') return theme.colors.success;
      return theme.colors.primary;
    }};
    transform: scale(1.03);
  }
`;

const NotesText = styled.span`
  display: block;
  font-size: 0.95rem;
  color: ${theme.colors.textMuted};
  font-style: italic;
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const sampleAppointments = [
  {
    id: '1',
    username: 'maria_g',
    service: 'Manicura Clásica',
    date: '2026-05-21',
    time: '10:00 AM',
    notes: 'Prefiere tonos pasteles',
    status: 'CONFIRMED',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    username: 'carlos_m',
    service: 'Corte de Cabello',
    date: '2026-05-21',
    time: '02:00 PM',
    notes: 'Estilo degradado corto',
    status: 'CONFIRMED',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    username: 'sofia_r',
    service: 'Tintura',
    date: '2026-05-22',
    time: '11:00 AM',
    notes: 'Coloración rubio ceniza, requiere decoloración previa',
    status: 'CONFIRMED',
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    username: 'juan_p',
    service: 'Tratamiento Capilar',
    date: '2026-05-20',
    time: '05:00 PM',
    notes: 'Tratamiento de hidratación profunda',
    status: 'CANCELLED',
    createdAt: new Date().toISOString()
  }
];

function AllAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('ALL'); // ALL, CONFIRMED, CANCELLED

  useEffect(() => {
    // Load users (to match full names)
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(storedUsers);

    // Load appointments
    const storedApps = localStorage.getItem('appointments');
    if (!storedApps) {
      localStorage.setItem('appointments', JSON.stringify(sampleAppointments));
      setAppointments(sampleAppointments);
    } else {
      setAppointments(JSON.parse(storedApps));
    }
  }, []);

  const saveAppointments = (updated) => {
    localStorage.setItem('appointments', JSON.stringify(updated));
    setAppointments(updated);
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = appointments.map(app => {
      if (app.id === id) {
        return { ...app, status: newStatus };
      }
      return app;
    });
    saveAppointments(updated);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar permanentemente el registro de esta cita?')) {
      const updated = appointments.filter(app => app.id !== id);
      saveAppointments(updated);
    }
  };

  // Helper to find client full name
  const getClientFullName = (username) => {
    const matched = users.find(u => u.username === username);
    if (matched) return matched.fullName;
    // Fallback based on known usernames in our system
    const map = {
      'maria_g': 'María González',
      'carlos_m': 'Carlos Mendoza',
      'sofia_r': 'Sofía Rodríguez',
      'juan_p': 'Juan Pérez'
    };
    return map[username] || username;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('es-ES', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // Metrics calculations
  const totalCount = appointments.length;
  const confirmedCount = appointments.filter(a => a.status === 'CONFIRMED').length;
  const cancelledCount = appointments.filter(a => a.status === 'CANCELLED').length;

  const filteredAppointments = appointments.filter(a => {
    if (filter === 'ALL') return true;
    return a.status === filter;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <PageContainer>
      <HeaderSection>
        <TitleGroup>
          <Title>Todas las Citas</Title>
          <Subtitle>Panel de gestión de agendas y solicitudes de citas en Essence De Toi</Subtitle>
        </TitleGroup>
      </HeaderSection>

      <MetricsGrid>
        <MetricCard $color={theme.colors.primary}>
          <MetricIcon $bgColor="rgba(153, 101, 21, 0.1)" $color={theme.colors.primary}>
            <i className="fas fa-calendar-alt"></i>
          </MetricIcon>
          <MetricInfo>
            <MetricValue>{totalCount}</MetricValue>
            <MetricLabel>Total Citas</MetricLabel>
          </MetricInfo>
        </MetricCard>

        <MetricCard $color={theme.colors.success}>
          <MetricIcon $bgColor="rgba(39, 174, 96, 0.1)" $color={theme.colors.success}>
            <i className="fas fa-check-circle"></i>
          </MetricIcon>
          <MetricInfo>
            <MetricValue>{confirmedCount}</MetricValue>
            <MetricLabel>Confirmadas</MetricLabel>
          </MetricInfo>
        </MetricCard>

        <MetricCard $color={theme.colors.danger}>
          <MetricIcon $bgColor="rgba(231, 76, 60, 0.1)" $color={theme.colors.danger}>
            <i className="fas fa-times-circle"></i>
          </MetricIcon>
          <MetricInfo>
            <MetricValue>{cancelledCount}</MetricValue>
            <MetricLabel>Canceladas</MetricLabel>
          </MetricInfo>
        </MetricCard>
      </MetricsGrid>

      <FilterContainer>
        <FilterBtn $active={filter === 'ALL'} onClick={() => setFilter('ALL')}>
          Todas ({totalCount})
        </FilterBtn>
        <FilterBtn $active={filter === 'CONFIRMED'} onClick={() => setFilter('CONFIRMED')}>
          Confirmadas ({confirmedCount})
        </FilterBtn>
        <FilterBtn $active={filter === 'CANCELLED'} onClick={() => setFilter('CANCELLED')}>
          Canceladas ({cancelledCount})
        </FilterBtn>
      </FilterContainer>

      <GlassCard>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>Cliente</Th>
                <Th>Servicio</Th>
                <Th>Fecha y Hora</Th>
                <Th>Notas</Th>
                <Th>Estado</Th>
                <Th>Acciones</Th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length === 0 ? (
                <tr>
                  <Td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: theme.colors.textMuted }}>
                    No hay citas registradas en este estado.
                  </Td>
                </tr>
              ) : (
                filteredAppointments.map(app => (
                  <AppRow key={app.id}>
                    <Td>
                      <ClientName>{getClientFullName(app.username)}</ClientName>
                      <Username>@{app.username}</Username>
                    </Td>
                    <Td>
                      <ServiceBadge>{app.service}</ServiceBadge>
                    </Td>
                    <Td>
                      <DateTimeWrapper>
                        <span style={{ fontWeight: 650 }}><i className="far fa-calendar-alt" style={{ marginRight: '6px', color: theme.colors.primary }}></i>{formatDate(app.date)}</span>
                        <span style={{ fontSize: '0.95rem', color: 'rgba(0,0,0,0.6)' }}><i className="far fa-clock" style={{ marginRight: '6px', color: theme.colors.primary }}></i>{app.time}</span>
                      </DateTimeWrapper>
                    </Td>
                    <Td>
                      {app.notes ? (
                        <NotesText title={app.notes}>{app.notes}</NotesText>
                      ) : (
                        <span style={{ color: 'rgba(0,0,0,0.3)', fontStyle: 'italic', fontSize: '0.95rem' }}>Ninguna</span>
                      )}
                    </Td>
                    <Td>
                      <StatusBadge $status={app.status}>{app.status === 'CONFIRMED' ? 'Confirmada' : 'Cancelada'}</StatusBadge>
                    </Td>
                    <Td>
                      <ActionGroup>
                        {app.status === 'CANCELLED' && (
                          <MiniBtn $variant="success" onClick={() => handleStatusChange(app.id, 'CONFIRMED')}>
                            Reconfirmar
                          </MiniBtn>
                        )}
                        {app.status === 'CONFIRMED' && (
                          <MiniBtn $variant="danger" onClick={() => handleStatusChange(app.id, 'CANCELLED')}>
                            Cancelar
                          </MiniBtn>
                        )}
                        <MiniBtn onClick={() => handleDelete(app.id)} style={{ padding: '0.4rem 0.6rem' }} title="Eliminar registro">
                          <i className="fas fa-trash-alt"></i>
                        </MiniBtn>
                      </ActionGroup>
                    </Td>
                  </AppRow>
                ))
              )}
            </tbody>
          </Table>
        </TableWrapper>
      </GlassCard>
    </PageContainer>
  );
}

export default AllAppointments;
