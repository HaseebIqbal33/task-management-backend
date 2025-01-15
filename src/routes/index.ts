import express from 'express';

import { userRoute } from '../modules/User/user.routes';

export const router = express.Router();

router.use('/users', userRoute);
