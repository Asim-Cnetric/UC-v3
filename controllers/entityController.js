const getImageUrl = require("../config/imageMapping");
const cms = require("../models/cms");
const commerce = require("../models/commerce");
const crm = require("../models/crm");
const payments = require("../models/payments");
const search = require("../models/search");


exports.entities = async (req,res) => {
    const response = {};

    try{
        let Commerces = await commerce.find();
        Commerces = getImageUrl(req, 'commerce', Commerces);

        let Crms = await crm.find();
        Crms = getImageUrl(req, 'crm', Crms);

        let Cms = await cms.find();
        Cms = getImageUrl(req, 'cms', Cms);

        let Search = await search.find();
        Search = getImageUrl(req, 'search', Search);

        let Payment = await payments.find();
        Payment = getImageUrl(req, 'payment', Payment);

        response.Commerce = Commerces;
        response.CRM = Crms;
        response.CMS = Cms;
        response.Search = Search;
        response.Payment = Payment;

        res.status(200).json({
            "status": "success",
            "data": response
        });
    } catch (error) {
        return res.status(500).json({ msg: 'Server Error', error: error.message });
    }
}