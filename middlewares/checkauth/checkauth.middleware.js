const jwt = require('jsonwebtoken');
const keys = require('./../../config/keys');
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, keys.JWT_SECRET);
        console.log("IN THE MIDDLE OF THINGS");
        next();
    }
    catch (err) {
        res.status(401).json({message: 'Auth failed!', err})
    }
}