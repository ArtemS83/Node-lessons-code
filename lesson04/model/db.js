const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./model/cats.json')
const db = low(adapter)

db.defaults({ cats: [] }).write()

module.exports = db
