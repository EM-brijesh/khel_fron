import { Event } from '../types';

const API_URL = 'https://khel-bac.onrender.com/api';

export interface JoinedEvent {
  eventId: Event;
  _id: string;
}

export interface JoinedEventsResponse {
  message: string;
  events: JoinedEvent[];
}

export const userService = {
  async getCreatedEvents(): Promise<Event[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/events`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch created events');
    }

    return response.json();
  },

  async getJoinedEvents(): Promise<JoinedEventsResponse> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/joinedevents`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch joined events');
    }

    return response.json();
  }
};