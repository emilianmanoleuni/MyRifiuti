const AuthenticationController = require('./controllers/AuthenticationController')

module.exports = (app) => {
    /*
        register
    */

    app.post('/',
        AuthenticationController.login
    )
}