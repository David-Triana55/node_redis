const axios = require('axios')
const error = require('../utils/error')

class RemoteDB {
  constructor (host, port) {
    this.host = host
    this.port = port
  }

  async req (method, table, id, body) {
    try {
      const { data } = await axios[method](`http://${this.host}:${this.port}/${table} ${id ? `/${id}` : ''}`, body)
      return data.body
    } catch (e) {
      console.error('[db error]', e)
      throw error(e, 500)
    }
  }

  async list (table) {
    return await this.req('get', table)
  }

  async get (table, id) {
    return await this.req('get', table, id)
  }

  async upsert (table, body) {
    return await this.req('post', table, body)
  }

  async update (table, id, body) {
    return await this.req('put', table, id, body)
  }
}

module.exports = RemoteDB
