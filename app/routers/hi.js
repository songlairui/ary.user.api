const JWT = require('jsonwebtoken')
const Joi = require('joi')
const { jwtHeaderDefine } = require('../utils/router-helper')
const { generateJWT } = require('../utils/jwt-helper')

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
      const { credentials } = request.auth
      return JSON.stringify(credentials)
    },
    config: {
      tags: ['api', 'tests'],
      validate: {
        ...jwtHeaderDefine
      }
    }
  }
]
