import React from 'react';
import type { Task } from '../datas/dummyTasks';

interface BoardProps {
  tasks: Task[];
  moveTask: (taskId: string, newStatus: Task['status']) => void;
  onTaskClick: (task: Task) => void;
}

const statuses: Task['status'][] = ['todo', 'in-progress', 'done'];

const Board: React.FC<BoardProps> = ({ tasks, moveTask, onTaskClick }) => {
  const onDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const onDrop = (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    moveTask(id, status);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div style={{ display: 'flex', gap: 20, justifyContent: 'center', padding: 20 }}>
      {statuses.map(status => (
        <div
          key={status}
          onDrop={(e) => onDrop(e, status)}
          onDragOver={onDragOver}
          style={{
            flex: 1,
            minHeight: 400,
            backgroundColor: '#f0f0f0',
            padding: 10,
            borderRadius: 8,
          }}
        >
          <h3 style={{ textTransform: 'capitalize' }}>{status.replace('-', ' ')}</h3>
          {tasks.filter(task => task.status === status).map(task => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => onDragStart(e, task.id)}
              onClick={() => onTaskClick(task)}
              style={{
                backgroundColor: 'white',
                marginBottom: 8,
                padding: 10,
                borderRadius: 6,
                boxShadow: '0 0 3px rgba(0,0,0,0.2)',
                cursor: 'pointer',
              }}
              title="Click to view details"
            >
              <strong>{task.title}</strong><br />
              <small>Assignee: {task.assignee || 'Unassigned'}</small>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
