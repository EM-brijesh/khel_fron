import React, { useState } from 'react';
import { ProfileButton } from './ProfileButton';
import { ProfilePopup } from './ProfilePopup';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authservice';

export const ProfileWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/auth');
  };

  const { username, location } = authService.getUserInfo();

  return (
    <div className="fixed bottom-8 right-8">
      <ProfileButton onClick={() => setIsOpen(true)} />
      {isOpen && (
        <ProfilePopup
          username={username || 'User'}
          location={location || 'Not specified'}
          onClose={() => setIsOpen(false)}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};