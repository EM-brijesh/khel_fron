import { UserCircle2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { authService } from '../services/authservice';

export const Header = () => {
  const location = useLocation();
  const isAuthenticated = !!authService.getToken();
  const userInfo = authService.getUserInfo();

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link 
          to={isAuthenticated ? "/dashboard" : "/"} 
          className="text-2xl font-bold text-indigo-600"
        >
          SportsMeet
        </Link>
        
        {!isAuthenticated && location.pathname !== '/auth' && (
          <Link 
            to="/auth" 
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            <UserCircle2 size={20} />
            Sign In
          </Link>
        )}

        {isAuthenticated && (
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              Welcome, {userInfo.username}
            </span>
            <Link 
              to="/profile" 
              className="text-indigo-600 hover:text-indigo-700"
            >
              <UserCircle2 size={24} />
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};