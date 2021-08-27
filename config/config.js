require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: '1234',
    database: 'node_health',
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone: '+09:00',
  },
  test: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'node_health',
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone: '+09:00',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+09:00',
  },
};
