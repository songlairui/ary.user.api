const models = require('../../models')
const Joi = require('joi')

module.exports = [
    {
        method: 'POST',
        path: '/login',
        async handler(request, h) {
        }
    },
    {
        method: 'GET',
        path: '/user/:id',
        async handler(request, h) {
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
            return newUser.save().then(() => {
                console.warn('new user created')
                return 'created'
            }).catch(e => {
                return `${e}`
            })
        },
        config: {
            tags: [ 'api', 'user' ],
            validate: {
                query: {
                    username: Joi.string().description('用户名'),
                    password: Joi.string().description('密码')
                }
            }
        },
    },
    {
        method: 'PUT',
        path: '/user',
        async handler(request, h) {
        }
    },
    {
        method: 'DELETE',
        path: '/user',
        async handler(request, h) {
        }
    }
]