require('./db');
const express = require('express');
const server = express();
const cors = require('cors');





const bodyParser = require('body-parser');
const methodOverride = require('method-override');

server.use(express.static('public'));
server.use(methodOverride('_method'));
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
	optionsSuccessStatus: 200
}

server.use(cors(corsOptions));

const restaurantController = require('./controllers/restaurantController');
server.use('/api/v1/restaurantsga', restaurantController);


const PORT = 9000

server.listen(PORT, () => {
	const date = new Date(Date.now())
	const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' })
	console.log(date);
	console.log('Today is ' + dayOfWeek);
	console.log(`get to da choppa`)
	console.log(`da choppa is on port ${PORT}`)
})