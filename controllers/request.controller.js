const Request = require('../models/request');
const Group = require('../models/group');

getRequests = (req, res) => {
    if(req.query.userID){
        Request.find({
            $or: [{ownerID: req.query.userID}, {requesterID: req.query.userID}]
        })
            .then(docs => res.json(docs))
            .catch(err => console.log(err))
    }

    Request.find({})
        .then(docs => res.json(docs))
        .catch(err => console.log(err))
}

getRequest = (req, res) => {
    Request.findOne({_id: req.params.id})
        .then(docs => res.json(docs))
        .catch(err => console.log(err))
}

createRequest = (req, res) => {
    const {body} = req

    Group.findOne({_id: body.groupID})
        .then(docs => {
            const request = new Request();
            request.groupID = body.groupID
            request.ownerID = docs.users[0]
            request.requesterID = body.requesterID
            request.status = 'pending'

            request.save()
                .then(() => res.json({_id: `${request._id}`}))
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}


updateRequest = (req, res) => {
    const { body } = req
    const request = {
        status : body.status
    };

    Request.updateOne({ _id: req.params.id }, request)
        .then(() => res.json({_id: `${req.params.id}`}))
        .catch(err => console.log(err))
}

deleteRequest = (req, res) => {
    Request.deleteOne({_id: req.params.id})
        .then(() => res.json({success: true}))
        .catch(err => console.log(err))
}

module.exports = {
    getRequests,
    getRequest,
    createRequest,
    updateRequest,
    deleteRequest
}