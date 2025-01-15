import mongoose, { Model } from 'mongoose';
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

  async findAll(
    userId: string,
    filters: { priority?: string; completed?: boolean }
  ): Promise<Task[]> {
    try {
      const filterQuery: any = { userId: new mongoose.Types.ObjectId(userId) };

      if (filters.priority) {
        filterQuery.priority = filters.priority;
      }

      if (typeof filters.completed === 'boolean') {
        filterQuery.completed = filters.completed;
      }

      console.log(filterQuery, 'FILTER');

      const tasks = await this.taskModel
        .aggregate([
          { $match: filterQuery },
          {
            $addFields: {
              priorityValue: {
                $switch: {
                  branches: [
                    { case: { $eq: ['$priority', 'high'] }, then: 1 },
                    { case: { $eq: ['$priority', 'medium'] }, then: 2 },
                    { case: { $eq: ['$priority', 'low'] }, then: 3 },
                  ],
                  default: 4,
                },
              },
            },
          },
          { $sort: { priorityValue: 1, createdAt: 1 } },
          { $project: { priorityValue: 0 } },
        ])
        .exec();

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
