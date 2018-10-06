const Hapi = require('hapi')
const env = require('env2')
const path = require('path')

env(path.resolve(__dirname, '../.env'))

const pluginSwagger = require('./plugins/swagger')
const hi = require('./routers/hi')
const routerUsers = require('./routers/user')
const host = require('./host')

const server = new Hapi.Server({
  host,
  port: 3456
})

!(async () => {
  server.route([...hi, ...routerUsers])
  await server.register([...pluginSwagger])
  server.start()
  console.warn(`listening at ${host}:3456`)
})()
