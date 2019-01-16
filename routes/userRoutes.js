const 
  express = require('express'),
  router = express.Router(),
  userController = require('../controllers/users.js')

module.exports = router
  .get('/', userController.index)
  .get('/:id', userController.show)
  .post('/signup', userController.signup)
  .post('/login', userController.login)