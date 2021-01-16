const { Schema, model } = require('mongoose');

const trailSchema = new Schema({
    trailName: { type: String, required: true},
    length: { type: Number, required: true },
    difficulty: { type: String, required: true },
    area: { type: Array, required: true },
    location: { type: Array, required: true },
    accessibility: { type: Array },
    timeOfDay: { type: String },
    picnicArea: { type: Boolean, default: false },
    lengthOfTime: { type: String },
    equipment: { type: Array },
    description: { type: String }
}, { collection: 'trails' });

const Trail = model('Trail', trailSchema);
module.exports = Trail;