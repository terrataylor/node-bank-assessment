'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cors2.default)());

// ROUTES...
var students = require('./routes/students.route');

app.get('/', function (req, res) {
	res.status(200).json({
		status: 200,
		message: 'Hello World'
	});
});

app.use('/students', students);

var PORT = 1234;
var server = app.listen(PORT, function () {
	console.log('server started on port: ' + 1234);
});

module.exports = server;

// chai, chai-http, mocha