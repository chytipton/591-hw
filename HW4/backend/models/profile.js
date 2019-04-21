let mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Profile = new Schema({
    first_name: String,
    last_name: String,
    favorite_category: String
  });

var model = mongoose.model('profiles', Profile );


module.exports = mongoose.model('Profile', Profile);