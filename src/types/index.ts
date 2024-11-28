// export interface Event {
//     id: string;
//     title: string;
//     date: string;
//     location: string;
//     sport: string;
//     participants: number;
//     maxParticipants: number;
//     imageUrl: string;
//   }
  
  export interface User {
    isAuthenticated: boolean;
  }
  
  export interface LoginData {
    username: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: {
      id: string;
      username: string;
    };
  }
  export interface Event {
    _id: string;
    eventname: string;
    location: string;
    count: number;
    time: string;
    userId: string;
    participants: string[];
  }
  
  export interface User {
    isAuthenticated: boolean;
  }
  
  export interface LoginData {
    username: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: {
      id: string;
      username: string;
    };
  }