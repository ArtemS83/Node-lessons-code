const { Cat: Cats, User, Gender } = require('../models')

const getAll = async (userId, query) => {
  const { sortBy, sortByDesc, filter, limit = 5, offset = 0 } = query
  const options = {
    offset,
    limit,
    where: {
      owner: userId,
    },
    attributes: ['id', 'name', 'age', 'isVaccinated', 'createdAt', 'updatedAt'],
    include: [
      {
        model: User,
        attributes: [`id`, `name`, `email`, `gender`],
        include: { model: Gender },
      },
    ],
  }
  const order = []
  if (sortBy) {
    order.push([`${sortBy}`])
    options.order = order
  }
  if (sortByDesc) {
    order.push([`${sortByDesc}`, `DESC`])
    options.order = order
  }
  if (filter) {
    const attributes = filter.split('|')
    options.attributes = attributes
  }
  const { count, rows: cats } = await Cats.findAndCountAll(options)
  return {
    total: count,
    limit,
    offset,
    cats,
  }
}

const getById = async (userId, id) => {
  const cat = await Cats.findOne({
    where: {
      id,
      owner: userId,
    },
  })
  return cat
}

const create = async (body) => {
  const cat = await Cats.create(body)
  return cat
}

const update = async (id, body, userId) => {
  await Cats.update(body, {
    where: {
      id,
      owner: userId,
    },
  })
  const cat = await Cats.findOne({
    where: {
      id,
      owner: userId,
    },
  })
  if (cat) {
    return cat
  }
  return null
}

const remove = async (id, userId) => {
  const cat = await Cats.findOne({
    where: {
      id,
      owner: userId,
    },
  })
  if (cat) {
    await Cats.destroy({
      where: {
        id,
        owner: userId,
      },
    })
    return cat
  }
  return null
}

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
}
