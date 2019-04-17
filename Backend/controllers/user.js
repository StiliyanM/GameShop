const validator = require('validator');
const encryption = require('../util/encryption')
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const configuration = require("../config/config")["development"];

function validateRegisterForm(payload) {
    let errors = {};
    let isFormValid = true;

    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = 'Please provide a correct email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 3) {
        isFormValid = false;
        errors.password = 'Password must have at least 3 characters.';
    }

    if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
        isFormValid = false;
        errors.name = 'Please provide your name.';
    }

    return {
        success: isFormValid,
        errors
    };
}

function validateLoginForm(payload) {
    let errors = {};
    let isFormValid = true;

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
        isFormValid = false;
        errors.password = 'Please provide your password.';
    }

    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = 'Please provide a correct email address.';
    }

    return {
        success: isFormValid,
        errors
    };
}

module.exports = {
    register: async (req, res, next) => {

        const validationResult = validateRegisterForm(req.body)
        if (validationResult.success) {
            try {
              const { email, username, password } = req.body;
      
              const salt = encryption.generateSalt();
              const hashedPassword = encryption.generateHashedPassword(password, salt);
      
              const newUser = {
                email,
                password: hashedPassword,
                username,
                salt,
                roles: ["User"],
              };
      
              const user = await User.create(newUser);
      
              res.status(201).json({ message: 'You are successfully reggistrated!', userId: user.id });
            } catch (error) {
              if (!error.statusCode) {
                error.statusCode = 500;
              }
              next(error);
            }
          } else{
            return res.status(400).json({
                message: 'Register form validation failed!',
                errors: validationResult.errors
            });
          }
          },

    login: async (req, res, next) => {
        let validationResult = validateLoginForm(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                message: 'Login form validation failed!',
                errors: validationResult.errors
            });
        }

        try {
            const { email } = req.body;
    
            const user = await User.findOne().where("email").equals(email);
    
            const token = jwt.sign({ userId: user._id.toString() }, configuration.decodedToken, { expiresIn: '16h' });
    
            res.status(200).json({ message: 'You are successfully logged in!', token, user });
          } catch (error) {
            if (!error.statusCode) {
              error.statusCode = 500;
            }
    
            next(error);
          }
        },

    // getPurchaseHistory: (req, res) => {
    //     let userId = req.user.id;
    //     RECEIPT
    //         .find({ user: userId })
    //         .sort({ creationDate: -1 })
    //         .then((receipts) => {
    //             res.status(200).json({
    //                 message: '',
    //                 data: receipts
    //             });
    //         });
    // },
};