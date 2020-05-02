import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES...
const till = require('./routes/till.route');

app.get('/', (req, res) => {
	res.status(200).json({
		status: 200,
		message: 'Hello World',
	});
});

app.use('/till', till);


const PORT = 1234;
const server = app.listen(PORT, () => {
	console.log(`server started on port: ${1234}`);
});


module.exports = server;

// chai, chai-http, mocha
