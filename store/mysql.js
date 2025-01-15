const mysql = require('mysql2/promise')

const config = require('../config')
const error = require('../utils/error')

const dbconf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
}

let connection

async function handleConnection () {
  try {
    connection = await mysql.createConnection(dbconf)
    console.log('DB connected')
    connection.on('error', (err) => {
      console.error('[db error]', err)
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        handleConnection()
      } else {
        throw err
      }
    })
  } catch (err) {
    console.error('[db error]', err)
    setTimeout(handleConnection, 2000)
  }
}

handleConnection()

async function list (table) {
  try {
    const query = `SELECT * FROM ${table}`
    const [rows] = await connection.query(query)
    return rows
  } catch (err) {
    console.error('[db error]', err)
    throw error(err, 500)
  }
}

async function get (table, id) {
  try {
    const query = `SELECT * FROM ${table} WHERE id = '${id}'`
    const [rows] = await connection.query(query)
    if (rows.length === 0) {
      const query = `SELECT * FROM ${table} WHERE user_id = '${id}'`
      const [rows] = await connection.query(query)
      if (rows.length === 0) {
        throw error('User not found', 404)
      }
      return rows
    }
    return rows[0]
  } catch (err) {
    console.error('[db error]', err)
    throw error(err, 500)
  }
}
async function upsert (table, data) {
  try {
    console.log(data, 'data-----')
    const keys = Object.keys(data).join(',') // Ejemplo: "nombre,contraseña"
    const placeholders = Object.keys(data).map(() => '?').join(',') // Genera "?,?" para los valores
    const values = Object.values(data) // Array con los valores

    const query = `INSERT INTO ${table} (${keys}) VALUES (${placeholders})`
    const [rows] = await connection.query(query, values) // Usa placeholders y valores

    return rows
  } catch (e) {
    console.error('[db error]', e)
    throw error(e, 500)
  }
}
async function update (table, id, data) {
  try {
    // Extraer las claves del objeto data y crear la cláusula SET
    const keys = Object.keys(data)
    const setClause = keys.map(key => `\`${key}\` = ?`).join(', ')

    const query = `UPDATE \`${table}\` SET ${setClause} WHERE id = ?`

    console.log(query, 'query')
    // Obtener los valores del objeto data
    const values = Object.values(data)

    // Ejecutar la consulta con los valores y el ID
    const [rows] = await connection.query(query, [...values, id])

    return rows
  } catch (e) {
    console.error('[db error]', e)
    throw error(e, 500)
  }
}

async function follow (table, from, to) {
  try {
    if (from === to) {
      throw error('You cannot follow yourself', 400)
    }

    const toExist = await get('user', to)
    if (!toExist) {
      throw error('User not found', 404)
    }

    const alreadyFollowing = await connection.query(`SELECT * FROM ${table} WHERE user_from = ? AND user_to = ?`, [from, to])
    console.log(alreadyFollowing, 'alreadyFollowing')
    if (alreadyFollowing[0].length > 0) {
      throw error('You are already following this user', 400)
    }

    const query = `INSERT INTO ${table} (user_from, user_to) VALUES (?, ?)`
    const [rows] = await connection.query(query, [from, to])
    return rows
  } catch (e) {
    console.error('[db error]', e)
    throw error(e, 500)
  }
}
async function isFollowing (table, from) {
  try {
    const query = `SELECT * FROM ${table} WHERE user_from = ?`
    const [rows] = await connection.query(query, [from])
    return rows
  } catch (e) {
    console.error('[db error]', e)
    throw error(e, 500)
  }
}

async function remove (table, id) {
  try {
    const toExist = await get(table, id)
    if (!toExist) {
      throw error('User not found', 404)
    }

    const query = `DELETE FROM ${table} WHERE id = ?`
    const [rows] = await connection.query(query, [id])
    return rows
  } catch (e) {
    throw error(e, 500)
  }
}

module.exports = {
  list,
  get,
  upsert,
  update,
  follow,
  isFollowing,
  remove
}
