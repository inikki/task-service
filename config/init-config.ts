import { Config, Environment } from './interface';

export default (): Config => ({
  nodeEnv: process.env.NODE_ENV as Environment,
  db: {
    mysql: {
      rootPassword: process.env.MYSQL_ROOT_PASSWORD,
      databaseName: process.env.MYSQL_DATABASE,
      userName: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
    },
  },
});
