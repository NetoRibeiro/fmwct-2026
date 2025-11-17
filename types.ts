export interface Team {
  name: string;
  code: string;
}

export interface Match {
  id: number;
  group: string;
  teamA: Team;
  teamB: Team;
  date: string;
  stadium: string;
  city: string;
  country: string;
  scoreA: number | null;
  scoreB: number | null;
  status: 'finished' | 'scheduled' | 'inprogress';
}

export interface Group {
  name: string;
  teams: Team[];
}

export interface Stadium {
  name: string;
  city: string;
  country: string;
  capacity: number;
  image: string;
}

export interface User {
  username: string;
}

export interface Prediction {
  matchId: number;
  scoreA: number;
  scoreB: number;
}

export type Tab = 'home' | 'groups' | 'stadiums';
