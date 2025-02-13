const mongoose = require('mongoose');

const messageschema   = new mongoose.Schema({
       username: String,
       room: String,
       message: String,
       timestamp: {

            type: Date,
            default: Date.now 
       }

 });


 module.exports = mongoose.model('MessageSchema',messageschema);