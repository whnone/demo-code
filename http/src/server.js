// 核心入口

const http = require('http')
const fs = require('fs').promises
const path = require('path')
const url = require('url')
const os = require('os') // 内置模块

console.log(os.networkInterfaces())

class Server {
    constructor(options) {
        this.port = options.port
        this.directory = options.directory
        this.start()
    }
    handleRequest = (req, res) => {

        console.log(this)
    }
    start() {
        const server = http.createServer(this.handleRequest)
        server.listen(this.port, () => {
            console.log()
        })
    }
}

function createServer(options = {}) {
    return new Server(options)
}

module.exports = createServer