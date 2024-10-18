import { errorHandler } from './middleware/error-handler';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import router from './router';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config({
	path: path.resolve(__dirname, '../.env'),
});

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	cors({
		origin: process.env.WHITELISTED_DOMAIN,
	}),
);

const port: number = Number(process.env.PORT) || 8000;

// Middleware to log each request
app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] - [${req.method}] - [${req.url}]`);
	next();
});

app.use('/api', router);

app.use('/api/uploads', express.static(path.join(__dirname, './public/images')));

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server started on port : [${port}]`);
});
