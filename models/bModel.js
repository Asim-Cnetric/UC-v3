const mongoose = require('mongoose');

const bModel = new mongoose.Schema({
    _id:{
        type: String,
        required: true,
      },    
      name: {
        type: String,
        required: true,
      },
      description :{
        type: String,
      }
}, { timestamps: true })


module.exports = mongoose.model('bModel', bModel);