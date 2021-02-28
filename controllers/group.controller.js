const Group = require('../models/group');

getGroups = (req, res) => {
    if(req.query.userID){
        Group.find({users:req.query.userID})
            .then(docs => res.json(docs))
            .catch(err => console.log(err))
    }

    const filters = {}
    if (req.query.date)
        filters.date = req.query.date
    if (req.query.time)
        filters.time = req.query.time
    if (req.query.length)
        filters.length = {$in: req.query.length}
    if (req.query.difficulty)
        filters.difficulty = {$in: req.query.difficulty}
    if (req.query.area)
        filters.area = {$in: req.query.area}
    if (req.query.accessibility)
        filters.accessibility = {$in: req.query.accessibility}
    if (req.query.timeOfDay)
        filters.timeOfDay = {$in: req.query.timeOfDay}
    if (req.query.picnicArea)
        filters.picnicArea = {$in: req.query.picnicArea}
    if (req.query.lengthOfTime)
        filters.lengthOfTime = {$in: req.query.lengthOfTime}

    Group.find(filters)
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
    group.privacy = body.privacy === 'Yes'
    group.description = body.description
    group.users = body.users


    group.save()
        .then(() => res.json({_id: `${group._id}`}))
        .catch(err => console.log(err))
}

updateGroup = (req, res) => {
    const { body } = req
    const group = {
        $push: {users: body.users}
    };

    Group.updateOne({ _id: req.params.id }, group)
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