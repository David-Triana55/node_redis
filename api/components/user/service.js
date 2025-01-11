const TABLA = 'user'

const error = require('../../../utils/error')
const auth = require('../auth')
module.exports = function (injectedDb) {
  let db = injectedDb
  if (!db) {
    db = require('../../../store/dummy')
  }

  async function list () {
    console.log(TABLA, 'TABLA/list')
    return await db.list(TABLA)
  }

  async function get (id) {
    console.log(id, 'id/get')
    return await db.get(TABLA, id)
  }

  async function upsert (data) {
    console.log(data, 'data-----')
    const userData = {
      name: data.name,
      username: data.username
    }

    if (data.id) {
      const userId = await get(data.id)

      userData.id = userId.id
    } else {
      userData.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }

    if (data.username) {
      const userUsername = await list()
      const alreadyExists = userUsername.filter(item => item.username === data.username)
      if (alreadyExists.length) {
        throw error('Username already exists', 400)
      }
    }

    if (data.password || data.username) {
      await auth.upsert({
        id: userData.id,
        username: data.username,
        password: data.password
      })
    }
    console.log(userData, 'userData-------')
    return db.upsert(TABLA, userData)
  }

  function remove (id) {
    return db.remove(TABLA, id)
  }

  function update (id, data) {
    console.log(id, data, 'id, data-----')
    return db.update(TABLA, id, data)
  }

  function follow (from, to) {
    return db.follow(TABLA + '_follow', from, to)
  }

  function isFollowing (from) {
    return db.isFollowing(TABLA + '_follow', from)
  }

  return {
    list,
    get,
    upsert,
    remove,
    update,
    follow,
    isFollowing
  }
}
