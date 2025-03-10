'use strict';

// Require modules

const express      = require('express');
const randomstring = require('randomstring');

// Create express instance

const app = express();

// Handle API requests

app.get('/', (req, res) => {

	let keys = [], number = parseInt(req.query.number);

	if (number != NaN && number > 0)
	{
		while (keys.length < number) {

			let rkey = randomstring.generate({ length : 17, charset : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' });
			let fkey = (rkey.substring(0, 6) + '-' + rkey.substring(6, 12) + '-' + rkey.substring(12));
	
			if (keys.indexOf(fkey) == -1) keys.push(fkey);
		}
	}
	
	res.status(200).send(keys.join("\r\n"));
});

// Handle not found error
app.use((req, res) => {
	res.status(404).send('Handler not found');
});

// Handle global error
app.use((err, req, res, next) => {
	console.log('Internal server error (' + err.status + '): ' + err.message);
	res.status(500).send('Internal server error');
});

// Start app
const server = app.listen(3000, (err) => {
	console.log('Server started on port ' + server.address().port + '.');
});
