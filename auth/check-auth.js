const jwt = require('jsonwebtoken')

const HttpError = require('../utils/http-error')

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        // console.log(token);
        if (!token) {
            throw new HttpError("No Token Provided", 300);
        }

        let decodedToken;
        decodedToken = jwt.verify(token, "MySuperSecretKey")
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        const error = new HttpError("Authentication failed", 403)
        return next(error);
    }
}