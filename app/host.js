const os = require('os')
const _ = require('lodash')

const address = _.get(
  Object.values(os.networkInterfaces())
    .map(ips => ips.filter(ip => !ip.internal && ip.family === 'IPv4'))
    .filter(ips => ips.length),
  '[0][0].address',
  '127.0.0.1'
)

module.exports = address
