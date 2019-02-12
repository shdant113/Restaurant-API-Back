const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const restaurantSchema = new Schema({
	name: String,
	formatted_address: String
})
const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;