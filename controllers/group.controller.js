const Group = require('../models/group');

getGroups = (req, res) => {
    Group.find({})
        .then(docs => res.json(docs))
        .catch(err => console.log(err))
}

getGroup = (req, res) => {
    Group.findOne({_id: req.params.id})
        .then(docs => res.json(docs))
        .catch(err => console.log(err))
}

createGroup = (req, res) => {
    const { body } = req
    const group = new Group();
    group.name = body.name
    group.trail = body.trail
    group.date = body.date
    group.time = body.time
    group.privacy = body.privacy === 'Yes';
    group.description = body.description
    group.users = body.users


    group.save()
        .then(() => res.json({_id: `${group._id}`}))
        .catch(err => console.log(err))
}

updateGroup = (req, res) => {
    const { body } = req
    const group = {
        name: body.name,
        trail: body.trail,
        date: body.date,
        time: body.time,
        privacy: body.privacy,
        description: body.description,
        $push: {users: body.users}
    };

    Group.updateOne({ _id: req.params.id }, group)    // updateOne docs = PUSH!!
        .then(() => res.json({_id: `${req.params.id}`}))
        .catch(err => console.log(err))
}

deleteGroup = (req, res) => {
    Group.deleteOne({_id: req.params.id})
        .then(() => res.json({ success: true }))
        .catch(err => console.log(err))
}

module.exports = {
    getGroups,
    getGroup,
    createGroup,
    updateGroup,
    deleteGroup
}