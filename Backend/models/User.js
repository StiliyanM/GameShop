const mongoose = require('mongoose');

const encryption = require('../util/encryption');

const userSchema = mongoose.Schema({
    username: { type: mongoose.Schema.Types.String, required: true, unique: true },
    email: { type: mongoose.Schema.Types.String, required: true, unique: true },
    password: { type: mongoose.Schema.Types.String, required: true },
    salt: { type: mongoose.Schema.Types.String, required: true },
    isAdmin: { type: mongoose.Schema.Types.Boolean, default: false },
    roles: [{ type: mongoose.Schema.Types.String}],
});

const User = mongoose.model('User', userSchema);

// User.seedAdminUser = async () => {
//     try {
//       let users = await User.find();
//       if (users.length > 0) return;
//       const salt = encryption.generateSalt();
//       const hashedPass = encryption.generateHashedPassword(salt, 'Admin');
//       return User.create({
//         name: 'Admin',
//         email: 'admin@admin.com',
//         salt,
//         hashedPass,
//         roles: ['Admin']
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   };

module.exports = User;