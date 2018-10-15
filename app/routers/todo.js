const models = require('../../models')
const { jwtHeaderDefine } = require('../utils/router-helper')
const Joi = require('joi')

module.exports = [
  {
    method: 'GET',
    path: '/todo',
    async handler() {
      return await models.todos.findAll()
    },
    config: {
      tags: ['api', 'todos'],
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/todo/:id',
    async handler(request, h) {
      // query TODO list
      const id = request.params.id
      const todo = await models.todos.findAll({ where: { id } })[0]
      return todo ? todo : h.response('todo not exist').code(404)
    },
    config: {
      tags: ['api', 'todos'],
      validate: {
        ...jwtHeaderDefine,
        params: {
          id: Joi.required().description('todo id')
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/todo',
    async handler(request, h) {
      // create a todo
      const { title } = request.payload
      const todo = models.todos.build({
        title,
        startAt: new Date()
      })
      console.warn('instance created', title, startAt)
      return todo
        .save()
        .then(() => {
          console.warn('new todo created')
          return 'created'
        })
        .catch(e => {
          return `${e}`
        })
    },
    config: {
      tags: ['api', 'todos'],
      validate: {
        ...jwtHeaderDefine
      }
    }
  },
  ,
  {
    method: 'PUT',
    path: '/todo/:id',
    async handler(request) {
      // update a todo
      // 更新 完成状态、起止时间、关联信息
    },
    config: {
      tags: ['api', 'todos'],
      validate: {
        ...jwtHeaderDefine
      }
    }
  },
  ,
  {
    method: 'DELETE',
    path: '/todo/:id',
    async handler(request) {
      // delete a todo
    },
    config: {
      tags: ['api', 'todos'],
      validate: {
        ...jwtHeaderDefine
      }
    }
  }
]
