var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id: String,
    name: String,
    photo: String,
    phone_number: {type: Number, default: null},
});

module.exports = mongoose.model('User', userSchema);