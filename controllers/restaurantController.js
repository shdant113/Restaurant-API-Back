const express = require('express');
const mongoose = require('mongoose');
const Restaurant = require('../models/restaurant');
const session = require('express-session');
const User = require('../models/user');
const fetch = require('node-fetch');
const router = express.Router();

// post route for city the user searched
router.post('/city', async (req, res, next) => {
	try {
		// find current user
		const findUser = await User.findOne({ username: req.session.username })
		// req.body.city added within url
		const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+${req.body.city}&key=${process.env.API}`
		// fetch call for data from google maps api
		const getRestaurants = await fetch(url);
		// parse into json
		const response = await getRestaurants.json();
		// response to client
		res.json({
			status: 200,
			data: response
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
});

// post route for the user to save selected restaurants
router.post('/save', async (req, res, next) => {
	try {
		// find current user
		const findUser = await User.findOne({ username: req.session.username });
		// enter selected restaurant into db --> saved under user's saved collection
		const restaurantEntry = {}
		restaurantEntry.name = req.body.name;
		restaurantEntry.formatted_address = req.body.formatted_address;
		// create entry
		const saveEntry = await Restaurant.create(restaurantEntry)
		findUser.savedRestaurants.push(saveEntry);
		// save db
		await findUser.save();
	} catch (err) {
		console.log(err)
		next(err)
	}
});

// return saved restaurants on profile
router.get('/getsaved', async (req, res, next) => {
	console.log('hitting the return saved route')
	try {
		// find current user
		const findUser = await User.findOne({ username: req.session.username });
		// return user's saved collection to client
		res.json({
			status: 200,
			data: findUser.savedRestaurants
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
});

// create new restaurant --> add ONLY to saved restaurants
router.post('/', async (req, res, next) => {
	try {
		// find current user
		const findUser = await User.findOne({ username: req.session.username });
		// set up db entry
		const restaurantEntry = {};
		restaurantEntry.name = req.body.name;
		restaurantEntry.formatted_address = req.body.formatted_address;
		// create db entry
		const createRestaurant = await Restaurant.create(req.body);
		// push new restaurant to saved
		findUser.savedRestaurants.push(createRestaurant);
		// save db
		await findUser.save();
		// respond to client to print
		res.json({
			status: 200,
			data: createRestaurant
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
});

// edit a saved restaurant
router.get('/:id', async (req, res, next) => {
	try {
		// find user
		const findUser = await User.findOne({ username: req.session.username })
		// find restaurant to edit
		const findRestaurant = await Restaurant.findById(req.params.id);
		res.json({
			status: 200,
			data: findRestaurant
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
});

// update a saved restaurant
router.put('/:id', async (req, res, next) => {
	try {
		// find current user
		const findUser = await User.findOne({ username: req.session.username });
		// populate restaurant to update with new body
		const updateRestaurant = await Restaurant.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		// return new restaurant to client
		res.json({
			status: 200,
			data: updateRestaurant
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
});

// delete a saved restaurant
router.delete('/:id', async (req, res, next) => {
	try {
		// find current user
		const findUser = await User.findOne({ username: req.session.username });
		// find restaurant to delete
		const deleteRestaurant = await Restaurant.findByIdAndRemove(req.params.id);
		// remove it from database
		findUser.savedRestaurants.id(req.params.id).remove();
		// save user collection
		await findUser.save();
		// send data back to client after removing restaurant
		res.json({
			status: 200,
			data: deleteRestaurant
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
});

module.exports = router;