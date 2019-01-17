const 
config = require('../config/config'),
jwt = require('jsonwebtoken')

module.exports = {
  verify: (req, res) => {
    let verified= jwt.verify(req.token, config.jwtSecret)
    res.json(verified)
  }
}