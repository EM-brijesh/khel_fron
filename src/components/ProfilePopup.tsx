import React, { useRef, useEffect } from 'react';
import { X, MapPin, LogOut } from 'lucide-react';

interface ProfilePopupProps {
  username: string;
  location: string;
  onClose: () => void;
  onLogout: () => void;
}

export const ProfilePopup: React.FC<ProfilePopupProps> = ({
  username,
  location,
  onClose,
  onLogout,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={popupRef}
      className="fixed bottom-24 right-8 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden transform transition-all duration-200 ease-out"
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{username}</h3>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin size={16} className="mr-1" />
              <span className="text-sm">{location}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close profile popup"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="border-t border-gray-100 pt-3">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};