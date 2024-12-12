const TABLA = 'user'

const auth = require('../auth')

module.exports = function (injectedStore) {
  let store = injectedStore
  if (!store) {
    store = require('../../../store/dummy')
  }

  function list () {
    return store.list(TABLA)
  }

  function get (id) {
    return store.get(TABLA, id)
  }

  async function upsert (data) {
    const userData = {
      name: data.name,
      username: data.username
    }

    if (data.id) {
      userData.id = data.id
    } else {
      userData.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }

    if (data.password || data.username) {
      await auth.upsert({
        id: userData.id,
        username: data.username,
        password: data.password
      })
    }
    return store.upsert(TABLA, userData)
  }

  return {
    list,
    get,
    upsert
  }
}
