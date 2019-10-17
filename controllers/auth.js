const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => res.status(201).send({
        _id: user._id, name: user.name, about: user.about, email: user.email,
      }))
      .catch((err) => res.status(400).send({ message: `Server Controller Error while creating User -- ${err}` })))
}

module.exports.login = (req, res) => {
  const { email, password } = req.body

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.SECRET_KEY,
        { expiresIn: '7d' },
      )
      res.send(token)
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message })
    })
}
