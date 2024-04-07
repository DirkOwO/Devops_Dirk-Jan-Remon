var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const cors = require('cors');
require('dotenv').config()

var promBundle = require('express-prom-bundle')
const metricsMiddleware = promBundle({
	includePath: true,
	includeStatusCode: true,
	normalizePath: true,
	promClient: {
		collectDefaultMetrics: {}
	}
})

const corsOptions ={
	origin:'http://127.0.0.1:8080',
	credentials:true,
	optionSuccessStatus:200,
};
const cluster = require('cluster');
const os = require('os');
const numCPUs = os.cpus().length;

if (require.main === module && cluster.isMaster) {
	console.log(`Master process ${process.pid} is running`);

	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		console.log(`Worker process ${worker.process.pid} died. Restarting...`);
		cluster.fork();
	});
} else {
	const app = express();
	app.use(cors(corsOptions)); 
	app.use(logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));

	app.use(metricsMiddleware)

	app.use('/', indexRouter);
	app.use('/users', usersRouter);
	app.use(function(req, res, next) {
		next(createError(404));
	});
	app.use(function(err, req, res, next) {

		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};

		res.status(err.status || 500);
		
	});

	const server = app.listen(process.env.PORT, () => {
		console.log(`Express server is listening on port ${process.env.PORT}`);
	});

	if (require.main !== module)
		module.exports = {app,server};
}