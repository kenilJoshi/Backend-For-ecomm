const {Pool} = require('pg')

const dbConfig = {
  user: 'postgres',
  database: 'AdminPanel',
  password: 'newpassword',
  port: 5432,
  host: '127.0.0.1'
}

const pool = new Pool(dbConfig)

pool.connect().then((client) => {
  console.log('Connected to Postgresql');
  return client
}).catch(e => {
  console.log(e);
})
  
module.exports = {
  pool
}
