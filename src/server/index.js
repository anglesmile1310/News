const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const status = require('http-status')
const bodyParser = require('body-parser')
const userApi = require('../api/userRouter')
const start = (container) => {
  return new Promise((resolve, reject) => {
    const { port } = container.resolve('serverSettings')
    const repo = container.resolve('repo')
    if (!repo) {
      reject(new Error('The server must be started with a connected repository'))
    }
    if (!port) {
      reject(new Error('The server must be started with an available port'))
    }
    const app = express()
    morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
    app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'))
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(helmet())
    userApi(app, container)
    app.use((err, req, res, next) => {
      console.log(err)
      res.status(status.INTERNAL_SERVER_ERROR).json({ msg: 'Something went wrong!\n' })
      next()
    })
    const server = app.listen(port, () => resolve(server))
  })
}
module.exports = { start }
