module.exports = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '123',
    database: 'downair'
  },
  pool: {
    min: 2,
    max: 10
  }
}
