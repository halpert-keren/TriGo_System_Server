const Group = require('../models/group');

getGroups = (req, res) => {
    if (req.query.email) {
        Group.find({users: {$all: [req.query.email]}})
            .then(docs => res.json(docs))
            .catch(err => console.log(err))
    }
    else if(req.query === {}) {
        Group.find({})
            .then(docs => res.json(docs))
            .catch(err => console.log(err))
    } else {
        let filters = {}
        if (req.query.date)
            filters['date'] = req.query.date
        if (req.query.time)
            filters['time'] = req.query.time
        if (req.query.length)
            filters['trail.length'] = JSON.parse(`{"$in": ${req.query.length}}`)
        if (req.query.difficulty)
            filters['trail.difficulty'] = JSON.parse(`{"$in": ${req.query.difficulty}}`)
        if (req.query.area)
            filters['trail.area'] = JSON.parse(`{"$in": ${req.query.area}}`)
        if (req.query.accessibility)
            filters['trail.accessibility'] = JSON.parse(`{"$in": ${req.query.accessibility}}`)
        if (req.query.timeOfDay)
            filters['trail.timeOfDay'] = JSON.parse(`{"$in": ${req.query.timeOfDay}}`)
        if (req.query.picnicArea)
            filters['trail.picnicArea'] = JSON.parse(`{"$in": ${req.query.picnicArea}}`)
        if (req.query.lengthOfTime)
            filters['trail.lengthOfTime'] = JSON.parse(`{"$in": ${req.query.lengthOfTime}}`)

        Group.find(filters)
            .then(docs => res.json(docs))
            .catch(err => console.log(err))
    }
}

getGroup = (req, res) => {
    Group.findOne({_id: req.params.id})
        .then(docs => res.json(docs))
        .catch(err => console.log(err))
}

createGroup = (req, res) => {
    const {body} = req
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
    const {body} = req
    const group = {$push: {users: body.users}}

    Group.updateOne({_id: req.params.id}, group)
        .then(() => res.json({_id: `${req.params.id}`}))
        .catch(err => console.log(err))
}

deleteGroup = (req, res) => {
    Group.deleteOne({_id: req.params.id})
        .then(() => res.json({success: true}))
        .catch(err => console.log(err))
}

module.exports = {
    getGroups,
    getGroup,
    createGroup,
    updateGroup,
    deleteGroup
}