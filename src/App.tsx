import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/home';
import { Auth } from './pages/auth';
import Dashboard from './pages/dashboard';
import { Profile } from './pages/profile';
import EventDetails from './pages/eventdetails';
import { authService } from './services/authservice';


const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = !!authService.getToken();
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } 
        />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;