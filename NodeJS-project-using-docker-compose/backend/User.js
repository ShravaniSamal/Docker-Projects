const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    birthdate: String,
    birthplace: String,
    birthtime: String
});

module.exports = mongoose.model("User", UserSchema);
