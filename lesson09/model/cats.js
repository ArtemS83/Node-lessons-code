const Cat = require('./schemas/cat')

const getAll = async (userId, query) => {
  const {
    limit = 5,
    offset = 0,
    sortBy,
    sortByDesc,
    filter, // name|age|isVaccinated
    vaccinated = null,
  } = query
  console.log(Boolean(vaccinated))
  const optionsSearch = { owner: userId }
  if (vaccinated !== null) {
    optionsSearch.isVaccinated = vaccinated
  }
  const results = await Cat.paginate(optionsSearch, {
    limit,
    offset,
    select: filter ? filter.split('|').join(' ') : '', // 'name age isVaccinated'
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
  })
  const { docs: cats, totalDocs: total } = results
  return { cats, total, limit, offset }
}

const getById = async (userId, id) => {
  const result = await Cat.findOne({ _id: id, owner: userId }).populate({
    path: 'owner',
    select: 'name email gender -_id',
  })
  return result
}

const remove = async (userId, id) => {
  const result = await Cat.findByIdAndRemove({ _id: id, owner: userId })
  return result
}

const create = async (body) => {
  const result = await Cat.create(body)
  return result
}

const update = async (userId, id, body) => {
  const result = await Cat.findOneAndUpdate(
    {
      _id: id,
      owner: userId,
    },
    { ...body },
    { new: true },
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
