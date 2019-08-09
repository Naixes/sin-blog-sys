// 开启，监听服务

const http = require('http')

const PORT = 8000
const serverHandle = require('../app')

const server = http.createServer(serverHandle)

server.listen(PORT)