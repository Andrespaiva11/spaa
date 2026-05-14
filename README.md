# Essence De Toi - Frontend React

Proyecto frontend migrado de Spring Boot/Thymeleaf a Vite + React con styled-components.

## Tecnologías

- React 19.2.4
- Vite 8.0.4
- Styled Components 6.4.0
- React Router DOM 7.1.1

## Instalación

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Ejecutar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Construir para producción:
   ```bash
   npm run build
   ```

## Estructura del Proyecto

```
src/
├── components/       # Componentes reutilizables (Navbar, Footer, Layout)
├── contexts/         # Contextos de React (AuthContext)
├── pages/           # Páginas de la aplicación (Home, Login, Register, Dashboard, Services)
├── styles/          # Estilos globales y tema (theme.js)
├── App.jsx          # Configuración de rutas
└── main.jsx         # Punto de entrada
```

## Características

- Sistema de routing con React Router
- Autenticación con Context API
- Estilos con Styled Components
- Diseño responsivo
- Tema global con variables de colores

## Próximos Pasos

- Conectar con la API del backend
- Implementar formularios de citas
- Agregar página de administración
- Implementar gestión de perfiles in your project.
