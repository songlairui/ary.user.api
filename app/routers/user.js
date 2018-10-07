const Joi = require('joi')
const models = require('../../models')
const { jwtHeaderDefine } = require('../utils/router-helper')
const { generateJWT } = require('../utils/jwt-helper')

module.exports = [
  {
    method: 'POST',
    path: '/logout',
    async handler() {
      // 注销登录接口，暂时不关联业务逻辑
      // 可能常见websocket应用场景的时候会用到。
    }
  },
  {
    method: 'POST',
    path: '/login',
    async handler(request, h) {
      const { username, password } = request.payload
      const existedUser = (await models.users.findAll({
        where: { name: username }
      }))[0]
      if (!existedUser) {
        return h.response('The user was not exist').code(401)
      }
      if (existedUser.password !== password) {
        return h.response('paasword was not right').code(401)
      }
      return generateJWT({ username })
    },
    config: {
      tags: ['api', 'users'],
      auth: false,
      validate: {
        payload: {
          username: Joi.string()
            .required()
            .description('用户名'),
          password: Joi.string()
            .required()
            .description('密码')
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/user',
    async handler(request, h) {
      const { credentials: { username } = {} } = request.auth
      const existedUser = (await models.users.findAll({
        where: { name: username }
      }))[0]
      console.assert(existedUser, '用户不存在')
      return existedUser
    },
    config: {
      tags: ['api', 'users'],
      validate: {
        ...jwtHeaderDefine
      }
    }
  },
  {
    method: 'POST',
    path: '/user',
    async handler(request, h) {
      const { username, password } = request.query
      const Users = models.users
      const newUser = Users.build({
        name: username,
        password
      })
      console.warn('instance created', newUser)
      return newUser
        .save()
        .then(() => {
          console.warn('new user created')
          return 'created'
        })
        .catch(e => {
          return `${e}`
        })
    },
    config: {
      tags: ['api', 'user'],
      auth: false,
      validate: {
        query: {
          username: Joi.string().description('用户名'),
          password: Joi.string().description('密码')
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/user',
    async handler(request, h) {}
  },
  {
    method: 'DELETE',
    path: '/user',
    async handler(request, h) {}
  }
]
