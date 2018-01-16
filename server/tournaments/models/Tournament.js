const { Model } = require('objection')

const STATUS = {
  ACTIVE: 1,
  FINSHED: 2
}

class Tournament extends Model {
  static getTableName() {
    return 'tournaments'
  }
}

module.exports = {
  Tournament,
  STATUS
}
