const mongoose = require('mongoose');
const Restaurant = require('./restaurant')
const Schema = mongoose.Schema;
const userSchema = new Schema ({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	savedRestaurants: [Restaurant.schema]
});

const User = mongoose.model('User', userSchema)
module.exports = User;