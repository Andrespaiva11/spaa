import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import StylistDashboard from './pages/StylistDashboard';
import Services from './pages/Services';
import BookingForm from './components/BookingForm';
import MyAppointments from './pages/MyAppointments';
import Profile from './pages/Profile';
import { useEffect } from 'react';

// Admin page imports
import ManageUsers from './pages/admin/ManageUsers';
import ManageServices from './pages/admin/ManageServices';
import AllAppointments from './pages/admin/AllAppointments';
import Reports from './pages/admin/Reports';

function ContactPage({ isAuthenticated }) {
  const location = useLocation();

  useEffect(() => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return <Home isAuthenticated={isAuthenticated} />;
}

function NewAppointmentPage({ isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <BookingForm />;
}

function MyAppointmentsPage({ isAuthenticated, user }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <MyAppointments user={user} />;
}

function DashboardWrapper({ user }) {
  if (user?.role === 'ADMIN') {
    return <AdminDashboard user={user} />;
  }
  if (user?.role === 'STYLIST') {
    return <StylistDashboard user={user} />;
  }
  return <Dashboard user={user} />;
}

function App() {
  const { user, isAuthenticated, login, logout, register } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/contact') {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Layout isAuthenticated={isAuthenticated} user={user} onLogout={logout} />}>
        <Route index element={<Home isAuthenticated={isAuthenticated} />} />
        <Route path="login" element={<Login onLogin={login} />} />
        <Route path="register" element={<Register onRegister={register} />} />
        <Route path="dashboard" element={isAuthenticated ? <DashboardWrapper user={user} /> : <Navigate to="/login" replace />} />
        <Route path="admin/dashboard" element={isAuthenticated && user?.role === 'ADMIN' ? <AdminDashboard user={user} /> : <Navigate to="/login" replace />} />
        <Route path="admin/users" element={isAuthenticated && user?.role === 'ADMIN' ? <ManageUsers /> : <Navigate to="/login" replace />} />
        <Route path="admin/services" element={isAuthenticated && user?.role === 'ADMIN' ? <ManageServices /> : <Navigate to="/login" replace />} />
        <Route path="appointments/all" element={isAuthenticated && user?.role === 'ADMIN' ? <AllAppointments /> : <Navigate to="/login" replace />} />
        <Route path="admin/reports" element={isAuthenticated && user?.role === 'ADMIN' ? <Reports /> : <Navigate to="/login" replace />} />
        <Route path="stylist/dashboard" element={isAuthenticated && user?.role === 'STYLIST' ? <StylistDashboard user={user} /> : <Navigate to="/login" replace />} />
        <Route path="services" element={<Services />} />
        <Route path="contact" element={<ContactPage isAuthenticated={isAuthenticated} />} />
        <Route path="appointments/new" element={<NewAppointmentPage isAuthenticated={isAuthenticated} />} />
        <Route path="appointments/my" element={<MyAppointmentsPage isAuthenticated={isAuthenticated} user={user} />} />
        <Route path="profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
