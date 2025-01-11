module.exports = (injectedDb) => {
  let db = injectedDb

  if (!db) {
    db = require('../../../store/mysql')
  }

  async function list () {
    return db.list()
  }

  return {
    list
  }
}
