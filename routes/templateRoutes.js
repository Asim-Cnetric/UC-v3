const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createTemplate, userAllTemplates, individualTemplate, updateTemplate, deleteTemplate } = require('../controllers/templateController');
const entityChecker = require('../middleware/entityChecker');
const bModel = require('../models/bModel');
const CMS = require('../models/cms');
const Commerce = require('../models/commerce');
const CRM = require('../models/crm');
const Payment = require('../models/payments');
const Search = require('../models/search');

const router = express.Router();

router.post('/', authMiddleware, entityChecker([
    { model: bModel, idFieldName: 'bModel_id'},
    { model: CMS, idFieldName: 'cms_id'},
    { model: Commerce, idFieldName: 'commerce_id'},
    { model: CRM, idFieldName: 'crm_id'},
    { model: Payment, idFieldName: 'payment_id'},
    { model: Search, idFieldName: 'search_id'},
]), createTemplate);
router.get('/', authMiddleware, userAllTemplates);
router.get('/:id', authMiddleware, individualTemplate);
router.put('/:id', authMiddleware, updateTemplate)
router.delete('/:id', authMiddleware, deleteTemplate)

router.use('/:tempId', (req, res, next) => {
    req.tempId = req.params.tempId;
    next();
});

router.use('/:tempId/workspaces', require('./workspaceRoutes'));

module.exports = router;
