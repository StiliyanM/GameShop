const user = require('../models/User')
const Order = require('../models/Order');

module.exports = {


    checkout: (req, res) => {

        let products = req.body;
        
                Order.create({
                    user: req.userId,
                    products: products,
                }).then((order) => {
                    user.update({ _id: req.userId }, { $push: { orders: order._id } }).then(() => {
                        return res.status(200).json({
                            message: 'Thank you for your order!',
                            data: order
                        });
                    });
                }).catch((err) => {
                    console.log(err);
                    return res.status(400).json({
                        message: 'Something went wrong, please try again.'
                    });
            });
    }
};