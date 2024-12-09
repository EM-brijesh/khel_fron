import React, { useState } from 'react';
import { Calendar, MapPin, Users, Loader2, Share2, Check } from 'lucide-react';
import { Event } from '../types';
import { eventsService } from '../services/eventservice';

interface EventCardProps {
  event: Event;
  onRefresh?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onRefresh }) => {
  const [isJoining, setIsJoining] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCountInput, setShowCountInput] = useState(false);
  const [count, setCount] = useState(1);
  const [, setShareLink] = useState<string | null>(null);
  const [showShareSuccess, setShowShareSuccess] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Calculate available spots
  const spotsAvailable = event.count;
  const totalSpots = event.totalSpots;

  const handleJoin = async () => {
    if (!showCountInput) {
      setShowCountInput(true);
      return;
    }

    if (count > spotsAvailable) {
      setError(`Only ${spotsAvailable} spots available`);
      return;
    }

    try {
      setIsJoining(true);
      setError(null);
      await eventsService.joinEvent(event.eventname, count);
      setShowCountInput(false);
      if (onRefresh) {
        onRefresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join event');
    } finally {
      setIsJoining(false);
    }
  };

  const handleShare = async () => {
    try {
      setIsSharing(true);
      setError(null);
      const response = await eventsService.getShareLink(event._id);
      setShareLink(response.shareLink);
      await navigator.clipboard.writeText(window.location.origin + response.shareLink);
      setShowShareSuccess(true);
      setTimeout(() => setShowShareSuccess(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate share link');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative">
      <button
        onClick={handleShare}
        className="absolute top-4 right-4 p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
        disabled={isSharing}
      >
        {isSharing ? (
          <Loader2 size={20} className="animate-spin" />
        ) : showShareSuccess ? (
          <Check size={20} className="text-green-500" />
        ) : (
          <Share2 size={20} />
        )}
      </button>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 pr-12">{event.eventname}</h3>
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-600">
            <Calendar size={18} className="mr-2" />
            <span>{formatDate(event.time)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin size={18} className="mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users size={18} className="mr-2" />
            {spotsAvailable === 0 ? (
              <span className="text-red-600 font-semibold">This Ground is full</span>
            ) : (
              <span>{spotsAvailable} spots left out of {totalSpots}</span>
            )}
          </div>
        </div>
        {error && (
          <div className="mt-2 text-sm text-red-600">
            {error}
          </div>
        )}
        {showCountInput && spotsAvailable > 0 && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of spots needed:
            </label>
            <input
              type="number"
              min="1"
              max={spotsAvailable}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(spotsAvailable, parseInt(e.target.value) || 1)))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        )}
        <button 
          onClick={handleJoin}
          disabled={isJoining || spotsAvailable === 0}
          className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isJoining ? (
            <>
              <Loader2 size={20} className="animate-spin mr-2" />
              Joining...
            </>
          ) : spotsAvailable === 0 ? (
            'This Ground is full'
          ) : showCountInput ? (
            'Confirm Join'
          ) : (
            'Join Event'
          )}
        </button>
      </div>
    </div>
  );
};