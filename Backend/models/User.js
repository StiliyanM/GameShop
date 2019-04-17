const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: mongoose.Schema.Types.String, required: true, unique: true },
    email: { type: mongoose.Schema.Types.String, required: true, unique: true },
    password: { type: mongoose.Schema.Types.String, required: true },
    salt: { type: mongoose.Schema.Types.String, required: true },
    isAdmin: { type: mongoose.Schema.Types.Boolean, default: false },
    roles: [{ type: mongoose.Schema.Types.String}],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],

});

const User = mongoose.model('User', userSchema);

module.exports = User;