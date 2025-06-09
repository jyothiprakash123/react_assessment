import React, { useState, useEffect } from 'react';
import { dummyTasks, type Task } from './datas/dummyTasks';
import Board from './components/Board';
import CreateCardForm from './components/CreateCardForm';
import FilterBar, { type Filter } from './components/FilterBar';
import TaskModal from './components/TaskModal';

function App() {
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const filteredTasks = tasks.filter((task) => {
    if (filters.length === 0) return true;


    let result = true;
    for (const f of filters) {
      const match = (() => {
        if (f.field === 'Assignee') return task.assignee?.toLowerCase() === f.value.toLowerCase();
        if (f.field === 'Tag') return task.tags?.some(tag => tag.toLowerCase() === f.value.toLowerCase());
        if (f.field === 'Status') return task.status.toLowerCase() === f.value.toLowerCase();
        return false;
      })();

      if (f.operator === 'AND') result = result && match;
      else if (f.operator === 'OR') result = result || match;
      else if (f.operator === 'NOT') result = result && !match;
    }
    return result;
  });

  const addTask = (task: Task) => setTasks(prev => [...prev, task]);
  const deleteTask = (taskId: string) => setTasks(prev => prev.filter(t => t.id !== taskId));
  const moveTask = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev =>
      prev.map(task => (task.id === taskId ? { ...task, status: newStatus } : task))
    );
  };

  return (
    <div className="app-container">
      <h1>Kanban Board</h1>
      <FilterBar filters={filters} setFilters={setFilters} />
      <CreateCardForm addTask={addTask} />
      <Board tasks={filteredTasks} moveTask={moveTask} onTaskClick={setSelectedTask} />
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onDelete={() => {
            deleteTask(selectedTask.id);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
