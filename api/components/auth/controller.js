const TABLA = 'auth'

const auth = require('../../../auth')

module.exports = function (injectedStore) {
  let store = injectedStore
  if (!store) {
    store = require('../../../store/dummy')
  }

  async function login (data) {
    const user = await store.query(TABLA, { username: data.username, password: data.password })
    if (user.password === data.password) {
      return auth.sign(user)
    } else {
      throw new Error('Invalid username or password')
    }
  }

  function upsert (data) {
    const authData = {
      id: data.id
    }

    if (data.username) {
      authData.username = data.username
    }

    if (data.password) {
      authData.password = data.password
    }

    return store.upsert(TABLA, authData)
  }

  return {
    login,
    upsert
  }
}
