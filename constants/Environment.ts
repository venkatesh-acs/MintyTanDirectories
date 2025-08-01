
export const ENV = {
  DEV: 'dev',
  VAL: 'val',
  PROD: 'prod'
} as const;

export type Environment = typeof ENV[keyof typeof ENV];

// Password for accessing environment selection
const ENV_PASSWORD = 'admin123';

export const validateEnvPassword = (password: string): boolean => {
  return password === ENV_PASSWORD;
};

export const getEnvironmentDisplayName = (env: Environment): string => {
  switch (env) {
    case ENV.DEV:
      return 'Development';
    case ENV.VAL:
      return 'Validation';
    case ENV.PROD:
      return 'Production';
    default:
      return 'Unknown';
  }
};
