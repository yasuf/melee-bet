const { Model } = require('objection')

const STATES = {
  ACTIVE: 1,
  FINISHED: 2
}

class User extends Model {
  static getTableName() {
    return 'users'
  }
}

module.exports = User
