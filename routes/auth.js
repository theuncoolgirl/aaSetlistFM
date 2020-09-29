const jwt = require('jsonwebtoken');
const bearerToken = require('express-bearer-token');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');
// const { check } = require('express-validator');

const { secret, expiresIn } = jwtConfig;

const getUserToken = (user) => {
    const userDataForToken = {
        email: user.email,
    };
    // Create the token
    const token = jwt.sign(
        { data: userDataForToken },
        secret,
        { expiresIn }
    );

    return token;
};

// const validateEmailAndPassword = [
//     check("email")
//         .exists({ checkFalsy: true })
//         .isEmail()
//         .withMessage("Please provide a valid email."),
//     check("password")
//         .exists({ checkFalsy: true })
//         .withMessage("Please provide a password."),
// ];

const restoreUser = (req, res, next) => {
    const { token } = req;

    if (!token) {
        return res.set('WWW-Authenticate', 'Bearer').status(401).end();
    }

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            err.status = 401;
            return next(err);
        }

        const { email } = jwtPayload.data;

        try {
            req.user = await User.findOne({ where: { email } });
        } catch (e) {
            return next(e);
        }

        if (!req.user) {
            return res.set('WWW-Authenticate', 'Bearer').status(401).end();
        }

        return next();
    });
};

const requireAuth = [bearerToken(), restoreUser]

module.exports = {
    getUserToken,
    requireAuth,
    // validateEmailAndPassword
};
