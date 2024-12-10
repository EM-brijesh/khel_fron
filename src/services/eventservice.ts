import { Event } from '../types';
import { API_BASE_URL } from '../config/constants';

export const eventsService = {
  async getEvents(): Promise<Event[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/nearbyevents`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch events');
      }

      return response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch events');
    }
  },

  async createEvent(eventData: Omit<Event, '_id' | 'userId' | 'participants'>): Promise<Event> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/addevent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          ...eventData,
          totalSpots: eventData.count
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create event');
      }

      return response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to create event');
    }
  },

  async joinEvent(eventname: string, count: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/joinevent`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: eventname,
          count: count
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to join event');
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to join event');
    }
  },

  // eventsService.ts
// eventsService.ts
// eventsService.ts
async getShareLink(eventId: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/public/share/${eventId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to generate share link');
    }

    // Get the frontend domain dynamically
    const frontendUrl = window.location.origin;  // This will give the current domain (e.g., http://localhost:5173 or https://khel-front.vercel.app)

    // Return the constructed frontend URL for the event details page
    return `${frontendUrl}/events/${eventId}`;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to generate share link');
  }
}



}