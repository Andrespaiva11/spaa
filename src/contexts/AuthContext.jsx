import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Usuarios predeterminados para pruebas
const PREDEFINED_USERS = [
  {
    username: 'admin',
    password: 'admin123',
    fullName: 'Administrador',
    email: 'admin@essencedetoi.com',
    role: 'ADMIN'
  },
  {
    username: 'tuki',
    password: 'tuki123',
    fullName: 'Tuki Gonzales',
    email: 'tuki@essencedetoi.com',
    role: 'CLIENT'
  },
  {
    username: 'estilista',
    password: 'estilista123',
    fullName: 'Estilista Demo',
    email: 'estilista@essencedetoi.com',
    role: 'STYLIST'
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un usuario almacenado en localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const storedUsers = localStorage.getItem('users');
    const userList = storedUsers ? JSON.parse(storedUsers) : PREDEFINED_USERS;

    const foundUser = userList.find(
      u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );

    if (foundUser) {
      const userData = {
        username: foundUser.username,
        fullName: foundUser.fullName,
        email: foundUser.email,
        role: foundUser.role
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, user: userData };
    }

    return { success: false, error: 'Credenciales inválidas' };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const register = (userData) => {
    const storedUsers = localStorage.getItem('users');
    const userList = storedUsers ? JSON.parse(storedUsers) : [...PREDEFINED_USERS];

    if (userList.some(u => u.username.toLowerCase() === userData.username.toLowerCase())) {
      throw new Error('El nombre de usuario ya existe');
    }

    userList.push(userData);
    localStorage.setItem('users', JSON.stringify(userList));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register, loading, PREDEFINED_USERS }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
