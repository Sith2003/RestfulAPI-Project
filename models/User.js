const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, require: true },
    lastname: { type: String, require: true },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String }
});

module.exports = mongoose.model('User', UserSchema);