import { Event } from '../types';

const API_URL = 'http://localhost:3000/api';

export const eventsService = {
  async getEvents(): Promise<Event[]> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/getallevents`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }

    return response.json();
  },

  async createEvent(eventData: Omit<Event, '_id' | 'userId' | 'participants'>): Promise<Event> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/addevent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create event');
    }

    return response.json();
  },
};