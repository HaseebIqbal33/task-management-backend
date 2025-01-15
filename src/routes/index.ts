import express from 'express';

import { userRoute } from '../modules/User/user.routes';
import { taskRoute } from '../modules/Task/task.route';
import { authRoute } from '../modules/Auth/auth.route';

export const router = express.Router();

router.use('/auth', authRoute);
router.use('/tasks', taskRoute);
router.use('/users', userRoute);
