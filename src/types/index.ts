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



export interface UserInfo {
  username: string | null;
  location: string | null;
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
  location?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  location?: string;
}
 export interface PopupButtonProps {
  username: string;
  location: { lat: number; lng: number };
}
  export interface User {
    isAuthenticated: boolean;
  }
  
  export interface LoginData {
    username: string;
    password: string;
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
    location?: string;
  }
  

  
  export interface UserInfo {
    username: string | null;
    location: string | null;
  }