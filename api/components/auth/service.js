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
    const user = await store.list(TABLA)
    const userData = user.filter(item => item.username === data.username)
    if (userData.length === 0) {
      throw error('Invalid username or password', 401)
    }
    console.log(userData, 'userData')
    const isMatch = await bcrypt.compare(data.password, userData[0].password)
    if (isMatch) {
      return auth.sign(userData[0])
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
    console.log(authData, 'authData-------')

    return await store.upsert(TABLA, authData)
  }

  return {
    login,
    upsert
  }
}
