const validate = decoded => {
  const { username } = decoded
  return { isValid: !!username }
}

module.exports = server => {
  server.auth.strategy('jwt', 'jwt', {
    key: process.env.SECRET,
    validate
  })
  server.auth.default('jwt')
}
