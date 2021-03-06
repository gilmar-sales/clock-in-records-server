import * as dotenv from 'dotenv';
dotenv.config();

// environment
const NODE_ENV: string = process.env.NODE_ENV || 'development';

// postgres

// database
const DATABASE_SGBD = process.env.DATABASE_SGBD;
const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_PORT = process.env.DATABASE_PORT;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;

const DATABASE_URL: string = +process.env.DATABASE_PORT
  ? `postgres://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`
  : process.env.POSTGRES_URL;

const enviroment = {
  development: {
    type: DATABASE_SGBD,
    url: DATABASE_URL,
  },
  testing: {
    type: DATABASE_SGBD,
    url: DATABASE_URL,
  },
  staging: {
    type: DATABASE_SGBD,
    url: DATABASE_URL,
  },
  production: {
    type: DATABASE_SGBD,
    url: DATABASE_URL,
  },
};
const DATABASE = enviroment[NODE_ENV];

export { DATABASE };
