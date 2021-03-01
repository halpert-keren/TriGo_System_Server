const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    googleID: {type: String, require: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    savedTrails: [Object],
    avatar: {type: String}
}, {collection: 'users'});

const User = model('User', userSchema);
module.exports = User;