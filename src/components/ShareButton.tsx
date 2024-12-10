import React, { useState } from 'react';
import { Share2, Check, Loader2, AlertCircle } from 'lucide-react';
import { eventsService } from '../services/eventservice';

interface ShareButtonProps {
  eventId: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ eventId }) => {
  const [isSharing, setIsSharing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShare = async () => {
    try {
      setIsSharing(true);
      setError(null);

      // Fetch the share link (string)
      const shareUrl = await eventsService.getShareLink(eventId);

      // Copy the shareable URL to the clipboard
      await navigator.clipboard.writeText(shareUrl);

      // Show success feedback
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error('Failed to share event:', error);
      setError('Failed to share event');
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="absolute top-4 right-4">
      {error && (
        <div className="absolute bottom-full right-0 mb-2 whitespace-nowrap bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm">
          {error}
        </div>
      )}
      <button
        onClick={handleShare}
        className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
        disabled={isSharing}
        title="Share event"
      >
        {isSharing ? (
          <Loader2 size={20} className="animate-spin" />
        ) : showSuccess ? (
          <Check size={20} className="text-green-500" />
        ) : error ? (
          <AlertCircle size={20} className="text-red-500" />
        ) : (
          <Share2 size={20} />
        )}
      </button>
    </div>
  );
};
