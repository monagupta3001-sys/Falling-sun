export type TrackId = 'game-dev' | 'web-dev' | 'robotics';

export interface TrackInfo {
  id: TrackId;
  name: string;
  tagline: string;
  description: string;
  accentColor: string;
  badgeBg: string;
  borderHover: string;
  techStack: string[];
  hardwareHighlight: string;
  sampleChallenges: string[];
  judgingFocus: string[];
}

export interface HardwareStation {
  id: 'ps5' | 'drones' | '3d-printers';
  name: string;
  subtitle: string;
  description: string;
  specs: { label: string; value: string }[];
  providedGear: string[];
  trackRelevance: string[];
  safetyGuidelines: string[];
  maxSimultaneousUnits: number;
}

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  category: 'kickoff' | 'sprint' | 'hardware' | 'workshop' | 'break' | 'judging';
  location: string;
  trackFocus?: string;
}

export interface DaySchedule {
  dayNumber: 1 | 2;
  dayTitle: string;
  subtitle: string;
  hoursCount: number;
  timeSpan: string;
  status: 'upcoming' | 'active' | 'completed';
  items: ScheduleItem[];
}

export interface RegisteredTeam {
  id: string;
  teamName: string;
  leadName: string;
  track: TrackId;
  teamSize: number;
  hardwareRequested: string[];
  projectConcept: string;
  registeredAt: string;
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro';
}

export interface RegistrationFormData {
  fullName: string;
  email: string;
  teamName: string;
  teamSize: number;
  track: TrackId;
  hardwareRequests: string[];
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro';
  projectConcept: string;
  githubUrl: string;
  dietaryPreference: string;
  tshirtSize: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  acceptRules: boolean;
}
