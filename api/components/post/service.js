module.exports = (injectedStore) => {
  let store = injectedStore

  if (!store) {
    store = require('../../../store/mysql')
  }

  async function list () {
    return store.list()
  }

  return {
    list
  }
}
