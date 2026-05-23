import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme, fadeInUp } from '../styles/theme';

const ServicesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Badge = styled.span`
  display: inline-block;
  color: ${theme.colors.primary};
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
  font-family: ${theme.fonts.secondary};
`;

const Title = styled.h1`
  color: ${theme.colors.text};
  margin-bottom: 0.75rem;
  font-size: 3.25rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  color: ${theme.colors.textMuted};
  font-size: 1.4rem;
  max-width: 500px;
  margin: 0 auto;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  background: ${theme.colors.cardBg};
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.shadows.small};
  overflow: hidden;
  transition: all ${theme.transitions.normal};
  border: 1px solid rgba(0, 0, 0, 0.04);
  animation: ${fadeInUp} 0.6s ease-out both;
  animation-delay: ${props => props.$delay || '0s'};

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.cardHover};

    img, .img-placeholder {
      transform: scale(1.08);
    }
  }
`;

const ImageWrapper = styled.div`
  height: 220px;
  overflow: hidden;
  position: relative;
`;

const ServiceImage = styled.div`
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${props => props.$image ? `url(${props.$image})` : `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`};
  transition: transform 0.6s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3.5rem;
`;

const PriceTag = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(8px);
  color: ${theme.colors.navbarLinkHover};
  padding: 0.35rem 1rem;
  border-radius: ${theme.borderRadius.pill};
  font-weight: 700;
  font-size: 1.2rem;
  border: 1px solid rgba(153, 101, 21, 0.2);
`;

const ServiceContent = styled.div`
  padding: 1.5rem 1.75rem 1.75rem;
`;

const ServiceName = styled.h3`
  color: ${theme.colors.text};
  margin-bottom: 0.5rem;
  font-size: 1.6rem;
  font-family: ${theme.fonts.secondary};
  font-weight: 600;
`;

const ServiceDescription = styled.p`
  color: ${theme.colors.textMuted};
  line-height: 1.6;
  font-size: 1.25rem;
`;

const ServiceFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0,0,0,0.07);
`;

const BookButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: linear-gradient(135deg, ${theme.colors.primaryDark}, ${theme.colors.accent});
  color: #fff;
  border: none;
  border-radius: ${theme.borderRadius.pill};
  padding: 0.6rem 1.4rem;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 3px 14px rgba(153,101,21,0.3);
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 22px rgba(201,148,42,0.5);
    filter: brightness(1.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const NoServices = styled.div`
  text-align: center;
  padding: 3rem;
  background: ${theme.colors.contentBgLight};
  border-radius: ${theme.borderRadius.medium};
  color: ${theme.colors.textMuted};
`;

// Datos de ejemplo de servicios
const sampleServices = [
  {
    id: 1,
    name: 'Manicura Clásica',
    description: 'Cuidado completo de uñas con esmalte de alta calidad',
    price: '$30.000',
    image: '/images/services/manicura_clasica.jpg'
  },
  {
    id: 2,
    name: 'Tintura',
    description: 'Coloración profesional con productos premium',
    price: '$150.000',
    image: '/images/services/tintura.webp'
  },
  {
    id: 3,
    name: 'Tratamiento Capilar',
    description: 'Tratamiento profundo para revitalizar tu cabello',
    price: '$60.000',
    image: '/images/services/tratamiento_capilar.webp'
  },
  {
    id: 4,
    name: 'Corte de Cabello',
    description: 'Corte profesional según tu estilo preferido',
    price: '$35.000',
    image: '/images/services/corte_dama.jpg'
  },
  {
    id: 5,
    name: 'Peinado de Evento',
    description: 'Peinado elegante para ocasiones especiales',
    price: '$200.000',
    image: '/images/services/peinado_evento.jpg'
  },
  {
    id: 6,
    name: 'Pedicure',
    description: 'Pedicure profesional para cuidar, hidratar y embellecer tus pies',
    price: '$70.000',
    image: '/images/services/pedicure.jpg'
  },
];

function Services() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedServices = localStorage.getItem('services');
    if (!storedServices) {
      localStorage.setItem('services', JSON.stringify(sampleServices));
      setServices(sampleServices);
    } else {
      setServices(JSON.parse(storedServices));
    }
  }, []);

  const handleBook = (serviceName) => {
    navigate('/appointments/new', { state: { service: serviceName } });
  };

  return (
    <ServicesContainer>
      <Header>
        <Badge>Catálogo</Badge>
        <Title>Nuestros Servicios</Title>
        <Subtitle>Descubre todos los tratamientos que tenemos para ti</Subtitle>
      </Header>

      {services.length === 0 ? (
        <NoServices>
          Actualmente no hay servicios para mostrar. ¡Vuelve pronto!
        </NoServices>
      ) : (
        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard key={service.id} $delay={`${index * 0.1}s`}>
              <ImageWrapper>
                <ServiceImage $image={service.image}>
                  {!service.image && '💆'}
                </ServiceImage>
                <PriceTag>{service.price}</PriceTag>
              </ImageWrapper>
              <ServiceContent>
                <ServiceName>{service.name}</ServiceName>
                <ServiceDescription>{service.description}</ServiceDescription>
                <ServiceFooter>
                  <BookButton
                    id={`book-service-${service.id}`}
                    onClick={() => handleBook(service.name)}
                  >
                    📅 Agendar
                  </BookButton>
                </ServiceFooter>
              </ServiceContent>
            </ServiceCard>
          ))}
        </ServicesGrid>
      )}
    </ServicesContainer>
  );
}

export default Services;
