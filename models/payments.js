const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
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
      },
      image_url: {
        type: String
      }
}, { timestamps: true })


module.exports = mongoose.model('Payment', PaymentSchema);