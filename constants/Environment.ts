
export enum ENV {
  DEV = 'dev',
  VAL = 'val',
  PROD = 'prod'
}

export const validateEnvironmentPassword = (password: string): boolean => {
  // Password format: ja0825 (for August 2025)
  return password === 'ja0825';
};

export const getEnvironmentConfig = (env: ENV) => {
  switch (env) {
    case ENV.DEV:
      return {
        name: 'Development',
        baseUrl: 'https://dev-api.example.com',
        color: '#2196f3'
      };
    case ENV.VAL:
      return {
        name: 'Validation',
        baseUrl: 'https://val-api.example.com',
        color: '#ff9800'
      };
    case ENV.PROD:
      return {
        name: 'Production',
        baseUrl: 'https://api.example.com',
        color: '#f44336'
      };
    default:
      return {
        name: 'Development',
        baseUrl: 'https://dev-api.example.com',
        color: '#2196f3'
      };
  }
};
