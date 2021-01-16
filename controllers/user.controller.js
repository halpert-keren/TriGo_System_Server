const User = require('../models/user');

getUsers = (req, res) => {
    User.find({})
        .then(docs => res.json(docs))
        .catch(err => console.log(err))
}

getUser = (req, res) => {
    User.findOne({_id: req.params.id})
        .then(docs => res.json(docs))
        .catch(err => console.log(err))
}

createUser = (req, res) => {
    const { body } = req
    const user = new User();
    user.firstName = body.firstName
    user.lastName = body.lastName
    user.email = body.email
    // user.password = encondePass(body.password)          // write a password encoder function
    user.password = body.password
    user.savedTrails = []
    user.groups = []

    user.save()
        .then(() => res.json({_id: `${user._id}`}))
        .catch(err => console.log(err))
}

updateUser = (req, res) => {
    const { body } = req
    const user = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        // password: encondePass(body.password),

    };

    User.updateOne({ _id: req.params.id }, user)    // updateOne docs = PUSH!!
        .then(() => res.json({_id: `${req.params.id}`}))
        .catch(err => console.log(err))
}

deleteUser = (req, res) => {
    User.deleteOne({_id: req.params.id})
        .then(() => res.json({ success: true }))
        .catch(err => console.log(err))
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}