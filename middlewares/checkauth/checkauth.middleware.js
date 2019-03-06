const jwt = require('jsonwebtoken');
const keys = require('./../../config/keys');
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, keys.JWT_SECRET);
        let decoded = jwt.decode(token);
        req.user = {
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role
        }
        next();
    }
    catch (err) {
        res.status(401).json({message: 'Auth failed!', err})
    }
}