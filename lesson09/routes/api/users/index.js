const express = require('express')
const router = express.Router()
const ctrl = require('../../../controllers/users.js')
const guard = require('../../../helpers/guard')
const upload = require('../../../helpers/upload')

router.post('/register', ctrl.reg)
router.post('/login', ctrl.login)
router.post('/logout', guard, ctrl.logout)
router.patch('/avatars', [guard, upload.single('avatar')], ctrl.avatars)

module.exports = router
