var express = require('express');
var router = express.Router();
const amqp = require('amqplib');

var channel = null;

async function createChannel(){
	const connection = await amqp.connect(process.env.MESSAGE_QUEUE);
	channel = await connection.createChannel();
	await channel.assertQueue('logs', {durable: true});
}

/* GET home page. */
router.get('/', async function(req, res, next) {
	const message = { text: 'hi there !'};

	channel.sendToQueue('logs', Buffer.from(JSON.stringify(message)), {
		contentType: 'application/json',
		persistent: true
	});

	res.json({succes : true});
});

router.get('/data', function(req, res, next) {
	res.send(JSON.stringify('test2'));
});

createChannel();

module.exports = router;
