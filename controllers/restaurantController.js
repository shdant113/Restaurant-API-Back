const express = require('express')
const router = express.Router();
const Restaurant = require('../models/restaurant')
const fetch = require('node-fetch')

const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Chicago&key=${process.env.API}`

// show all
router.get('/', async (req, res, next) => {
	console.log("hittingsdfasdfsdf")
	try {
		const getRestaurants = await fetch(url);
		const response = await getRestaurants.json();
		// console.log(response)
		// fetch(url)
		// 	.then((response) => {
		// 		response.json().then((data) => {
		// 			console.log(data)
		// 		})
		// 	})
		res.json({
			status: 200,
			data: response
		})
		// console.log(getRestaurants)
	} catch (err) {
		console.log("there was an error")
		next(err)
	}
});

// create new
router.post('/', async (req, res) => {
	try {
		const createRestaurant = Restaurant.create(req.body)
		res.json({
			status: 200,
			data: createRestaurant
		})
		console.log(createRestaurant)
	} catch (err) {
		res.send(err)
	}
});

// edit one
router.get('/:id/edit', async (req, res) => {
	try {
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
	try {
		const updateRestaurant = await Restaurant.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
			);
		res.json({
			status: 200,
			data: updateRestaurant
		})
	} catch (err) {
		res.send(err)
	}
});

// delete one
router.delete('/:id', async (req, res) => {
	try {
		const deleteRestaurant = await Restaurant.findByIdAndRemove(req.params.id);
		res.json({
			status: 200,
			data: deleteRestaurant
		})
	} catch (err) {
		res.send(err)
	}
});



module.exports = router;