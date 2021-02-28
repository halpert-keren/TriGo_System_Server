const User = require('../models/user');
const Session = require('../models/session');

getUsers = (req, res) => {
    User.find({})
        .then(docs => res.json(docs))
        .catch(err => console.log(err))
}

getUser = (req, res) => {
    User.findOne({googleID: req.params.id})
        .then(docs => res.json(docs))
        .catch(err => console.log(err))
}

createUser = (token, req, res) => {
    const user = new User();

    user.googleID = token['id']
    user.firstName = token['f_name']
    user.lastName = token['l_name']
    user.email = token['email']
    user.avatar = token['avatar']
    user.savedTrails = []

    user.save()
        .then(() => {
            const session = new Session()
            session.id = user.googleID
            session.save()
                .then(() => {
                    User.findOne({googleID: token['id']})
                        .then(docs => res.json(docs))
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}

updateUser = (req, res) => {
    const { body } = req
    if(body.action)
    {
        if (body.savedTrails != null) {
            const itemToAdd = body.savedTrails[0]
            User.updateOne({googleID: req.params.id}, {$push: {savedTrails: itemToAdd}})
                .then(() => {
                    User.findOne({googleID: req.params.id})
                        .then(docs => res.json(docs))
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        }
    }
    else{
        if (body.savedTrails != null) {
            const itemToDelete = body.savedTrails[0]
            User.updateOne({googleID: req.params.id}, {$pull: {savedTrails: itemToDelete}})
                .then(() => {
                    User.findOne({googleID: req.params.id})
                        .then(docs => res.json(docs))
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        }
    }
    // else if (body.groups != null) {
    //     const itemToAdd = body.groups[0]
    //     User.updateOne({_id: req.params.id}, {$push: {groups: itemToAdd}})
    //         .then(() => res.json({id: `${req.params.id}`}))
    //         .catch(err => console.log(err))
    // }
}

deleteUser = (req, res) => {
    User.deleteOne({googleID: req.params.id})
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