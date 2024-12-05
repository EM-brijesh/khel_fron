import React, { useEffect, useState } from 'react';
import { Event } from '../types';
import { EventCard } from './Card';
import { Loader2 } from 'lucide-react';
import { eventsService } from '../services/eventservice';

interface EventListProps {
  refreshTrigger?: number;
  events?: Event[];
  title?: string;
}

export const EventList: React.FC<EventListProps> = ({ refreshTrigger = 0, events: propEvents, title }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    if (propEvents) {
      setEvents(propEvents);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await eventsService.getEvents();
      setEvents(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [refreshTrigger, propEvents]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {title ? `No ${title.toLowerCase()} found.` : 'No Khel found in your area. Try Creating one?'}
      </div>
    );
  }

  return (
    <div>
      {title && <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard 
            key={event._id} 
            event={event}
            onRefresh={fetchEvents}
          />
        ))}
      </div>
    </div>
  );
}