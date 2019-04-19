const user = require('../models/User')
const Order = require('../models/Order');

module.exports = {


    checkout: (req, res) => {
        //temporary
        let userId = '5cb8bc0de15b21352c74ba70';
        let order = req.body;
        
                Order.create({
                    user: userId,
                    products: order.products,
                }).then((order) => {
                    user.update({ _id: userId }, { $push: { orders: order._id } }).then(() => {
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