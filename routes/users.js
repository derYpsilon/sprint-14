const users = require('express').Router()
const {
  createUser, getAllUsers, getSingleUser, updateUser, updateAvatar,
} = require('../controllers/users')

users.post('/', createUser)
users.get('/', getAllUsers)
users.get('/:id', getSingleUser)
users.patch('/me', updateUser)
users.patch('/me/avatar', updateAvatar)

module.exports = users
