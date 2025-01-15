export interface CreateTaskDto {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {
  completed?: boolean;
}
