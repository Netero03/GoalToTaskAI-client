import React, { useEffect, useState } from 'react';
import { listProjects } from '../services/goalService';
import useStore from '../store/useStore';
import { deleteProject as apiDeleteProject, fetchProject } from '../services/goalService';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import useConfirm from '../hooks/useConfirm.jsx';

export default function ProjectList({ onOpen }) {
  const [loading, setLoading] = useState(false);
  const { projects, setProjects, removeProject } = useStore();
  const { confirmDialog, ConfirmModal } = useConfirm();

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await listProjects();
        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleDelete(project) {
  const ok = await confirmDialog({
    title: "Delete Goal?",
    message: `Are you sure you want to delete "${project.title}"? This cannot be undone.`
  });

  if (!ok) return;

  try {
    await apiDeleteProject(project._id);
    removeProject(project._id);
    toast.success("Project deleted");
    onOpen && onOpen(null);
  } catch {
    toast.error("Failed to delete project");
  }
 }

async function openProject(p) {
  try {
    const full = await fetchProject(p._id);  
    onOpen(full);
  } catch (err) {
    console.error(err);
  }
}



  return (
    <div>
      <h3 className="font-medium mb-3">Your Goals</h3>
      <div className="space-y-2 max-h-64 overflow-auto">
        {loading && <div className="text-sm text-slate-500">Loading...</div>}
        {projects.length === 0 && !loading && <div className="text-sm text-slate-500">No goals yet</div>}
        {projects.map(p => (
          <div key={p._id} className="flex items-start justify-between p-3 border rounded hover:bg-slate-50 hover:cursor-pointer">
            <div className="flex-1 text-left" onClick={() => openProject(p)}>
              <div className="font-semibold">{p.title}</div>
              <div className="text-xs text-slate-500">{p.description}</div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-xs text-slate-400">{new Date(p.createdAt).toLocaleDateString()}</div>
              <button title="Delete project" onClick={() => handleDelete(p)} className="p-1 rounded bg-slate-200 hover:bg-red-50">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {ConfirmModal}
    </div>
  );
}
