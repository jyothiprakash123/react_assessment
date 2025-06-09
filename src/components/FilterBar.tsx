import React, { useState } from 'react';

export type Filter = {
  field: 'Assignee' | 'Tag' | 'Status';
  operator: 'AND' | 'OR' | 'NOT';
  value: string;
};

const operators = ['AND', 'OR', 'NOT'] as const;
const filterFields = ['Assignee', 'Tag', 'Status'] as const;

interface Props {
  filters: Filter[];
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
}

const FilterBar: React.FC<Props> = ({ filters, setFilters }) => {
  const [newField, setNewField] = useState<Filter['field']>('Assignee');
  const [newOperator, setNewOperator] = useState<Filter['operator']>('AND');
  const [newValue, setNewValue] = useState('');

  const addFilter = () => {
    if (!newValue.trim()) return;
    setFilters([...filters, { field: newField, operator: newOperator, value: newValue.trim() }]);
    setNewValue('');
  };

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  return (
    <div style={{ marginBottom: 20, padding: 10, border: '1px solid #ccc', borderRadius: 6 }}>
      <h2>Filters</h2>

      <div style={{ marginBottom: 10 }}>
        {filters.length === 0 && <em>No filters added.</em>}
        {filters.map(({ field, operator, value }, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              backgroundColor: '#eee',
              borderRadius: 12,
              padding: '4px 10px',
              marginRight: 8,
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onClick={() => removeFilter(i)}
            title="Click to remove filter"
          >
            {field} {operator} {value} &times;
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <select value={newField} onChange={e => setNewField(e.target.value as Filter['field'])}>
          {filterFields.map(f => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>

        <select value={newOperator} onChange={e => setNewOperator(e.target.value as Filter['operator'])}>
          {operators.map(op => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Value"
          value={newValue}
          onChange={e => setNewValue(e.target.value)}
        />

        <button onClick={addFilter} disabled={!newValue.trim()}>
          Add
        </button>
      </div>

      <p style={{ marginTop: 8, fontStyle: 'italic', color: '#555' }}>
        Click filter chips to remove.<br />
        Example: Assignee is B OR Tag is backend
      </p>
    </div>
  );
};

export default FilterBar;
