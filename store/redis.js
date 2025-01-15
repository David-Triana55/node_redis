const redis = require('redis')
const config = require('../config')

// crear cliente de Redis
const client = redis.createClient({
  socket: {
    host: config.cacheService.host, // Cambia a 'redis' si usas Docker Compose
    port: config.cacheService.port
  }
})

// Manejo de eventos
client.on('connect', () => console.log('Conectado a Redis'))
client.on('error', (err) => console.error('Error en Redis:', err));

// Conectar al servidor
(async () => {
  await client.connect()
})()

// Función para listar todos los datos de una tabla
async function list (table) {
  try {
    const values = await client.get(table)
    if (!values) return null
    return JSON.parse(values)
  } catch (error) {
    console.error('Error al obtener lista de Redis:', error)
  }
}

async function get (table, id) {
  try {
    const data = await client.get(`${table}_${id}`)
    if (!data) return null
    const result = JSON.parse(data)
    return result
  } catch (error) {
    console.error('Error al obtener valor de Redis:', error)
  }
}

async function insert (table, id, data) {
  try {
    await client.setEx(`${table}_${id}`, 30, JSON.stringify(data))
  } catch (error) {
    console.error('Error al insertar valor en Redis:', error)
  }
}

// Función para insertar un valor en una tabla
async function upsert (table, data) {
  try {
    await client.setEx(table, 30, JSON.stringify(data))
  } catch (error) {
    console.error('Error al insertar valor en Redis:', error)
  }
}

module.exports = {
  list,
  upsert,
  get,
  insert
}
