import express from 'express';
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from './task.controller';
import { authenticateTokenMiddleware } from '../../middlewares/auth';

export const taskRoute = express.Router();

taskRoute.use(authenticateTokenMiddleware);

taskRoute.get('/', getTasks);
taskRoute.get('/:id', getTask);
taskRoute.post('/', createTask);
taskRoute.put('/:id', updateTask);
taskRoute.delete('/:id', deleteTask);
