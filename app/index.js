const Hapi = require('hapi')
const env = require('env2')
const path = require('path')
const hapiAuthJwt2 = require('hapi-auth-jwt2')

env(path.resolve(__dirname, '../.env'))

const pluginSwagger = require('./plugins/swagger')
const hi = require('./routers/hi')
const routerUsers = require('./routers/user')
const host = require('./host')

const pluginAuth = require('./plugins/auth-jwt2')

const server = new Hapi.Server({
  host,
  port: 3456
})

!(async () => {
  server.route([...hi, ...routerUsers])
  await server.register([...pluginSwagger, hapiAuthJwt2])
  pluginAuth(server)
  server.start()
  console.warn(`listening at ${host}:3456`)
})()
