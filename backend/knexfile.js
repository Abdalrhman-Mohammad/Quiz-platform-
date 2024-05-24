// // Update with your config settings.

// /**
//  * @type { Object.<string, import("knex").Knex.Config> }
//  */
module.exports = {

  development : {
    client : 'sqlite3',
    connection : {filename : './dev.sqlite3'},
    useNullAsDefault : true,
    pool : {min : 2, max : 10},
    migrations : {tableName : 'knex_migrations'}
  },

  staging : {
    client : 'postgresql',
    connection : {database : 'my_db', user : 'username', password : 'password'},
    pool : {min : 2, max : 10},
    migrations : {tableName : 'knex_migrations'}
  },

  production : {
    client : 'postgresql',
    connection : {database : 'my_db', user : 'username', password : 'password'},
    pool : {min : 2, max : 10},
    migrations : {tableName : 'knex_migrations'}
  }

};
const dotenv = require('dotenv');
dotenv.config({path: '.env'});


const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.HOST_NAME,
    port: process.env.PORT,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME
  },
});