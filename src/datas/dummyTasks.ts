export type Task = {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  assignee?: string;
  tags?: string[];
};

export const dummyTasks: Task[] = [
  { id: '1', title: 'Task One', status: 'todo', assignee: 'B', tags: ['frontend'] },
  { id: '2', title: 'Task Two', status: 'in-progress', assignee: 'A', tags: ['backend'] },
  { id: '3', title: 'Task Three', status: 'done', assignee: 'C', tags: ['backend', 'urgent'] },
];
