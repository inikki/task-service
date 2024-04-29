declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;

      MYSQL_ROOT_PASSWORD: string;
      MYSQL_DATABASE: string;
      MYSQL_USER: string;
      MYSQL_PASSWORD: string;
      MYSQL_HOST: string;
      MYSQL_PORT: string;
    }
  }
}

export {};
