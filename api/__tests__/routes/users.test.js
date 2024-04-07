const request = require('supertest');
var express = require('express');
var usersRouter = require('../../routes/users');
const { db, client } = require('../../services/database'); 

const app = express();
app.use('/users', usersRouter);
const server = app.listen(5000, () => {
	console.log(`Express server is listening on port 5000`);
});

describe('Get Users', () => {
	beforeEach(async () => {
		await db.collection('users').deleteMany({});
	});

	afterAll(async() => {
		server.close();
		await client.close();
	});

	it('should get all users in array', async () => {
		const expected = { 'foo': 'bar' };
		await db.collection('users').insertOne(expected);
		delete expected._id;

		const res = await request(app).get('/users');
		expect(res.statusCode).toEqual(200);
		expect(res.body.length).toEqual(1);
		expect(res.body[0]).toEqual(expect.objectContaining(expected));
	});

});