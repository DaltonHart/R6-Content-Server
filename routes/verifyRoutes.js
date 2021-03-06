const 
  express = require('express'),
  router = express.Router(),
  verifyController = require('../controllers/verify.js')

module.exports = router
  .post('/', verifyToken, verifyController.verify)


function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}