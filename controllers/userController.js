const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = '../models/user';

router.get('/:id', async (req, res, next) => {
	try {
		const findUser = await User.findById(req.params.id);
		const currentUser = await User.findOne({ username: req.session.username });
		res.json({
			status: 200,
			data: foundUser
		})
	} catch (err) {
		next(err)
	}
});