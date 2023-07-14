const jwt = require('jsonwebtoken');

const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        return res.status(401).send('A token must be provided')
    }  

    try {
        const decoded = jwt.verify(token, config.JWT);
        req.user = decoded
    } catch (error) {
        return res.status(400).send('Invalid Token');
    }

    return next()
};

module.exports = verifyToken;