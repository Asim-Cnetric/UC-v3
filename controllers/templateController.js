const Template = require('../models/templatesModel');
const crypto = require('crypto');
const Crm = require('../models/crm');
const Cms = require('../models/cms');
const Payment = require('../models/payments');
const Search = require('../models/search');
const Commerce = require('../models/commerce');
const bModel = require('../models/bModel');
const authMiddleware = require('../middleware/authMiddleware');

exports.createTemplate = async (req, res) => {
    const { name, description, bModel_id, type, commerce_id, cms_id, crm_id, payment_id, search_id } = req.body;

    if(!name || !type ){
        return res.status(400).json({
            "status": "Error",
            "message": "bad request. Wrong data or there is data missing."
        });
    }

    // const commerce = await Commerce.find({ _id: commerce_id });
    // if (!commerce.length) {
    //   return res.status(404).json({ msg: 'No commerce found with the given id' });
    // }

    // const cms = await Cms.find({ _id: cms_id });
    // if (!cms.length) {
    //   return res.status(404).json({ msg: 'No cms found with the given id' });
    // }

    // const crm = await Crm.find({ _id: crm_id });
    // if (!crm.length) {
    //   return res.status(404).json({ msg: 'No crm found with the given id' });
    // }

    // const search = await Search.find({ _id: search_id });
    // if (!search.length) {
    //   return res.status(404).json({ msg: 'No search found with the given id' });
    // }

    // const payment = await Payment.find({ _id: payment_id });
    // if (!payment.length) {
    //   return res.status(404).json({ msg: 'No payment found with the given id' });
    // }

    // const bModels = await bModel.find({ _id: bModel_id });
    // if (!bModels.length) {
    //   return res.status(404).json({ msg: 'No model found with the given id' });
    // }

    const uuid = crypto.randomUUID();
    const timestamp = Date.now().toString(36);
    const hashInput = `${uuid}-${timestamp}`;
    const hash = crypto.createHash('sha256').update(hashInput).digest('hex');
    const id = hash.slice(0, 15);
    const _id = "tp-" + id;

    try {
        const template = new Template({
          _id: _id,
          name,
          description,
          commerce_id,
          cms_id,
          payment_id,
          crm_id,
          search_id,
          type,
          bModel_id,
          user_id: req.userId
        });

        await template.save();
        res.status(201).json({
          "status": "success",
          "template_id": _id,
          "message": "Template created successfully"
        });
    } catch (error) {
        return res.status(500).json({ msg: 'Server error', error: error.message });
    }
}

exports.userAllTemplates = async (req, res) => {
    try {
        const templates = await Template.find({ user_id: req.userId });
        
        if (!templates.length) {
          return res.status(404).json({ msg: 'No templates found' });
        }
    
        res.json(templates);
      } catch (error) {
        return res.status(500).json({ msg: 'Server error', error: error.message });
      }
}

exports.individualTemplate = async (req, res) =>{
    try {
        const template = await Template.findOne({ _id: req.params.id, user_id: req.userId });
        
        if (!template.length) {
          return res.status(404).json({ msg: 'No template found' });
        }
    
        res.json(template);
      } catch (error) {
        return res.status(500).json({ msg: 'Server error', error: error.message });
      }
}

exports.updateTemplate = async (req, res) => {
    const { name, description, bModel, type, commerce_id, cms_id, crm_id, payment_id, search_id } = req.body;

    const updates = { name, description, bModel, type, commerce_id, cms_id, crm_id, payment_id, search_id };
  
    try {
      const template = await Template.findOne({ _id: req.params.id, user_id: req.userId });
      
      if (!template) {
        return res.status(404).json({ msg: 'Template not found' });
      }
  
      const updatedTemplate = await Template.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
      res.json(updatedTemplate);
    } catch (error) {
      return res.status(500).json({ msg: 'Server error', error: error.message });
    }
}

exports.deleteTemplate = async (req, res) => {
    try {
        const template = await Template.findOneAndDelete({ _id: req.params.id, user_id: req.userId });
    
        if (!template) {
          return res.status(404).json({ msg: 'Template not found' });
        }
    
        res.json({ msg: 'Template deleted successfully' });
      } catch (error) {
        return res.status(500).json({ msg: 'Server error', error: error.message });
      }
}