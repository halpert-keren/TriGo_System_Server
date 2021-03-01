const {Schema, model} = require('mongoose');

const requestSchema = new Schema({
    groupID: {type: String, required: true},
    ownerID: {type: String, required: true},
    requesterID: {type: String, required: true},
    status: {type: String, required: true},
}, {collection: 'requests'});

const Request = model('Request', requestSchema);
module.exports = Request;