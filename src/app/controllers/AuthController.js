const User = require('../models/User');
const jwt = require('jsonwebtoken');

const {
    mongooseToObject
} = require('../../util/mongoose');

const handleErrors = (err) => {

    console.log(err.message, err.code);
    let errors = {
        email: '',
        password: ''
    };

    if (err.message === 'incorrect email') {
        errors.email = 'Email này chưa được đăng ký';
    }

    if (err.message === 'incorrect password') {
        errors.password = 'Mật khẩu không chính xác';
    }

    //handle errors

    //duplicate error code
    if (err.code === 11000) {
        errors.email = 'Email này đã được sử dụng';
        return errors;
    }

    //validation errors
    if (err.message.includes('User validation failed')) {

        Object.values(err.errors).forEach(({
            properties
        }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({
        id
    }, 'secret key', {
        expiresIn: maxAge
    });
}

class AuthController {

    // GET /general
    show(req, res, next) {
        res.render('auth/general');
    }

    signup_post = async (req, res, next) => {
        const {
            email,
            password,
            type_user,
        } = req.body;

        try {
            const user = await User.create({
                email,
                password,
                type_user,

            });
            const token = createToken(user._id);
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: maxAge * 1000
            });
            res.status(201).json({
                user: user._id
            });
                        
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({
                errors
            });
        }
    }

    signin_post = async (req, res, next) => {
        const {
            email,
            password
        } = req.body;

        try {
            const user = await User.login(email, password);
            const token = createToken(user._id);
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: maxAge * 1000
            });
            res.status(200).json({
                user: user._id
            });

        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({
                errors
            });
        }
    }

    logout_get = (req, res) => {
        res.cookie('jwt', '', {
            maxAge: 1
        });
        res.redirect('/');
    }
}
module.exports = new AuthController();