const { Schema, model } = require('mongoose');
const {Trail} = require('./trail')
const {User} = require('./user')

const groupSchema = new Schema({
    name: { type: String, required: true },
    trail: { type: Object, required: true },
    date: { type: String },
    time: { type: String },
    privacy: { type: Boolean, default: false },
    description: { type: String },
    users: [ Object ]
}, { collection: 'groups' });

const Group = model('Group', groupSchema);
module.exports = Group;