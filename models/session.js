const {Schema, model} = require('mongoose');

const sessionSchema = new Schema({
    id: {type: String}
}, {collection: 'sessions'});

const Session = model('Session', sessionSchema);

module.exports = Session;