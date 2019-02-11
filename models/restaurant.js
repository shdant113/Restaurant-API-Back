const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const restaurantSchema = new Schema({
	name: String,
	address: String,
	city: String,
	state: String
})

mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;