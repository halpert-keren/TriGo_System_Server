const User = require('../models/user');
const UserCtrl = require('./user.controller')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const Session = require('../models/session');

logout = (req, res) => {
    Session.deleteOne({id: req.headers.user})
        .then(() => res.sendStatus(200))
        .catch(err => console.log(err))
}

verify = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    }).catch(err => console.log(err))
    return ticket.getPayload();
}

login = async (req, res) => {
    let token = req.body.token
    let payload = await verify(token)

    await User.findOne({googleID: payload['sub']})
        .then(docs => {
            if (docs) {
                const session = new Session()
                session.id = docs.googleID
                session.save()
                    .then(() => res.json(docs))
                    .catch(err => console.log(err))
            } else {
                let user = {
                    id: payload['sub'],
                    f_name: payload['given_name'],
                    l_name: payload['family_name'],
                    email: payload['email'],
                    avatar: payload['picture']
                }
                UserCtrl.createUser(user, req, res)
            }
        })
        .catch(err => console.log(err))
}

module.exports = {
    logout,
    login
}