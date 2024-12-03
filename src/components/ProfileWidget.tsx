import React, { useState } from 'react';
import { ProfileButton } from './ProfileButton';
import { ProfilePopup } from './ProfilePopup';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authservice';

export const ProfileWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const userInfo = authService.getUserInfo();

  const handleLogout = () => {
    authService.logout();
    navigate('/auth');
  };

  return (
    <div className="fixed bottom-8 right-8">
      <ProfileButton onClick={() => setIsOpen(true)} />
      {isOpen && (
        <ProfilePopup
          username={userInfo.username || 'User'}
          location={userInfo.location || 'Not specified'}
          onClose={() => setIsOpen(false)}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};