const db = require('./db')
const { ObjectId } = require('mongodb')

const getCollection = async (db, name) => {
  const client = await db
  const collection = await client.db().collection(name)
  return collection
}

const getAll = async () => {
  const collection = await getCollection(db, 'cats')
  const results = collection.find({}).toArray()
  return results
}

const getById = async (id) => {
  const collection = await getCollection(db, 'cats')
  const [result] = await collection.find({ _id: new ObjectId(id) }).toArray()
  console.log(result._id.getTimestamp())
  return result
}

const remove = async (id) => {
  const collection = await getCollection(db, 'cats')
  const { value: result } = await collection.findOneAndDelete({
    _id: new ObjectId(id),
  })
  return result
}

const create = async (body) => {
  const collection = await getCollection(db, 'cats')
  const record = {
    ...body,
    ...(body.isVaccinated ? {} : { isVaccinated: false }),
  }
  const {
    ops: [result],
  } = await collection.insertOne(record)
  return result
}

const update = async (id, body) => {
  const collection = await getCollection(db, 'cats')

  const { value: result } = await collection.findOneAndUpdate(
    {
      _id: new ObjectId(id),
    },
    { $set: body },
    { returnOriginal: false },
  )
  return result
}

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
}
