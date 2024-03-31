import proxy from 'express-http-proxy';

import express from 'express';

import cors from 'cors';

const corsOptions ={
	origin:'http://127.0.0.1:8080',
	credentials:true,
	optionSuccessStatus:200,
};
const app = express();

app.use(express.json())

app.use(cors(corsOptions)); 

app.use('/api', proxy('http://127.0.0.1:3000')); 

app.use('/client', proxy('http://127.0.0.1:8080')); 

app.listen(4000, () => {

});