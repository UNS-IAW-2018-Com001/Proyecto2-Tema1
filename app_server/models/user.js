onst mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    idUser:{ 
        type: String,
        required: true
    },
    facebookid:{
        type: Number,
        required: true
    },
    email:{ 
        type: String,
    },
    css:{ 
        type: String,
        required: true
    },
    photo:{ 
        type: String    
    }
});

module.exports = mongoose.model('user', userSchema);