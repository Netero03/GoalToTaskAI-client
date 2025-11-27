import React, { useState } from 'react';
import { generateTasksFromGoal, createProjectFromAI } from '../services/goalService';
import { toast } from 'sonner';
import useStore from '../store/useStore';

export default function GoalForm({ onGenerated }) {
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const { addProject } = useStore();

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if (goal.trim().length < 10) { toast.error('Goal needs at least 10 characters'); return; }
    setLoading(true);
    try {
      const ai = await generateTasksFromGoal(goal);
      // ai should be { title, description, tasks, totalEstimatedHours, ... }
      // Ask backend to create project and tasks atomically
      const projectPayload = {
        title: ai.title || goal.slice(0, 80),
        description: ai.description || '',
        estimatedTotalHours: ai.totalEstimatedHours || undefined,
        visibility: 'private',
        tasks: ai.tasks.map(t => ({
          title: t.title,
          description: t.description || '',
          estimatedHours: t.estimatedHours || 0,
          priority: t.priority || 'medium'
        }))
      };
      const created = await createProjectFromAI(projectPayload);
      toast.success('Project created from AI');
      addProject(created);
      onGenerated(created);
      setGoal('');
    } catch (err) {
      console.error(err);
      toast.error(err?.message || 'Failed to generate tasks');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <span className="px-2 py-1 bg-slate-100 rounded-md">Gemini 2.5</span>
        <span>Powered by Google</span>
      </div>

      <textarea
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Describe your project goal. Example: Build a React + Node.js Kanban app with AI task generation..."
        className="w-full p-3 border rounded-lg min-h-[120px] focus:outline-none focus:ring-2 focus:ring-indigo-200"
        disabled={loading}
      />

      <div className="flex justify-between items-center text-sm text-slate-500">
        <div>{goal.length} / 1000</div>
        <button
          type="submit"
          disabled={loading || goal.trim().length < 10}
          className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Project Tasks'}
        </button>
      </div>
    </form>
  );
}
