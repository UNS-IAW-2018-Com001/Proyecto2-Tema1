const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  provider: String,
  provider_id: {
      type: String,
      unique: true
    },
  photo: String,
  css:{
        type: String,
    }

});

module.exports = mongoose.model('user_social', userSchema);
