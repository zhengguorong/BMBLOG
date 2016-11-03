const all = {
    port: 9000,
    ip: process.env.ip || '0.0.0.0',
    secrets: {
        session: 'BMBLOG'
    },
    mongo: {
        uri: 'mongodb://localhost:27017/bmblog'
    },
    userRoles: ['guest', 'user', 'admin']
}
module.exports = all