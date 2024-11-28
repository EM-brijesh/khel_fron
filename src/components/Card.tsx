import { Calendar, MapPin, Users } from 'lucide-react';
import { useState } from 'react';
import { Event } from '../types';
import { eventsService } from '../services/eventservice'; // Import eventsService

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const [count, setCount] = useState<number | string>(''); // Can be string or number
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // To show any error messages

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Handle the Join button click - Open modal
  const handleJoinEvent = () => {
    setIsModalOpen(true); // Open the modal to ask for count
  };

  // Handle the submission of count
  const handleSubmit = async () => {
    // Convert count to number
    const parsedCount = Number(count);

    // Validate that parsedCount is a valid number and greater than 0
    if (!isNaN(parsedCount) && parsedCount > 0) {
      try {
        // Call the joinEvent function from eventsService
        const response = await eventsService.joinEvent(event.eventname, parsedCount);

        // If successful, show success and close the modal
        alert('Successfully joined the event!');
        setIsModalOpen(false); // Close the modal
      } catch (error: any) {
        setErrorMessage(error.message || 'An error occurred while joining the event.');
      }
    } else {
      setErrorMessage('Please enter a valid count.');
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
        <button
          className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
          onClick={handleJoinEvent} // Open modal on click
        >
          Join Event
        </button>
      </div>

      {/* Modal to ask for count */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h3 className="text-xl font-semibold">Enter the count of participants</h3>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder="Enter count"
              className="mt-4 p-2 border border-gray-300 rounded-md w-full"
            />
            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
            <div className="mt-4 flex justify-between">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                onClick={() => setIsModalOpen(false)} // Close modal without action
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md"
                onClick={handleSubmit} // Submit count
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
