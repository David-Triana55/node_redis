const TABLA = 'auth'

const auth = require('../../../auth')
const bcrypt = require('bcrypt')
const error = require('../../../utils/error')

module.exports = (injectedStore) => {
  let store = injectedStore
  if (!store) {
    store = require('../../../store/dummy')
  }

  async function login (data) {
    const user = await store.query(TABLA, { username: data.username, password: data.password })
    const isMatch = await bcrypt.compare(data.password, user.password)
    if (isMatch) {
      return auth.sign(user)
    } else {
      throw error('Invalid username or password', 401)
    }
  }

  async function upsert (data) {
    const authData = {
      id: data.id
    }

    if (data.username) {
      authData.username = data.username
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 10)
    }

    return store.upsert(TABLA, authData)
  }

  return {
    login,
    upsert
  }
}
