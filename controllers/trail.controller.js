const Trail = require('../models/trail');

getTrails = (req, res) => {
    const filters = {}
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

    Trail.find(filters)
        .then(docs => res.json(docs))
        .catch(err => console.log(err))
}

getTrail = (req, res) => {
    Trail.findOne({_id: req.params.id})
        .then(docs => res.json(docs))
        .catch(err => console.log(err))
}

createTrail = (req, res) => {
    const {body} = req
    console.log(body)
    const trail = new Trail();
    trail.name = body.name
    trail.length = body.length
    trail.difficulty = body.difficulty
    trail.area = body.area
    trail.location = body.location
    trail.accessibility = body.accessibility
    trail.timeOfDay = body.timeOfDay
    trail.picnicArea = body.picnicArea
    trail.lengthOfTime = body.lengthOfTime
    trail.equipment = body.equipment
    trail.description = body.description
    trail.images = body.images

    trail.save()
        .then(() => res.json({_id: `${trail._id}`}))
        .catch(err => console.log(err))
}

updateTrail = (req, res) => {
    const {body} = req
    const trail = {
        name: body.name,
        length: body.length,
        difficulty: body.difficulty,
        area: body.area,
        location: body.location,
        accessibility: body.accessibility,
        timeOfDay: body.timeOfDay,
        picnicArea: body.picnicArea,
        lengthOfTime: body.lengthOfTime,
        equipment: body.equipment,
        description: body.description,
        images: body.images
    };

    Trail.updateOne({_id: req.params.id}, trail)    // updateOne docs = PUSH!!
        .then(() => res.json({_id: `${req.params.id}`}))
        .catch(err => console.log(err))
}

deleteTrail = (req, res) => {
    Trail.deleteOne({_id: req.params.id})
        .then(() => res.json({success: true}))
        .catch(err => console.log(err))
}

module.exports = {
    getTrails,
    getTrail,
    createTrail,
    updateTrail,
    deleteTrail
}