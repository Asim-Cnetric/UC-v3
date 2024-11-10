// const bModel = require('../models/bModel');
// const cms = require('../models/cms');
// const commerce = require('../models/commerce');
// const crm = require('../models/crm');
// const payment = require('../models/payments');
// const search = require('../models/search');

// const bModelCheck = async (req, res, next) => {
//     try {
//       const { bModel_id } = req.body;
  
//       if (!bModel_id) {
//         return res.status(400).json({ message: 'bModel ID is required in the request body' });
//       }

//       const bModels = await bModel.findById(bModel_id);
  
//       if (!bModels) {
//         return res.status(404).json({ message: 'bModel not found' });
//       }
  
//       req.bModel = bModels;
  
//       next();
//     } catch (error) {
//       res.status(500).json({ error: 'Server error while checking template existence' });
//     }
//   };

//   const cmsCheck = async (req, res, next) => {
//     try {
//       const { cms_id } = req.body;
  
//       if (!cms_id) {
//         return res.status(400).json({ message: 'CMS ID is required in the request body' });
//       }

//       const CMS = await cms.findById(cms_id);
  
//       if (!CMS) {
//         return res.status(404).json({ message: 'CMS not found' });
//       }
  
//       req.cms = CMS;
  
//       next();
//     } catch (error) {
//       res.status(500).json({ error: 'Server error while checking template existence' });
//     }
//   };

// const commerceCheck = async (req, res, next) => {
//     try {
//       const { commerce_id } = req.body;
  
//       if (!commerce_id) {
//         return res.status(400).json({ message: 'Commerce ID is required in the request body' });
//       }

//       const commerces = await commerce.findById(commerce_id);
  
//       if (!commerces) {
//         return res.status(404).json({ message: 'Commerce not found' });
//       }
  
//       req.commerce = commerces;
  
//       next();
//     } catch (error) {
//       res.status(500).json({ error: 'Server error while checking template existence' });
//     }
//   };

//   const crmCheck = async (req, res, next) => {
//     try {
//       const { crm_id } = req.body;
  
//       if (!crm_id) {
//         return res.status(400).json({ message: 'CRM ID is required in the request body' });
//       }

//       const crms = await crm.findById(crm_id);
  
//       if (!crms) {
//         return res.status(404).json({ message: 'CRM not found' });
//       }
  
//       req.crm = crms;
  
//       next();
//     } catch (error) {
//       res.status(500).json({ error: 'Server error while checking template existence' });
//     }
//   };
  
//   const paymentCheck = async (req, res, next) => {
//     try {
//       const { payment_id } = req.body;
  
//       if (!payment_id) {
//         return res.status(400).json({ message: 'Payment ID is required in the request body' });
//       }

//       const payments = await payment.findById(payment_id);
  
//       if (!payments) {
//         return res.status(404).json({ message: 'Payment not found' });
//       }
  
//       req.payment = payments;
  
//       next();
//     } catch (error) {
//       res.status(500).json({ error: 'Server error while checking template existence' });
//     }
//   };

//   const searchCheck = async (req, res, next) => {
//     try {
//       const { search_id } = req.body;
  
//       if (!search_id) {
//         return res.status(400).json({ message: 'Search ID is required in the request body' });
//       }

//       const seacrhs = await search.findById(commerce_id);
  
//       if (!seacrhs) {
//         return res.status(404).json({ message: 'Seacrh not found' });
//       }
  
//       req.search = seacrhs;
  
//       next();
//     } catch (error) {
//       res.status(500).json({ error: 'Server error while checking template existence' });
//     }
//   };

//   module.exports = commerceCheck;

const mongoose = require('mongoose');

/**
 * Middleware to check if multiple entities exist in the database.
 * @param {Array} entitiesToCheck - Array of objects containing model and idFieldName properties for each entity to check.
 */
const checkEntitiesExist = (entitiesToCheck) => async (req, res, next) => {
  try {
    for (const { model, idFieldName } of entitiesToCheck) {
      const entityId = req.body[idFieldName]; 

      if (!entityId) {
        return res.status(400).json({ message: `${idFieldName} is required in the request body` });
      }

      const entity = await model.findById(entityId);

      if (!entity) {
        return res.status(404).json({ message: `${model.modelName} with ID not found` });
      }

      req[idFieldName] = entity;
    }
    
    next();
  } catch (error) {
    res.status(500).json({ error: 'Server error while checking entity existence' });
  }
};

module.exports = checkEntitiesExist;
