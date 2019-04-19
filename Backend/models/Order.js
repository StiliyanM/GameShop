const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    creationDate: { type: mongoose.Schema.Types.Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;