export enum Environment {
  Development = 'development',
  Production = 'production',
}

export interface Config {
  nodeEnv: Environment;
  db: {
    mysql: {
      rootPassword: string;
      databaseName: string;
      userName: string;
      password: string;
      host: string;
      port: number;
    };
  };
}
