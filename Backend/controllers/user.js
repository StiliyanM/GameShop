const validator = require('validator');
const encryption = require('../util/encryption')
const User = require('../models/User')
const Order = require('../models/Order')
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
      
              res.status(201).json({ message: 'You are successfully registered!', userId: user.id });
            } catch (error) {
              if (!error.statusCode) {
                error.statusCode = 500;
                if (error.name === 'MongoError' && error.code === 11000) {
                    return res.status(500).send({ success: false, message: 'User already exist!' });
                  }            
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
    
            if(!user) {
                return res.status(500).send({ success: false, message: 'Invalid credentials!' });
            }
            const token = jwt.sign({ userId: user._id.toString() }, configuration.decodedToken, { expiresIn: '9h' });

            res.status(200).json({ message: 'You are successfully logged in!', token, user });
          } catch (error) {
            if (!error.statusCode) {
              error.statusCode = 500;
            }
    
            next(error);
          }
        },

    purchaseHistory: (req, res) => {
        let userId = req.userId;
        const data = []

        Order
            .find({ user: userId })
            .sort({ creationDate: -1 })
            .then((orders) => {

                orders.forEach(o => {
                    o.products.forEach(p => {
                        data.push({
                            title: p.title,
                            price: p.price,
                            quantity: p.quantity,
                            date: o.creationDate
                        })
                    })
                });
                res.status(200).json({
                    message: '',
                    data: data
                    })
            });
    },

};