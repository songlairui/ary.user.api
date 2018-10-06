const path = require('path')

const development = {
  username: 'root',
  password: null,
  database: 'user_development',
  host: '127.0.0.1',
  dialect: 'sqlite',
  storage: path.resolve(__dirname, '../db', 'database.sqlite'),
  operatorsAliases: false
}
const config = {
  development: development,
  test: {
    ...development,
    database: 'user_test'
  },
  production: {
    ...development,
    database: 'user_production'
  }
}
module.exports = config
