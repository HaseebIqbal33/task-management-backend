import express from 'express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cors, { CorsOptions } from 'cors';
import compression from 'compression';
import { router } from './routes';
import httpStatus from 'http-status';
import ApiError from './utils/ApiError';
import { errorConverter, errorHandler } from './middlewares/error';
const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
const corsOptions: CorsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// v1 api routes
app.use('/api/v1', router);

// send back a 404 error for any unknown api request
app.use((req: any, res: any, next: (arg0: any) => void) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
