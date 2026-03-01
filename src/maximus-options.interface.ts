export interface MaximusModuleOptions {
  token: string;
  /** Optional: set bot commands (e.g. [{ name: 'start', description: 'Start' }]) */
  commands?: Array<{ name: string; description: string }>;
  /** Classes decorated with @Update() to register as bot handlers (required for decorator API) */
  include?: Function[];
}
