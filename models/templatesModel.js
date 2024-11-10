const mongoose = require('mongoose');
const { Schema } = mongoose;

const template = new Schema({
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
      user_id: {
        type: String,
        ref: 'User',
        required: true
      },
      bModel_id: {
        type: String,
        ref: 'bModel',
        required: true
      },
      type:{
        type: String,
        enum: ['Custom', 'Preset'],
        required: true
      },
      commerce_id:{
        type: String,
        ref: 'Commerce',
        required: true
      },
      cms_id:{
        type: String,
        ref: 'Cms',
        required: true
      },
      search_id: {
        type: String,
        ref: 'Search',
        required: true
      },
      payment_id: {
        type: String,
        ref: 'Payment',
        required: true
      },
      crm_id:{
        type: String,
        ref: 'Crm',
        required: true
      }
}, { timestamps: true })


module.exports = mongoose.model('Template', template);