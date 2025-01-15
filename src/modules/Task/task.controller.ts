import { Request, Response } from 'express';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { sendResponse } from '../../utils/response';

const taskService = new TaskService(Task);

export const createTask = async (req: Request, res: Response) => {
  try {
    const result = await taskService.create(req.body);

    sendResponse(res, result, 'Task created successfully', 201, true);
  } catch (error: any) {
    console.error(error);
    sendResponse(res, null, error.message, error.status || 500, false);
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    const { priority, completed } = req.query;

    const filter = {
      priority: priority as string,
      completed:
        completed === 'true' ? true : completed === 'false' ? false : undefined,
    };

    const result = await taskService.findAll(userId, filter);
    sendResponse(res, result, 'Tasks fetched successfully', 200, true);
  } catch (error: any) {
    console.error(error);
    sendResponse(res, null, error.message, error.status || 500, false);
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    const result = await taskService.findOne(req.params.id, userId);
    sendResponse(res, result, 'Task fetched successfully', 200, true);
  } catch (error: any) {
    console.error(error);
    sendResponse(res, null, error.message, error.status || 500, false);
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    const result = await taskService.update(req.params.id, req.body, userId);
    sendResponse(res, result, 'Task updated successfully', 200, true);
  } catch (error: any) {
    console.error(error);
    sendResponse(res, null, error.message, error.status || 500, false);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    const result = await taskService.remove(req.params.id, userId);
    sendResponse(res, result, 'Task deleted successfully', 200, true);
  } catch (error: any) {
    console.error(error);
    sendResponse(res, null, error.message, error.status || 500, false);
  }
};
