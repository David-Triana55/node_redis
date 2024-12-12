const db = {
  user: [
    { id: '1', name: 'Carlos' }
  ]
}

async function list (tabla) {
  const data = db[tabla] || []
  if (!data) {
    return []
  }
  return data
}

async function get (tabla, id) {
  const col = await list(tabla)
  return col.filter(item => item.id === id)[0] || null
}

async function upsert (tabla, data) {
  if (!db[tabla]) {
    db[tabla] = []
  }

  db[tabla].push(data)
  console.log(db)
}

module.exports = {
  list,
  get,
  upsert
}
