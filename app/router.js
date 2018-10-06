module.exports = [{
    method: 'GET',
    path: '/hi',
    async handler(request) {
        return `${JSON.stringify(request.query, null, 1)}`
    }
}];
