let mongoose = require('mongoose');
//const Schema = mongoose.Schema;

const Schema = mongoose.Schema;

const Profile = new Schema({
    first_name: String,
    last_name: String,
    favorite_category: String
  });

  var model = mongoose.model('profiles', Profile );

  
  

/* let Profile = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String 
    },
    favorite_category: {
        type: String
    }
}); */

module.exports = mongoose.model('Profile', Profile);