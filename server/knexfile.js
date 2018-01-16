module.exports = {
  test: { 
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '123',
      database: 'downair_test',
    },
  },
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '123',
      database: 'downair',
    },
    pool: {
      min: 2,
      max: 10
    },
  },
}
