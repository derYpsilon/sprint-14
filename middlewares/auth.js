const jwt = require('jsonwebtoken')

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt
  let payload

  try {
    payload = jwt.verify(token, process.env.SECRET_KEY)
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' })
  }
  req.user = payload

  next()
}
