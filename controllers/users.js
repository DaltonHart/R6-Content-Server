const jwt = require('jwt-simple')
const config = require('../config/config')
const db = require('../models')
const User = db.User
const bcrypt = require('bcrypt')


module.exports = {
  index: (req, res) => {
    User.find({})
    .exec((err, users)=>{
      let total = users.length
      if (err) {
        res.status(500).json({'ERROR': err})
      }
      res.json({total:total,users: users})
    })
  },
  signup: (req, res) => {
    if (req.body.email && req.body.password) { 
      bcrypt.hash(req.body.password, 10, (err, hash) =>{
        if(err){
          console.log("hashing error:", err);
          res.status(200).json({error: err})
        } else {
        let newUser = req.body
        newUser.password = hash
      User.findOne({ email: req.body.email })
        .then((user) => {
          if (!user) {
            User.create(newUser)
              .then(user => {
                if (user) {
                  let payload = { user: user }
                  let token = jwt.encode(payload, config.jwtSecret)
                  res.json({ token })
                } else {
                  res.sendStatus(401).json({err:'create user error'})
                }
              }) 
          } else {
            res.sendStatus(401)
          }
        })
      }})
    } else {
      res.sendStatus(401)
    }
  },
  login: (req, res) => {
    if (req.body.email && req.body.password) {
      User.findOne({ email: req.body.email }).then(user => {
        if (user) {
          bcrypt.compare(req.body.password, user.password, (err, match) => {
            if(err){
              console.log('error', err)
              res.sendStatus(401).json({error: err})
            }
            if (match) {
              let payload = { user: user }
              let token = jwt.encode(payload, config.jwtSecret)
              res.json({ token })
            } else {
              res.sendStatus(401).json({error:'username/password incorrect'})
            }
          })
        } else {
          res.sendStatus(401).json({error:'No user found'})
        }
      })
    } else {
      res.sendStatus(401).json({error:'username/password incorrect'})
    }
  },
  show: (req, res) => {
    let username = req.params.name
    User.findOne({username:username})
        .exec((err,user)=>{
          if (err) {
            res.status(500).json({
              "ERROR": err
            });
          }
          res.json({user})
        })
  }
}