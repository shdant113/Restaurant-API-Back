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
		console.log('found current user')
		if (bcrypt.compareSync(req.body.password, currentUser.password)) {
			console.log('bcrypt')
			req.session._id = currentUser._id;
			req.session.username = currentUser.username;
			// req.session.password = currentUser.password;
			req.session.logged = true;
			console.log('passwords match')
			res.json({
				status: 200,
				data: 'login information is correct'
			})
		} else {
			console.log('passwords dont match')
			res.json({
				status: 404,
				data: 'login information is not correct'
			})
		}
		console.log('compared passwords')
		console.log(currentUser + 'this is currentUser')
	} catch (err) {
		next(err)
	}
});

// register
router.post('/register', async (req, res, next) => {
	console.log('were running code')
	const hashPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	console.log('we got to has the password')
	const userDbEntry = {};
	console.log('we are starting a db entry')
	userDbEntry.username = req.body.username;
	console.log('username is entered')
	userDbEntry.password = hashPassword;
	console.log('password is entered')
	try {
		console.log('were in the try block')
		const user = await User.create(userDbEntry);
		console.log(user + ' this is user')
		req.session.logged = true;
		req.session.username = user.username;
		req.session.password = user.password;
		console.log(req.session + ' this is req.session')
		res.json({
			status: 200,
			data: {
				user: user,
				message: `created user ${user.username}`
			}
		});
	} catch(err){
		console.log('back end error')
		console.log(err);
		next(err);
	}
});

// 

module.exports = router;