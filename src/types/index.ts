export interface Event {
  _id: string;
  eventname: string;
  location: string;
  count: number;
  totalSpots: number;
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

export interface ShareResponse {
  message: string;
  event: {
    eventId: string;
    eventname: string;
    location: string;
    time: string;
    remainingSpots: number;
  };
  shareLink: string;
}

export interface JoinEventResponse {
  message: string;
  event: {
    eventname: string;
    location: string;
    time: string;
    remainingSpots: number;
    totalSpots: number;
    totalParticipants: number;
    spotsReserved: number;
  };
}