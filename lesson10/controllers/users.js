const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2
const { promisify } = require('util')

require('dotenv').config()
const Users = require('../model/users')
const { HttpCode } = require('../helpers/constants')
// const UploadAvatar = require('../services/upload-avatars-local')
const UploadAvatar = require('../services/upload-avatars-cloud')

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
// const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

const reg = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email)
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        message: 'Email is already used',
      })
    }
    const newUser = await Users.create(req.body)
    const { id, name, email, gender, avatar } = newUser
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        id,
        name,
        email,
        gender,
        avatar,
      },
    })
  } catch (e) {
    next(e)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await Users.findByEmail(email)
    const isValidPassword = await user?.validPassword(password)

    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Invalid crendentials',
      })
    }

    const payload = { id: user.id }
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' })
    await Users.updateToken(user.id, token)
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        token,
      },
    })
  } catch (e) {
    next(e)
  }
}

const logout = async (req, res, next) => {
  await Users.updateToken(req.user.id, null)
  return res.status(HttpCode.NO_CONTENT).json({})
}

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id
    // const uploads = new UploadAvatar(AVATARS_OF_USERS)
    // const avatarUrl = await uploads.saveAvatarToStatic({
    //   idUser: id,
    //   pathFile: req.file.path,
    //   name: req.file.filename,
    //   oldFile: req.user.avatar,
    // })
    const uploadCloud = promisify(cloudinary.uploader.upload)
    const uploads = new UploadAvatar(uploadCloud)
    const { userIdImg, avatarUrl } = await uploads.saveAvatarToCloud(
      req.file.path,
      req.user.userIdImg,
    )
    await Users.updateAvatar(id, avatarUrl, userIdImg)

    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: { avatarUrl },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  reg,
  login,
  logout,
  avatars,
}
