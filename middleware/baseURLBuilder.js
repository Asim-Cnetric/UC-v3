const baseURL = (req, res, next) => {
    req.baseUrl = `${req.protocol}://${req.get('host')}`;
    next();
}

module.exports = baseURL;