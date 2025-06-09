export type Tag = 'frontend' | 'backend' | 'design';
export type Assignee = 'A' | 'B' | 'C';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  createdAt: string;
  createdBy: string;
  assignee: Assignee;
  tags: Tag[];
  estimation: '1 point' | '2 points' | '3 points';
  status: 'Open' | 'In Progress' | 'Done';
}
