import React, { useState } from 'react';
import type { Task } from '../datas/dummyTasks';

interface Props {
  addTask: (task: Task) => void;
}

const CreateCardForm: React.FC<Props> = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [assignee, setAssignee] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState<Task['status']>('todo');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({
      id: Date.now().toString(),
      title: title.trim(),
      assignee: assignee.trim() || undefined,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      status,
    });
    setTitle('');
    setAssignee('');
    setTags('');
  };

  return (
    <form onSubmit={onSubmit} style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        style={{ marginRight: 8 }}
      />
      <input
        type="text"
        placeholder="Assignee"
        value={assignee}
        onChange={e => setAssignee(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={e => setTags(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <select value={status} onChange={e => setStatus(e.target.value as Task['status'])} style={{ marginRight: 8 }}>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default CreateCardForm;
