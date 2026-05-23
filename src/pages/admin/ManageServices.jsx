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

const SearchContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  max-width: 400px;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: ${theme.borderRadius.pill};
  border: 1px solid rgba(153, 101, 21, 0.15);
  box-shadow: ${theme.shadows.small};
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 1.05rem;
  background: transparent;
  color: ${theme.colors.text};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
`;

const ServiceCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.large};
  border: 1px solid rgba(153, 101, 21, 0.12);
  box-shadow: ${theme.shadows.medium};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${theme.shadows.cardHover};
  }
`;

const CardHeader = styled.div`
  height: 160px;
  background: ${props => props.$image ? `url(${props.$image})` : `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`};
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.15);
  }
`;

const PriceBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(8px);
  color: ${theme.colors.navbarLinkHover};
  padding: 0.35rem 1rem;
  border-radius: ${theme.borderRadius.pill};
  font-weight: 700;
  font-size: 1.1rem;
  border: 1px solid rgba(153, 101, 21, 0.25);
  z-index: 2;
`;

const CardBody = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ServiceName = styled.h3`
  font-size: 1.45rem;
  color: ${theme.colors.primaryDark};
  margin-bottom: 0.75rem;
  font-family: ${theme.fonts.secondary};
  font-weight: 700;
`;

const ServiceDesc = styled.p`
  color: rgba(0,0,0,0.65);
  font-size: 1.05rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
  border-top: 1px solid rgba(0,0,0,0.06);
  padding-top: 1rem;
`;

const CardBtn = styled.button`
  flex: 1;
  padding: 0.6rem 1rem;
  border-radius: ${theme.borderRadius.pill};
  font-weight: 700;
  font-size: 0.95rem;
  border: none;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  background: ${props => props.$danger ? 'rgba(231, 76, 60, 0.08)' : 'rgba(153, 101, 21, 0.08)'};
  color: ${props => props.$danger ? theme.colors.danger : theme.colors.primary};
  border: 1px solid ${props => props.$danger ? 'rgba(231, 76, 60, 0.2)' : 'rgba(153, 101, 21, 0.2)'};

  &:hover {
    background: ${props => props.$danger ? 'rgba(231, 76, 60, 0.15)' : 'rgba(153, 101, 21, 0.15)'};
    transform: translateY(-1px);
  }
`;

// Modal Components
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
  max-width: 550px;
  box-shadow: ${theme.shadows.xl};
  animation: ${scaleIn} 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  max-height: 90vh;
  overflow-y: auto;
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

const Textarea = styled.textarea`
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.12);
  font-size: 1.1rem;
  outline: none;
  resize: vertical;
  min-height: 100px;

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(153,101,21,0.1);
  }
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

function ManageServices() {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [editingService, setEditingService] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });

  useEffect(() => {
    const stored = localStorage.getItem('services');
    if (!stored) {
      localStorage.setItem('services', JSON.stringify(sampleServices));
      setServices(sampleServices);
    } else {
      setServices(JSON.parse(stored));
    }
  }, []);

  const saveServices = (updated) => {
    localStorage.setItem('services', JSON.stringify(updated));
    setServices(updated);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el servicio "${name}"?`)) {
      const updated = services.filter(s => s.id !== id);
      saveServices(updated);
    }
  };

  const handleEditClick = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      image: service.image || ''
    });
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setEditingService(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      image: ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar formato de precio
    const priceRegex = /^\$\d{1,3}(\.\d{3})*$/;
    if (!priceRegex.test(formData.price)) {
      alert('El precio debe comenzar con "$" y usar puntos para miles. Ejemplo: $35.000');
      return;
    }

    if (editingService) {
      // Edit
      const updated = services.map(s => {
        if (s.id === editingService.id) {
          return {
            ...s,
            name: formData.name,
            description: formData.description,
            price: formData.price,
            image: formData.image || null
          };
        }
        return s;
      });
      saveServices(updated);
    } else {
      // Add new
      const nextId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
      const newService = {
        id: nextId,
        name: formData.name,
        description: formData.description,
        price: formData.price,
        image: formData.image || null
      };
      saveServices([...services, newService]);
    }
    setIsModalOpen(false);
  };

  const filteredServices = services.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageContainer>
      <HeaderSection>
        <TitleGroup>
          <Title>Gestionar Servicios</Title>
          <Subtitle>Administra la oferta de tratamientos, masajes y peinados del spa</Subtitle>
        </TitleGroup>
        <ActionButton onClick={handleAddClick}>
          <i className="fas fa-plus"></i> Agregar Servicio
        </ActionButton>
      </HeaderSection>

      <SearchContainer>
        <i className="fas fa-search" style={{ color: theme.colors.primary, opacity: 0.6 }}></i>
        <SearchInput 
          type="text" 
          placeholder="Buscar servicios..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </SearchContainer>

      {filteredServices.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: theme.borderRadius.large, border: '1px solid rgba(153, 101, 21, 0.1)' }}>
          <p style={{ color: theme.colors.textMuted, fontSize: '1.2rem' }}>No se encontraron servicios que coincidan con tu búsqueda.</p>
        </div>
      ) : (
        <Grid>
          {filteredServices.map(s => (
            <ServiceCard key={s.id}>
              <CardHeader $image={s.image}>
                {!s.image && '💆'}
                <PriceBadge>{s.price}</PriceBadge>
              </CardHeader>
              <CardBody>
                <ServiceName>{s.name}</ServiceName>
                <ServiceDesc>{s.description}</ServiceDesc>
                <ButtonRow>
                  <CardBtn onClick={() => handleEditClick(s)}>
                    <i className="fas fa-edit"></i> Editar
                  </CardBtn>
                  <CardBtn $danger onClick={() => handleDelete(s.id, s.name)}>
                    <i className="fas fa-trash-alt"></i> Eliminar
                  </CardBtn>
                </ButtonRow>
              </CardBody>
            </ServiceCard>
          ))}
        </Grid>
      )}

      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalTitle>{editingService ? 'Editar Servicio' : 'Agregar Nuevo Servicio'}</ModalTitle>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Nombre del Servicio</Label>
                <Input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej. Masaje Relajante"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="price">Precio (Formato: $XX.XXX)</Label>
                <Input
                  type="text"
                  id="price"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Ej. $45.000"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="image">URL de la Imagen (Opcional)</Label>
                <Input
                  type="text"
                  id="image"
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  placeholder="Ej. /images/services/masaje.jpg o URL web"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="description">Descripción del Servicio</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Escribe una breve descripción del servicio y sus beneficios..."
                  required
                />
              </FormGroup>

              <ModalButtons>
                <CancelBtn type="button" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </CancelBtn>
                <SubmitBtn type="submit">
                  {editingService ? 'Guardar Cambios' : 'Crear Servicio'}
                </SubmitBtn>
              </ModalButtons>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
}

export default ManageServices;
