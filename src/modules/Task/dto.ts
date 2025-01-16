export interface CreateTaskDto {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {
  completed?: boolean;
}

export interface TaskQuery extends Record<string, unknown> {
  userId: string;
  priority: string;
  completed: string;
  pageSize: string;
  currentPage: string;
}
