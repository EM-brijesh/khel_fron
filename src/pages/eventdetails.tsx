import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowLeft, Loader2, Share2 } from 'lucide-react';
import { Header } from '../components/Header';
import { apiService } from '../services/apiservice';

interface EventDetail {
  _id: string;
  eventname: string;
  location: string;
  time: string;
  count: number;
  totalSpots: number;
  participants: string[];
  userId: string;
}

const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [joining, setJoining] = useState<boolean>(false);
  const [showCountInput, setShowCountInput] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!eventId) {
        navigate('/');
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://khel-bac.onrender.com'}/api/events/${eventId}`);
        
        if (!response.ok) {
          throw new Error('Event not found');
        }

        const eventData = await response.json();
        setEvent(eventData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch event details');
        if (err instanceof Error && err.message === 'Event not found') {
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId, navigate]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
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
      setJoining(true);
      await apiService.post('/api/joinevent', {
        name: event?.eventname,
        count: count
      }, { token: true });

      const eventData = await apiService.get<EventDetail>(`/api/events/${eventId}`);
      setEvent(eventData);
      setShowCountInput(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join event');
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
          <Link
            to="/dashboard"
            className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Event not found</h2>
            <Link
              to="/dashboard"
              className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const availableSpots = event.count;
  const isFull = availableSpots === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-indigo-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">{event.eventname}</h1>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-5 h-5 mr-3 text-indigo-600" />
                  <span>{formatDate(event.time)}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-3 text-indigo-600" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Users className="w-5 h-5 mr-3 text-indigo-600" />
                  <span>
                    {event.participants.length} / {event.totalSpots} participants
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h3 className="font-semibold text-indigo-900 mb-2">
                    {isFull ? 'Event Status' : 'Spots Available'}
                  </h3>
                  <div className="text-3xl font-bold text-indigo-600">
                    {isFull ? 'This Ground is full' : `${availableSpots} spots left`}
                  </div>
                </div>

                {showCountInput && !isFull && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      How many spots do you need?
                    </label>
                    <input
                      type="number"
                      min="1"
                      max={availableSpots}
                      value={count}
                      onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                )}

                <button
                  onClick={handleJoin}
                  disabled={joining || isFull}
                  className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {joining ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Joining...
                    </>
                  ) : isFull ? (
                    'This Ground is full'
                  ) : showCountInput ? (
                    'Confirm Join'
                  ) : (
                    'Join Event'
                  )}
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                  }}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share Event
                </button>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Additional Information
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-600">
                  Join this exciting sports event at {event.location}! Connect with fellow
                  sports enthusiasts and make the most of your game time. Don't forget to
                  arrive a few minutes early to meet your teammates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;