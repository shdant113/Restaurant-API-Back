require('./db');
const express = require('express');
const server = express();
const cors = require('cors');
const env = require('dotenv').config();
const bcrypt = require('bcryptjs');
const session = require('express-session');

const bodyParser = require('body-parser');
const methodOverride = require('method-override');

server.use(session({
	secret: process.env.secret,
	resave: false,
	saveUnitialized: false,
	cookie: { 
		secure: false,
		maxAge: 1000*60*60*24*30 // 30 days
	}
}))
server.use(express.static('public'));
server.use(methodOverride('_method'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

const corsOptions = {
	origin: 'https://le-restauranteur.herokuapp.com/' || 'http://localhost:3000',
	credentials: true,
	optionsSuccessStatus: 200
}

server.use(cors(corsOptions));

const restaurantController = require('./controllers/restaurantController');
const authController = require('./controllers/authController');
server.use('/api/v1/restaurantsga', restaurantController);
server.use('/api/v1/auth', authController);

const PORT = process.env.PORT || 9000

server.listen(PORT, () => {
	const date = new Date(Date.now())
	const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' })
	console.log(date);
	console.log('Today is ' + dayOfWeek);
	console.log(`get to da choppa`)
	console.log(`da choppa is on port ${PORT}`)
})