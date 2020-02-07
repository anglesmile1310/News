const status = require("http-status")
module.exports = (app, container) => {
  const { schemaValidator } = container.resolve('models')
  const { version } = container.resolve('serverSettings')
  const userRepo = container.resolve('repo')
  const { getUserToken } = container.resolve('serverHelper')
  app.post(`/api/${version}/user/register`, (req, res, next) => {
    const newUser = req.body
    schemaValidator(newUser, 'user').then(val => {
      userRepo.addUser(val).then(data => {
        res.status(status.OK).json({ msg: 'user added', user: data })
      }).catch(err => next(err))
    }).catch(err => next(err))
  })
  app.post(`/api/${version}/user/login`, (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(status.BAD_REQUEST).json({ msg: "Login failure!" })
    }
    userRepo.userLogin({ username, password }).then(user => {
      res.status(status.OK).json({ token: getUserToken(user), user })
    }).catch(err => next(err))
  })
}
