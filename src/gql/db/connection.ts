// import knew
import knex from 'knex';

export const connection = knex({
  client: 'mysql',
  connection: {
    host: 'us-cdbr-east-06.cleardb.net',
    port: 3306,
    user: 'bce8ef11b95d3a',
    password: 'c3fa51f1',
    database: 'heroku_3df4ab91447196b',
  },
});
