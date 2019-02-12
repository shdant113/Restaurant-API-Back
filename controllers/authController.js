const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const session = require('express-session')

// log in 
router.post('/login', async (req, res, next) => {
	try {
		const findUser = await User.findById(req.params.id);
		console.log(findUser + ' this is findUser')
		const currentUser = await User.findOne({ username: req.body.username });
		if (bcrypt.compareSync(req.body.password, currentUser.password)) {
			req.session._id = currentUser._id;
			req.session.username = currentUser.username;
			req.session.logged = true;
		}
		console.log(currentUser + 'this is currentUser')
		res.json({
			status: 200,
			data: 'login information is correct'
		})
	} catch (err) {
		next(err)
	}
});

// register
router.post('/register', async (req, res) => {
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
		console.log(user)
		req.session.logged = true;
		req.session.username = user.username;
		console.log(req.session)
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
		res.send(err);
	}
});

// 

module.exports = router;