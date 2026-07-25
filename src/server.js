require('dotenv').config();
const knex = require('knex')
const app = require('./app')
const { PORT, DB_URL, NODE_ENV } = require('./config');

const db = knex({
  client: 'pg',
  connection:
    NODE_ENV === 'production'
      ? {
          connectionString: DB_URL,
          ssl: { rejectUnauthorized: false },
        }
      : DB_URL,
})

app.set('db', db)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
