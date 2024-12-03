export interface Event {
  _id: string;
  eventname: string;
  location: string;
  count: number;
  time: string;
  userId: string;
  participants: string[];
}

export interface LoginData {
  username: string;
  password: string;
  location?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  location: string;
}

export interface UserInfo {
  username: string | null;
  location: string | null;
}