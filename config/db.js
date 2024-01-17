const {Pool, Client} = require('pg')

// const dbConfig = {
//   user: process.env.DATABASE_USERNAME,
//   database: process.env.DATABASE_NAME,
//   password: process.env.DATABASE_PASSWORD,
//   port: process.env.DATABASE_PORT,
//   host: process.env.DATABASE_HOST
// }

const connectionString = process.env.DATABASE_URL;

// Create a new client
const pool = new Client({
  connectionString: connectionString,
});

// const pool = new Pool(dbConfig)

pool.connect().then((client) => {
  console.log('Connected to Postgresql');
  return client
}).catch(e => {
  console.log(e);
})
  
module.exports = {
  pool
}
