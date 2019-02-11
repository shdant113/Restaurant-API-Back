const express = require('express')
const router = express.Router();
const Restaurant = require('../models/restaurant')

// show all
router.get('/', async (req, res) => {
	try {
		const getRestaurants = await Restaurant.find();
		// response json
		res.json({
			status: 200,
			data: getRestaurants
		})
	} catch (err) {
		res.send(err)
	}
});

// create new
router.post('/', async (req, res) => {
	try {
		const createRestaurant = await Restaurant.create(req.body);
		res.json({
			status: 200,
			data: createRestaurant
		})
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