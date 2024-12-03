import React, { useState } from 'react';
import { Calendar, MapPin, Users, Loader2 } from 'lucide-react';
import { Event } from '../types';
import { eventsService } from '../services/eventservice';

interface EventCardProps {
  event: Event;
  onRefresh?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onRefresh }) => {
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCountInput, setShowCountInput] = useState(false);
  const [count, setCount] = useState(1);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleJoin = async () => {
    if (!showCountInput) {
      setShowCountInput(true);
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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{event.eventname}</h3>
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
            <span>{event.participants.length}/{event.count} participants</span>
          </div>
        </div>
        {error && (
          <div className="mt-2 text-sm text-red-600">
            {error}
          </div>
        )}
        {showCountInput && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of spots needed:
            </label>
            <input
              type="number"
              min="1"
              max={event.count - event.participants.length}
              value={count}
              onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        )}
        <button 
          onClick={handleJoin}
          disabled={isJoining || event.participants.length >= event.count}
          className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isJoining ? (
            <>
              <Loader2 size={20} className="animate-spin mr-2" />
              Joining...
            </>
          ) : event.participants.length >= event.count ? (
            'Event Full'
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