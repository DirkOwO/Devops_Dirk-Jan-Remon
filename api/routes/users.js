var express = require('express');
var router = express.Router();

const { db } = require('../services/database');

/* GET users listing. */
router.get('/', async function(req, res, next) {
	res.json(await db.collection('users').find().toArray());
});

router.post('/', async function(req, res, next){
	await db.collection('users').insertOne(req.body)
		.then(user => res.status(201).json({ 'id': user.insertedId }))
		.catch(err => res.status(500).json(err));
});

module.exports = router;
