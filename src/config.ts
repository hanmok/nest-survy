export const config = () => ({
  port: process.env.PORT,
  database: {
    connectionLimit: 100,
    type: 'mysql',
    host: 'us-cdbr-east-06.cleardb.net',
    port: 3306,
    username: 'bce8ef11b95d3a',
    password: 'c3fa51f1',
    database: 'heroku_3df4ab91447196b',
    synchronize: false,
    logging: false,
    entities: ['dist/**/*.entity.js'],
  },
});
