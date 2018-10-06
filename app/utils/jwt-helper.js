const JWT = require('jsonwebtoken')

const generateJWT = jwtinfo => {
  const payload = {
    username: jwtinfo.username,
    exp: Math.floor(new Date().getTime() / 1000) + 24 * 60 * 60
  }
  return JWT.sign(payload, process.env.SECRET)
}
module.exports = {
  generateJWT
}
