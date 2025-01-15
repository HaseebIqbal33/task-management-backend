import { Schema } from 'mongoose';

const mongoose = require('mongoose');

export interface Task extends Document {
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  userId: string;
  createdAt: Date;
}

const taskSchema = new Schema<Task>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Task = mongoose.model('Task', taskSchema);
