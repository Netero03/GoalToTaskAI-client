import React, { useEffect, useState } from 'react';
import { X, Save } from 'lucide-react';

export default function TaskModal({ open, onClose, onSave, initial = {}, defaultStatus }) {
  const [title, setTitle] = useState(initial.title || '');
  const [description, setDescription] = useState(initial.description || '');
  const [estimatedHours, setEstimatedHours] = useState(initial.estimatedHours ?? 0);
  const [priority, setPriority] = useState(initial.priority || 'medium');
  const [status, setStatus] = useState(initial.status || defaultStatus || 'todo');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setTitle(initial.title || '');
    setDescription(initial.description || '');
    setEstimatedHours(initial.estimatedHours ?? 0);
    setPriority(initial.priority || 'medium');
    setStatus(initial.status || defaultStatus || 'todo');
  }, [open, initial, defaultStatus]);

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave({
        title: title.trim(),
        description: description.trim(),
        estimatedHours: Number(estimatedHours) || 0,
        priority,
        status
      });
      onClose();
    } catch {
      // onSave should throw or handle errors, modal will close only on success
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={() => onClose()} />
      <form onSubmit={handleSubmit} className="z-50 bg-white rounded-lg p-4 w-full max-w-md shadow">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">{initial._id ? 'Edit Task' : 'Create Task'}</h3>
          <button type="button" onClick={() => onClose()}><X /></button>
        </div>

        <div className="space-y-2">
          <input
            className="w-full p-2 border rounded"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              className="p-2 border rounded w-28"
              value={estimatedHours}
              onChange={(e) => setEstimatedHours(e.target.value)}
            />
            <select value={priority} onChange={(e)=>setPriority(e.target.value)} className="p-2 border rounded">
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select value={status} onChange={(e)=>setStatus(e.target.value)} className="p-2 border rounded">
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={() => onClose()} className="px-3 py-2 rounded border">Cancel</button>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded flex items-center gap-2">
            <Save size={16} />
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
