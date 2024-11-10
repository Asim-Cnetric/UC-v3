const mongoose = require('mongoose');
const { search } = require('../routes/authRoutes');
const { Schema } = mongoose;

const workspaceSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: "Workspace description"
  },
  commerce: {
    commerce_id: {
      type: String,
      ref: 'Commerce',
      required: true
    },
    creds: {
      type: Object,
      required: true
    }
  },
  cms: {
    cms_id: {
      type: String,
      ref: 'Cms',
      required: true
    },
    creds: {
      type: Object,
      required: true
    }
  },
  payment: {
    payment_id: {
      type: String,
      ref: 'Payment',
      required: true
    },
    creds: {
      type: Object,
      required: true
    }
  },
  crm: {
    crm_id: {
      type: String,
      ref: 'Crm',
      required: true
    },
    creds: {
      type: Object,
      required: true
    }
  },
  search: {
    search_id: {
      type: String,
      ref: 'Search',
      required: true
    },
    creds: {
      type: Object,
      required: true
    }
  },
  composer_url: {
    type: String,
    required: true,
    default: 'https://universalcomposer.com'
  },
  user_id: {
    type: String,
    ref: 'User',
    required: true
  },
  template_id:{
    type: String,
    ref: 'Template',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Workspace', workspaceSchema);
