const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Workspace = require('../models/workspaceModel');
const Template = require('../models/templatesModel');
const authMiddleware = require('../middleware/authMiddleware');
const crypto = require('crypto');
const { param } = require('../routes/authRoutes');

exports.createWorkspace = async (req, res) => {
    const { name, description, commerce, cms, payment, composer_url, crm, search } = req.body;

    const tempateDetails = await Template.findOne({ _id: req.tempId, user_id: req.userId });
    const commerce_id = tempateDetails.commerce_id;
    const cms_id = tempateDetails.cms_id;
    const crm_id = tempateDetails.crm_id;
    const search_id = tempateDetails.search_id;
    const payment_id = tempateDetails.payment_id;

    if (!name || !commerce || !cms || !payment || !crm || !search || !composer_url ) {
      return res.status(400).json({
        "status": "Error",
        "message": "bad request. Wrong data or there is data missing."
    });
    }

    if( !commerce.creds){
      return res.status(400).json({
        "status": "Error",
        "message": "bad request. Wrong Commerce data or data missing."
    });
    }

    if( !cms.creds){
      return res.status(400).json({
        "status": "Error",
        "message": "bad request. Wrong CMS data or data missing."
    });
    }

    if( !payment.creds){
      return res.status(400).json({
        "status": "Error",
        "message": "bad request. Wrong Payment data or data missing."
    });
    }

    if( !crm.creds){
      return res.status(400).json({
        "status": "Error",
        "message": "bad request. Wrong CRM data or data missing."
    });
    }

    if( !search.creds){
      return res.status(400).json({
        "status": "Error",
        "message": "bad request. Wrong Search data or data missing."
    });
    }

    const uuid = crypto.randomUUID();
    const timestamp = Date.now().toString(36);
    const hashInput = `${uuid}-${timestamp}`;
    const hash = crypto.createHash('sha256').update(hashInput).digest('hex');
    const id = hash.slice(0, 15);
    const _id = "ws-" + id;
  
    try {
      const workspace = new Workspace({
        _id: _id,
        name,
        description,
        commerce: {
          commerce_id: commerce_id,
          creds: commerce.creds
        },
        cms: {
          cms_id: cms_id,
          creds: cms.creds
        },
        payment: {
          payment_id: payment_id,
          creds: payment.creds
        },
        crm: {
          crm_id: crm_id,
          creds: crm.creds
        },
        search: {
          search_id: search_id,
          creds: search.creds
        },
        composer_url,
        user_id: req.userId,
        template_id: req.tempId
      });
  
      await workspace.save();
      res.status(201).json({ msg: 'Workspace created successfully' });
    } catch (error) {
      return res.status(500).json({ msg: 'Server error', error: error.message });
    }
}

exports.userAllWorkspaces = async (req, res) => {
    try {
        const workspaces = await Workspace.find({ user_id: req.userId });
        
        if (!workspaces.length) {
          return res.status(404).json({ msg: 'No workspaces found' });
        }
    
        res.json(workspaces);
      } catch (error) {
        return res.status(500).json({ msg: 'Server error', error: error.message });
      }
}

exports.individualWorkspace = async (req, res) => {
    try {
        const workspaces = await Workspace.findOne({ _id: req.params.id, user_id: req.userId });
        
        if (!workspaces.length) {
          return res.status(404).json({ msg: 'No workspaces found' });
        }
    
        res.json(workspaces);
      } catch (error) {
        return res.status(500).json({ msg: 'Server error', error: error.message });
      }
}

exports.updateWorkspace = async (req, res) => {
    const { name, description, commerce, cms, payment, composer_url } = req.body;

    const updates = { name, description, commerce, cms, payment, composer_url };
  
    try {
      const workspace = await Workspace.findOne({ _id: req.params.id, user_id: req.userId });
      
      if (!workspace) {
        return res.status(404).json({ msg: 'Workspace not found' });
      }
  
      const updatedWorkspace = await Workspace.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
      res.json(updatedWorkspace);
    } catch (error) {
      return res.status(500).json({ msg: 'Server error', error: error.message });
    }
}

exports.deleteWorkspace = async (req, res) => {
    try {
        const workspace = await Workspace.findOneAndDelete({ _id: req.params.id, user_id: req.userId });
    
        if (!workspace) {
          return res.status(404).json({ msg: 'Workspace not found' });
        }
    
        res.json({ msg: 'Workspace deleted successfully' });
      } catch (error) {
        return res.status(500).json({ msg: 'Server error', error: error.message });
      }
}
