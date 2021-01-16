const { Schema, model } = require('mongoose');
const Trail = require('./trail')
const User = require('./user')

const groupSchema = new Schema({
    name: { type: String, required: true },
    trail: { type: Trail, required: true },
    date: { type: String },
    time: { type: String },
    privacy: { type: Boolean, default: false },
    description: { type: String },
    users: [ User ]
}, { collection: 'groups' });

const Group = model('Group', groupSchema);
module.exports = Group;