import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../styles/theme';

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fillBar = keyframes`
  from { width: 0; }
  to { width: ${props => props.$percentage || '0%'}; }
`;

const growBarHeight = keyframes`
  from { height: 0; }
  to { height: ${props => props.$height || '0px'}; }
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
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

const MetricCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.medium};
  border: 1px solid rgba(153, 101, 21, 0.12);
  padding: 1.75rem;
  box-shadow: ${theme.shadows.medium};
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
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: ${props => props.$bgColor || 'rgba(153, 101, 21, 0.1)'};
  color: ${props => props.$color || theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
`;

const MetricInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const MetricValue = styled.span`
  font-size: 1.95rem;
  font-weight: 700;
  color: ${theme.colors.text};
  line-height: 1.2;
`;

const MetricLabel = styled.span`
  font-size: 0.95rem;
  color: ${theme.colors.textMuted};
  font-weight: 600;
  margin-top: 0.25rem;
`;

// Main Charts Layout
const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 2.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const GlassCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.large};
  border: 1px solid rgba(153, 101, 21, 0.12);
  box-shadow: ${theme.shadows.medium};
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: ${theme.colors.primaryDark};
  margin-bottom: 1.5rem;
  font-family: ${theme.fonts.secondary};
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(153, 101, 21, 0.08);
  padding-bottom: 0.75rem;
`;

// Custom Bar Graph Components
const GraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 320px;
  justify-content: flex-end;
  position: relative;
  padding-top: 2rem;
  margin-top: 1rem;
`;

const BarChartWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 240px;
  border-bottom: 2px solid rgba(153, 101, 21, 0.2);
  padding: 0 1rem;
`;

const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50px;
  position: relative;
  cursor: pointer;

  &:hover .tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(-10px);
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%) translateY(0);
  background: rgba(10, 10, 10, 0.9);
  color: ${theme.colors.navbarLinkHover};
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 700;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  z-index: 10;
  box-shadow: 0 4px 10px rgba(0,0,0,0.25);
  border: 1px solid rgba(153, 101, 21, 0.25);

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: rgba(10, 10, 10, 0.9) transparent transparent transparent;
  }
`;

const Bar = styled.div`
  width: 100%;
  height: ${props => props.$height || '0px'};
  background: linear-gradient(to top, ${theme.colors.primary}, ${theme.colors.accent});
  border-radius: 4px 4px 0 0;
  animation: ${growBarHeight} 1s ease-out forwards;
  transition: filter 0.2s;

  ${BarContainer}:hover & {
    filter: brightness(1.15);
  }
`;

const BarLabel = styled.span`
  margin-top: 0.75rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
`;

// Progress List Components
const ProgressList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProgressItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.05rem;
  font-weight: 600;
`;

const ProgressName = styled.span`
  color: ${theme.colors.text};
`;

const ProgressVal = styled.span`
  color: ${theme.colors.primaryDark};
  font-weight: 700;
`;

const ProgressBarContainer = styled.div`
  height: 10px;
  background: #f1f2f6;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.03);
`;

const ProgressBarFill = styled.div`
  height: 100%;
  width: ${props => props.$percentage || '0%'};
  background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.accent});
  border-radius: 5px;
  animation: ${fillBar} 1s ease-out forwards;
`;

// Stylist Table Components
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
  padding: 1rem 1.25rem;
  font-weight: 700;
  font-size: 1rem;
  border-bottom: 2px solid rgba(153, 101, 21, 0.15);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Td = styled.td`
  padding: 1.1rem 1.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  font-size: 1.1rem;
  vertical-align: middle;
  color: ${theme.colors.text};
`;

function Reports() {
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Load from localStorage
    const storedApps = JSON.parse(localStorage.getItem('appointments') || '[]');
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const storedServices = JSON.parse(localStorage.getItem('services') || '[]');

    setAppointments(storedApps);
    setUsers(storedUsers);
    setServices(storedServices);
  }, []);

  // Helper to map service name to price number
  const getServicePrice = (serviceName) => {
    // Attempt lookup in loaded services
    const matched = services.find(s => s.name.toLowerCase() === serviceName.toLowerCase());
    if (matched) {
      const cleaned = matched.price.replace(/[^\d]/g, '');
      const parsed = parseInt(cleaned, 10);
      if (!isNaN(parsed)) return parsed;
    }
    // Fallbacks
    const map = {
      'Manicura Clásica': 30000,
      'Tintura': 150000,
      'Tratamiento Capilar': 60000,
      'Corte de Cabello': 35000,
      'Peinado de Evento': 200000,
      'Pedicure': 70000,
      'Masaje Relajante': 45000
    };
    return map[serviceName] || 45000;
  };

  // Calculations
  const totalCitas = appointments.length;
  const confirmedCitas = appointments.filter(a => a.status === 'CONFIRMED');
  const cancelledCitas = appointments.filter(a => a.status === 'CANCELLED');

  const attendanceRate = totalCitas > 0 
    ? Math.round((confirmedCitas.length / totalCitas) * 100) 
    : 100;

  const totalIncome = confirmedCitas.reduce((sum, app) => sum + getServicePrice(app.service), 0);

  // Formatter for currency
  const formatCurrency = (val) => {
    return `$${val.toLocaleString('es-CO')}`;
  };

  // Pre-configured monthly income graph data
  // Using real data from app plus seeded distribution
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
  // We distribute income based on totalIncome calculated dynamically
  const baseMonthlyDist = [0.12, 0.15, 0.18, 0.22, 0.25, 0.08]; // sum doesn't need to be 1, just scaling
  const maxFactor = Math.max(...baseMonthlyDist);
  
  // Calculate relative monthly incomes
  const monthlyData = months.map((m, idx) => {
    const calculatedVal = Math.round(totalIncome * (baseMonthlyDist[idx] / 0.5)); // distributed
    const percentHeight = maxFactor > 0 ? (baseMonthlyDist[idx] / maxFactor) * 90 : 20; // scale to 90% max
    return {
      month: m,
      value: calculatedVal,
      height: `${percentHeight}%`
    };
  });

  // Top services analysis
  const serviceCounts = {};
  confirmedCitas.forEach(app => {
    serviceCounts[app.service] = (serviceCounts[app.service] || 0) + 1;
  });
  // Ensure we have at least some items in serviceCounts to show
  const servicePopularity = Object.keys(serviceCounts).map(name => ({
    name,
    count: serviceCounts[name]
  })).sort((a,b) => b.count - a.count);

  // Default popular list if no bookings yet
  const displayServices = servicePopularity.length > 0 
    ? servicePopularity.slice(0, 4) 
    : [
        { name: 'Tintura', count: 3 },
        { name: 'Peinado de Evento', count: 2 },
        { name: 'Manicura Clásica', count: 2 },
        { name: 'Corte de Cabello', count: 1 }
      ];

  const maxServiceCount = displayServices.length > 0 ? Math.max(...displayServices.map(s => s.count)) : 1;

  // Stylists mock metrics
  const stylists = [
    { name: 'Ana Gómez', rating: '98%', clients: 24 },
    { name: 'Valeria Silva', rating: '95%', clients: 18 },
    { name: 'Carolina Torres', rating: '92%', clients: 15 }
  ];

  return (
    <PageContainer>
      <HeaderSection>
        <TitleGroup>
          <Title>Reportes y Analíticas</Title>
          <Subtitle>Monitorea los ingresos, popularidad de servicios e indicadores clave de rendimiento</Subtitle>
        </TitleGroup>
      </HeaderSection>

      <MetricsGrid>
        <MetricCard $color={theme.colors.accent}>
          <MetricIcon $bgColor="rgba(201, 148, 42, 0.1)" $color={theme.colors.accent}>
            <i className="fas fa-coins"></i>
          </MetricIcon>
          <MetricInfo>
            <MetricValue>{formatCurrency(totalIncome)}</MetricValue>
            <MetricLabel>Ingresos Totales (Est.)</MetricLabel>
          </MetricInfo>
        </MetricCard>

        <MetricCard $color={theme.colors.primary}>
          <MetricIcon $bgColor="rgba(153, 101, 21, 0.1)" $color={theme.colors.primary}>
            <i className="fas fa-calendar-check"></i>
          </MetricIcon>
          <MetricInfo>
            <MetricValue>{totalCitas}</MetricValue>
            <MetricLabel>Reservas Totales</MetricLabel>
          </MetricInfo>
        </MetricCard>

        <MetricCard $color={theme.colors.success}>
          <MetricIcon $bgColor="rgba(39, 174, 96, 0.1)" $color={theme.colors.success}>
            <i className="fas fa-percentage"></i>
          </MetricIcon>
          <MetricInfo>
            <MetricValue>{attendanceRate}%</MetricValue>
            <MetricLabel>Tasa de Asistencia</MetricLabel>
          </MetricInfo>
        </MetricCard>

        <MetricCard $color="#3498db">
          <MetricIcon $bgColor="rgba(52, 152, 219, 0.1)" $color="#3498db">
            <i className="fas fa-users"></i>
          </MetricIcon>
          <MetricInfo>
            <MetricValue>{users.length > 0 ? users.length : 8}</MetricValue>
            <MetricLabel>Clientes Activos</MetricLabel>
          </MetricInfo>
        </MetricCard>
      </MetricsGrid>

      <LayoutGrid>
        <GlassCard>
          <CardTitle>
            <i className="fas fa-chart-bar" style={{ color: theme.colors.primary }}></i> Ingresos por Mes (COP)
          </CardTitle>
          <GraphContainer>
            <BarChartWrapper>
              {monthlyData.map(data => (
                <BarContainer key={data.month}>
                  <Tooltip className="tooltip">{formatCurrency(data.value)}</Tooltip>
                  <Bar $height={data.height} />
                  <BarLabel>{data.month}</BarLabel>
                </BarContainer>
              ))}
            </BarChartWrapper>
          </GraphContainer>
        </GlassCard>

        <GlassCard>
          <CardTitle>
            <i className="fas fa-fire" style={{ color: theme.colors.primary }}></i> Servicios Populares
          </CardTitle>
          <ProgressList>
            {displayServices.map((s, idx) => {
              const pct = maxServiceCount > 0 ? Math.round((s.count / maxServiceCount) * 100) : 50;
              return (
                <ProgressItem key={s.name}>
                  <ProgressHeader>
                    <ProgressName>{s.name}</ProgressName>
                    <ProgressVal>{s.count} Citas</ProgressVal>
                  </ProgressHeader>
                  <ProgressBarContainer>
                    <ProgressBarFill $percentage={`${pct}%`} />
                  </ProgressBarContainer>
                </ProgressItem>
              );
            })}
          </ProgressList>
        </GlassCard>
      </LayoutGrid>

      <GlassCard>
        <CardTitle style={{ marginBottom: '1.25rem' }}>
          <i className="fas fa-star" style={{ color: theme.colors.primary }}></i> Rendimiento de Estilistas
        </CardTitle>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>Nombre Estilista</Th>
                <Th>Calificación Promedio</Th>
                <Th>Clientes Atendidos</Th>
                <Th>Progreso de Ventas</Th>
              </tr>
            </thead>
            <tbody>
              {stylists.map(st => (
                <tr key={st.name}>
                  <Td style={{ fontWeight: 650, color: theme.colors.text }}>{st.name}</Td>
                  <Td>
                    <span style={{ color: '#f39c12', fontWeight: 700 }}>
                      <i className="fas fa-star" style={{ marginRight: '6px' }}></i>{st.rating}
                    </span>
                  </Td>
                  <Td>{st.clients} Clientes</Td>
                  <Td style={{ width: '40%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <ProgressBarContainer style={{ flexGrow: 1, height: '8px' }}>
                        <ProgressBarFill $percentage={st.rating} />
                      </ProgressBarContainer>
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: theme.colors.textMuted }}>{st.rating}</span>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      </GlassCard>
    </PageContainer>
  );
}

export default Reports;
