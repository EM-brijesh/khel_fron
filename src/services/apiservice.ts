import { API_BASE_URL } from '../config/constants';

interface RequestOptions extends RequestInit {
  token?: boolean;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: 'An error occurred while processing your request'
      }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  private getHeaders(options: RequestOptions = {}): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (options.token) {
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(options),
        credentials: 'include',
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch: ${error.message}`);
      }
      throw new Error('Failed to fetch');
    }
  }

  async post<T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(options),
        credentials: 'include',
        body: JSON.stringify(data),
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to post: ${error.message}`);
      }
      throw new Error('Failed to post');
    }
  }

  async put<T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(options),
        credentials: 'include',
        body: JSON.stringify(data),
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update: ${error.message}`);
      }
      throw new Error('Failed to update');
    }
  }

  async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders(options),
        credentials: 'include',
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete: ${error.message}`);
      }
      throw new Error('Failed to delete');
    }
  }
}

export const apiService = new ApiService(API_BASE_URL);