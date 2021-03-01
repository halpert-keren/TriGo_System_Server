const mongoose = require('mongoose');
const {DB_HOST, DB_USER, DB_PASS} = require('./constants');
const options = {
    useNewUrlParser: true,     // For deprecation warnings
    useCreateIndex: true,      // For deprecation warnings
    useUnifiedTopology: true,  // For deprecation warnings
    user: DB_USER,
    pass: DB_PASS
};
mongoose.connect(DB_HOST, options)
    .then(() => console.log('connected'))
    .catch(err => console.log(`connection error: ${err}`));