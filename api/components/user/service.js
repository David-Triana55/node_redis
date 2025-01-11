const TABLA = 'user'

const error = require('../../../utils/error')
const auth = require('../auth')
module.exports = function (injectedStore) {
  let store = injectedStore
  if (!store) {
    store = require('../../../store/dummy')
  }

  async function list () {
    console.log(TABLA, 'TABLA/list')
    return await store.list(TABLA)
  }

  async function get (id) {
    console.log(id, 'id/get')
    return await store.get(TABLA, id)
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
    return store.upsert(TABLA, userData)
  }

  function remove (id) {
    return store.remove(TABLA, id)
  }

  function update (id, data) {
    console.log(id, data, 'id, data-----')
    return store.update(TABLA, id, data)
  }

  function follow (from, to) {
    return store.follow(TABLA + '_follow', from, to)
  }

  function isFollowing (from) {
    return store.isFollowing(TABLA + '_follow', from)
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
