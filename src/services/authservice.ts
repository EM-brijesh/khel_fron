import { AuthResponse, LoginData, UserInfo } from '../types';

const API_URL = 'https://khel-bac.onrender.com/auth';

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Authentication failed');
    }

    const result = await response.json();
    if (result.token) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('location', result.location);
    }
    return result;
  },

  async register(data: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
        location: data.location,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const result = await response.json();
    return result;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('location');
  },

  getToken() {
    return localStorage.getItem('token');
  },

  getUserInfo(): UserInfo {
    return {
      username: localStorage.getItem('username'),
      location: localStorage.getItem('location'),
    };
  },
};