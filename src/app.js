import express from 'express';
import bodyParser from 'body-parser';

import { route } from './routes';
const app = express();
const port = 3001;

/**
 * Middleware setup
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Routes
 */
app.use(route);

/**
 * Start server
 */
app.listen(
	port,
	() => console.log(`App is listening on port ${port}`)
);
