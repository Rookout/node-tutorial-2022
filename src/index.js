const server = require('./app')
const rookout = require('rookout')

rookout.start({ 
    token: 'XXXXXXXXXXXXXXXX',
    labels: {
        env: 'dev'
    }
}).then(() => {
    server.start()
})