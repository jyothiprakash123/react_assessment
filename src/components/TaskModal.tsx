import React from 'react';
import type { Task } from '../datas/dummyTasks';

interface Props {
  task: Task;
  onClose: () => void;
  onDelete: () => void;
}

const TaskModal: React.FC<Props> = ({ task, onClose, onDelete }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{ backgroundColor: 'white', padding: 20, borderRadius: 8, minWidth: 300 }}
        onClick={e => e.stopPropagation()}
      >
        <h2>{task.title}</h2>
        <p><strong>Assignee:</strong> {task.assignee || 'Unassigned'}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Tags:</strong> {task.tags?.join(', ') || 'None'}</p>
        <p><strong>Description:</strong> {task.description || 'No description'}</p>
        <button onClick={onDelete} style={{ marginRight: 10, backgroundColor: 'red', color: 'white' }}>
          Delete
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TaskModal;
