const JWT = require('jsonwebtoken')
const Joi = require('joi')
const { jwtHeaderDefine } = require('../utils/router-helper')

module.exports = [
  {
    method: 'GET',
    path: '/hi',
    async handler(request) {
      return `${JSON.stringify(request.query, null, 1)}`
    },
    config: {
      tags: ['api', 'tests'],
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/jwt',
    async handler(request) {
      const generateJWT = jwtinfo => {
        const payload = {
          username: jwtinfo.username,
          exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60
        }
        return JWT.sign(payload, process.env.SECRET)
      }
      return generateJWT({ username: request.query.username })
    },
    config: {
      tags: ['api', 'tests'],
      description: '测试 JWT 签发',
      auth: false,
      validate: {
        query: {
          username: Joi.string()
            .required()
            .description('用户名')
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/jwt',
    async handler(request) {
      try {
        const { credentials } = request.auth
        return JSON.stringify(credentials)
      } catch (error) {
        console.warn(error)
        return `${error}`
      }
    },
    config: {
      tags: ['api', 'tests'],
      validate: {
        ...jwtHeaderDefine
      }
    }
  }
]
