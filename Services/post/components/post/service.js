const TABLE = 'post'
module.exports = (injectedDb) => {
  let db = injectedDb

  if (!db) {
    db = require('../../../../store/mysql')
  }

  async function list () {
    return db.list(TABLE)
  }

  async function get (id, table = TABLE) {
    return db.get(table, id)
  }

  async function upsert (req) {
    const userExist = await get(req.user.id, 'user')
    if (!userExist) {
      throw new Error('User not exist')
    }
    const post = {
      user_id: req.user.id,
      text: req.body.text
    }
    return db.upsert(TABLE, post)
  }

  return {
    list,
    upsert,
    get
  }
}
