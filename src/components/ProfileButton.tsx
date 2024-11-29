import React from 'react';
import { UserCircle } from 'lucide-react';

interface ProfileButtonProps {
  onClick: () => void;
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-colors duration-200"
      aria-label="Open profile menu"
    >
      <UserCircle size={24} />
    </button>
  );
};