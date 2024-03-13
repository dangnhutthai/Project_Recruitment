const jwt = require('jsonwebtoken');
const User = require('../app/models/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'secret key', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('/')
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'secret key', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user.toObject();
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = {
    requireAuth,
    checkUser,
}