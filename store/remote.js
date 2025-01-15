const axios = require('axios')
const error = require('../utils/error')

class RemoteDB {
  constructor (host, port) {
    this.host = host
    this.port = port
  }

  async req (method, table, id = '', body = {}, params = '') {
    try {
      const url = `http://${this.host}:${this.port}/${table}${id ? `/${id}` : ''}${params ? `/${params}` : ''}`

      const options = method === 'post' || method === 'put'
        ? { data: body }
        : {}

      const { data } = await axios({ method, url, ...options })
      return data.body
    } catch (e) {
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
    return await this.req('post', table, '', body)
  }

  async update (table, id, body) {
    return await this.req('put', table, id, body)
  }

  async remove (table, id) {
    return await this.req('delete', table, id)
  }

  async isFollowing (table, id) {
    return await this.req('get', table, id, '', 'following')
  }

  async follow (table, from, to) {
    return await this.req('post', table, from, '', to)
  }
}

module.exports = RemoteDB
