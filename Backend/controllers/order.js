const user = require('../models/User')
const Order = require('../models/Order');

module.exports = {


    checkout: (req, res) => {
        let userId = req.user.id;
        let order = req.body;
        
                Order.create({
                    user: userId,
                    products: order.products,
                }).then((order) => {
                    user.update({ _id: userId }, { $push: { orders: order._id } }).then(() => {
                        return res.status(200).json({
                            message: 'Thank you for your order! Books will be sent to you as soon as possible!',
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