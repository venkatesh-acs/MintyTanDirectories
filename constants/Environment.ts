export const ENV = {
  DEV: 'dev',
  VAL: 'val',
  PROD: 'prod'
} as const;

export type EnvironmentType = typeof ENV[keyof typeof ENV];

export const validateEnvironmentPassword = (password: string): boolean => {
  // Password format: jaMMYY (e.g., ja0825 for August 2025)
  const passwordRegex = /^ja(0[1-9]|1[0-2])\d{2}$/;
  return passwordRegex.test(password);
};

export const getEnvironmentConfig = (env: EnvironmentType) => {
  switch (env) {
    case ENV.DEV:
      return {
        name: 'Development',
        apiUrl: 'https://dev-api.example.com',
        color: '#28a745'
      };
    case ENV.VAL:
      return {
        name: 'Validation',
        apiUrl: 'https://val-api.example.com',
        color: '#ffc107'
      };
    case ENV.PROD:
      return {
        name: 'Production',
        apiUrl: 'https://api.example.com',
        color: '#dc3545'
      };
    default:
      return {
        name: 'Development',
        apiUrl: 'https://dev-api.example.com',
        color: '#28a745'
      };
  }
};

export const getCurrentEnvironmentPassword = (): string => {
  const now = new Date();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear().toString().slice(-2);
  return `ja${month}${year}`;
};