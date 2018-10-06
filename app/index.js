const Hapi = require('hapi')

const hi = require('./router')

const server = new Hapi.Server({
    host: '0.0.0.0',
    port: 3456
})

!(async () => {
    server.route([...hi])
    // await server.
    server.start()
    console.warn(`listening at 0.0.0.0:3456`)
})()
