export interface AppConfig {
  pageTitle: string;
  pageDescription: string;
  companyName: string;

  supportsChatInput: boolean;
  supportsVideoInput: boolean;
  supportsScreenShare: boolean;
  isPreConnectBufferEnabled: boolean;

  logo: string;
  startButtonText: string;
  accent?: string;
  logoDark?: string;
  accentDark?: string;

  // for LiveKit Cloud Sandbox
  sandboxId?: string;
  agentName?: string;
}

export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'Voice Game Master',
  pageTitle: 'D&D Voice Adventure',
  pageDescription: 'Interactive voice-powered fantasy adventure with your AI Game Master',

  supportsChatInput: false,
  supportsVideoInput: false,
  supportsScreenShare: false,
  isPreConnectBufferEnabled: true,

  logo: '/lk-logo.svg',
  accent: '#7c3aed',
  logoDark: '/lk-logo-dark.svg',
  accentDark: '#8b5cf6',
  startButtonText: '🎲 Start Adventure',

  // for LiveKit Cloud Sandbox
  sandboxId: undefined,
  agentName: undefined,
};
