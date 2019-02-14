const express = require('express');
const mongoose = require('mongoose');
const Restaurant = require('../models/restaurant');
const session = require('express-session');
const User = require('../models/user');
const fetch = require('node-fetch');
const router = express.Router();


// city search
router.post('/city', async (req, res, next) => {
	try {
		const findUser = await User.findOne({ username: req.session.username })
		const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+${req.body.city}&key=${process.env.API}`
		// console.log(url)
		const getRestaurants = await fetch(url);
		console.log('\n this happened')
		// console.log(getRestaurants)
		const response = await getRestaurants.json();
		console.log('\n this also happened')
		console.log(response)
		res.json({
			status: 200,
			data: response
		})
		console.log('sent the response')
		// console.log(getRestaurants)
	} catch (err) {
		console.log("there was an error")
		next(err)
	}
});

// save restaurant
router.post('/save', async (req, res, next) => {
	console.log('hitting the save route')
	try {
		const findUser = await User.findOne({ username: req.session.username });
		// console.log(findUser)
		// console.log(req.session)
		// console.log(findUser + ' this is the user')
		const restaurantEntry = {}
		restaurantEntry.name = req.body.name;
		restaurantEntry.formatted_address = req.body.formatted_address;
		// console.log(restaurantEntry + ' this is the restaurant')
		const saveEntry = await Restaurant.create(restaurantEntry)
		findUser.savedRestaurants.push(saveEntry);
		await findUser.save();
		// console.log('successfully saved db')
		// console.log(`these are ${findUser}'s saved restaurants:`)
		console.log("\n here is findUser")
		console.log(findUser)
	} catch (err) {
		next(err)
	}
});

// return saved restaurants
router.get('/getsaved', async (req, res, next) => {
	console.log('hitting the return saved route')
	try {
		const findUser = await User.findOne({ username: req.session.username });
		// console.log("\nfindUser")
		// console.log(findUser)
		// console.log('found a user')
		// const findSaved = await findUser.savedRestaurants.find({});
		// console.log('found users saved restaurants')
		res.json({
			status: 200,
			data: findUser.savedRestaurants
		})
	} catch (err) {
		next(err)
	}
});

// create new
router.post('/', async (req, res) => {
	try {
		const findUser = await User.findOne({ username: req.session.username });
		const restaurantEntry = {};
		restaurantEntry.name = req.body.name;
		restaurantEntry.formatted_address = req.body.formatted_address;
		const createRestaurant = await Restaurant.create(req.body);
		findUser.savedRestaurants.push(createRestaurant);
		await findUser.save();
		res.json({
			status: 200,
			data: createRestaurant
		})
	} catch (err) {
		res.send(err)
	}
});

// edit one
router.get('/:id', async (req, res) => {
	console.log('hitting edit route')
	try {
		const findUser = await User.findOne({ username: req.session.username })
		const findRestaurant = await Restaurant.findById(req.params.id);
		res.json({
			status: 200,
			data: findRestaurant
		})
	} catch (err) {
		res.send(err)
	}
});

// update one
router.put('/:id', async (req, res) => {
	console.log(req.body)
	console.log('hitting update route')
	try {
		const findUser = await User.findOne({ username: req.session.username });
		console.log('\nfound user')
		console.log(findUser)
		console.log('\nreq.params.id is:')
		console.log(req.params.id)
		console.log('\nreq.body is:')
		console.log(req.body)

		const updateRestaurant = await Restaurant.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		// findUser.savedRestaurants.id(req.params.id).remove();
		// await findUser.save();
		// console.log('removed old')
		// const newRestaurant = await Restaurant.findOne({ name: req.body.name });
		// findUser.savedRestaurants.push(newRestaurant);
		// await findUser.save();
		// console.log('added new')
		console.log('went through update')
		console.log('\nupdated restaurant is:')
		console.log(updateRestaurant)
		// console.log('saved user')
		// findUser.savedRestaurants.id(req.params.id).remove();
		// await findUser.save();
		// findUser.savedRestaurants.push(updateRestaurant);
		// await findUser.save();
		res.json({
			status: 200,
			data: updateRestaurant
		})
		console.log('sent back new data')
	} catch (err) {
		res.send(err)
	}
});

// delete one
router.delete('/:id', async (req, res) => {
	try {
		console.log('hitting route')
		const findUser = await User.findOne({ username: req.session.username });
		const deleteRestaurant = await Restaurant.findByIdAndRemove(req.params.id);
		findUser.savedRestaurants.id(req.params.id).remove();
		await findUser.save();
		res.json({
			status: 200,
			data: deleteRestaurant
		})
		console.log('went through route')
	} catch (err) {
		res.send(err)
	}
});



module.exports = router;