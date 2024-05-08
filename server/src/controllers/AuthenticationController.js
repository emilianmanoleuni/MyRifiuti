const {User} = require('../models/')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user){
    const ONE_MONTH = 60 * 60 * 24 * 30
    return jwt.sign(user, config.authentication.jwtSecret, {
        express: ONE_MONTH
    })
}

module.exports={
    /*
        register
    */

        async login (req, res) {
            try {
              const {email, password} = req.body
              const user = await User.findOne({
                where: {
                  email: email
                }
              })
        
              if (!user) {
                return res.status(403).send({
                  error: 'The login information was incorrect'
                })
              }
        
              const isPasswordValid = await user.comparePassword(password)
              if (!isPasswordValid) {
                return res.status(403).send({
                  error: 'The login information was incorrect'
                })
              }
        
              const userJson = user.toJSON()
              res.send({
                user: userJson,
                token: jwtSignUser(userJson)
              })
            } catch (err) {
              res.status(500).send({
                error: 'An error has occured trying to log in'
              })
            }
          }
}