const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    const {body} = req
    const hashedPassword = bcrypt.hashSync(body.password, saltRounds);

    const user = new User();
    user.firstName = body.firstName
    user.lastName = body.lastName
    user.email = body.email
    user.password = hashedPassword
    user.savedTrails = []
    user.groups = []

    user.save()
        .then(() => res.json({_id: `${user._id}`}))
        .catch(err => console.log(err))
}

updateUser = (req, res) => {
    const { body } = req
    if (body.savedTrails != null) {
        const itemToAdd = body.savedTrails[0]
        User.updateOne({_id: req.params.id}, {$push: {savedTrails: itemToAdd}})
            .then(() => res.json({id: `${req.params.id}`}))
            .catch(err => console.log(err))
    }
    else if (body.groups != null) {
        const itemToAdd = body.groups[0]
        User.updateOne({_id: req.params.id}, {$push: {groups: itemToAdd}})
            .then(() => res.json({id: `${req.params.id}`}))
            .catch(err => console.log(err))
    }
}

deleteUser = (req, res) => {
    User.deleteOne({_id: req.params.id})
        .then(() => res.json({success: true}))
        .catch(err => console.log(err))
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}