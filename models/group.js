const { Schema, model } = require('mongoose');

const groupSchema = new Schema({
    name: { type: String, required: true },
    trail: { type: Object, required: true },
    date: { type: String },
    time: { type: String },
    privacy: { type: Boolean, default: false },
    description: { type: String },
    users: {type: Array}
}, { collection: 'groups' });

const Group = model('Group', groupSchema);
module.exports = Group;