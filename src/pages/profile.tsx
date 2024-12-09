import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { authService } from '../services/authservice';
import { userService } from '../services/userservice';
import { EventList } from '../components/EventList';
import { UserCircle2, MapPin, Mail, Calendar, Loader2 } from 'lucide-react';
import { Event } from '../types';

export const Profile = () => {
  const userInfo = authService.getUserInfo();
  const [createdEvents, setCreatedEvents] = useState<Event[]>([]);
  const [joinedEvents, setJoinedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        setLoading(true);
        const [createdEventsData, joinedEventsData] = await Promise.all([
          userService.getCreatedEvents(),
          userService.getJoinedEvents(),
        ]);

        setCreatedEvents(createdEventsData);
        setJoinedEvents(joinedEventsData.events.map(je => je.eventId));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchUserEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-indigo-600 h-32"></div>
          <div className="px-6 py-4 relative">
            <div className="absolute -top-12">
              <div className="bg-white p-2 rounded-full">
                <UserCircle2 size={80} className="text-indigo-600" />
              </div>
            </div>
            <div className="mt-12">
              <h1 className="text-2xl font-bold text-gray-900">{userInfo.username}</h1>
              <div className="mt-4 space-y-3">
                <div className="flex items-center text-gray-600">
                  <MapPin size={20} className="mr-2" />
                  <span>{userInfo.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail size={20} className="mr-2" />
                  <span>{userInfo.username}@example.com</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar size={20} className="mr-2" />
                  <span>Active Member</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="text-2xl font-bold text-indigo-600">{createdEvents.length}</div>
            <div className="text-sm text-gray-600">Events Created</div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="text-2xl font-bold text-indigo-600">{joinedEvents.length}</div>
            <div className="text-sm text-gray-600">Events Joined</div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="text-2xl font-bold text-indigo-600">
              {createdEvents.length + joinedEvents.length}
            </div>
            <div className="text-sm text-gray-600">Total Events</div>
          </div>
        </div>

        {error && (
          <div className="mt-8 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="mt-8 space-y-8">
          <EventList events={createdEvents} title="Created Events" />
          <EventList events={joinedEvents} title="Joined Events" />
        </div>
      </div>
    </div>
  );
};