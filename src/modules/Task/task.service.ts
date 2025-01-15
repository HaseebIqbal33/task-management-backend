import { Model } from 'mongoose';
import { Task } from './task.model';
import { CreateTaskDto, UpdateTaskDto } from './dto';

export class TaskService {
  constructor(private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const createdTask = new this.taskModel(createTaskDto);
      const savedTask = await createdTask.save();
      return savedTask;
    } catch (error) {
      throw error;
    }
  }

  async findAll(userId: string): Promise<Task[]> {
    try {
      const tasks = await this.taskModel.find().where({ userId }).exec();
      return tasks;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string, userId: string): Promise<Task | null> {
    try {
      const task = await this.taskModel.findById(id).where({ userId }).exec();
      return task;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    userId: string
  ): Promise<Task | null> {
    try {
      const updatedTask = await this.taskModel
        .findByIdAndUpdate(id, updateTaskDto, { new: true })
        .where({ userId })
        .exec();
      return updatedTask;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string, userId: string): Promise<Task | null> {
    try {
      const deletedTask = await this.taskModel
        .findByIdAndDelete(id)
        .where({ userId })
        .exec();
      return deletedTask;
    } catch (error) {
      throw error;
    }
  }
}
