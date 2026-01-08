
export enum AppView {
  LANDING = 'LANDING',
  ACCESS_TYPE = 'ACCESS_TYPE',
  AGENT_LOGIN = 'AGENT_LOGIN',
  CHIEF_LOGIN = 'CHIEF_LOGIN',
  DASHBOARD = 'DASHBOARD'
}

export enum WonderType {
  VISUAL_PATTERN = 'VISUAL_PATTERN', // Formerly Wonder-5
  VECTOR_PATH = 'VECTOR_PATH',      // Formerly Wonder-7
  SIGNAL_CIPHER = 'SIGNAL_CIPHER'   // Formerly Wonder-9
}

export interface UserSession {
  role: 'AGENT' | 'CHIEF';
  username?: string;
}

export interface GroundingSource {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri: string;
    title: string;
  };
}
