const { Schema, model } = require('mongoose');
const Group = require('./group')
const Trail = require('./trail')

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    savedTrails: [ Trail ],
    groups: [ Group ]
}, { collection: 'users' });

const User = model('User', userSchema);
module.exports = User;