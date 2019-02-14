const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const session = require('express-session')

// log in 
router.post('/login', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({ username: req.body.username });
		// if the current user does not exist, user either has not registered or
		// mistyped username --> send them error
		if (currentUser === null) {
			res.json({
				status: 404,
				data: 'login information is not correct'
			})
		// compare passwords with bcrypt
		} else {
			if (bcrypt.compareSync(req.body.password, currentUser.password)) {
				req.session._id = currentUser._id;
				req.session.username = currentUser.username;
				req.session.logged = true;
				// successful log in
				res.json({
					status: 200,
					data: 'login information is correct'
				})
			} else {
				// retry login
				res.json({
					status: 404,
					data: 'login information is not correct'
				})
			}
		}
	} catch (err) {
		console.log(err)
		next(err)
	}
});

// register
router.post('/register', async (req, res, next) => {
	// set up bcrypt hashing
	const hashPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	// enter form data into db
	const userDbEntry = {};
	userDbEntry.username = req.body.username;
	userDbEntry.password = hashPassword;
	try {
		const user = await User.create(userDbEntry);
		// set user credentials for the session --> newly registered user
		// does not need to log in
		req.session.logged = true;
		req.session.username = user.username;
		req.session.password = user.password;
		// successful registration --> username must be unique
		res.json({
			status: 200,
			data: {
				user: user,
				message: `created user ${user.username}`
			}
		});
	} catch(err){
		console.log(err);
		next(err);
	}
});

// 

module.exports = router;