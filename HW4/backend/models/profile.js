let mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Profile = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String 
    },
    favorite_category: {
        type: String
    }
});

module.exports = mongoose.model('Profile', Profile);