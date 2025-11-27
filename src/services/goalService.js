import api from './api';

export async function generateTasksFromGoal(goal) {
  const res = await api.post('/goals/generate', { goal: goal.trim() });
  return res.data.data; // matches backend: { title, description, tasks, ... }
}

export async function createProjectFromAI(payload) {
  const res = await api.post('/projects/from-ai', payload);
  return res.data.project;
}

export async function listProjects() {
  const res = await api.get('/projects');
  return res.data.projects;
}

export async function fetchProject(projectId) {
  const res = await api.get(`/projects/${projectId}`);
  return res.data.project;
}

export async function deleteProject(projectId) {
  const res = await api.delete(`/projects/${projectId}`);
  return res.data;
}

export async function createTask(body) {
  const res = await api.post('/tasks', body);
  return res.data.task;
}

export async function updateTask(taskId, body) {
  const res = await api.put(`/tasks/${taskId}`, body);
  return res.data.task;
}

export async function deleteTask(taskId) {
  const res = await api.delete(`/tasks/${taskId}`);
  return res.data;
}

export async function bulkReorder(payload) {
  const res = await api.put('/tasks/reorder', payload);
  return res.data;
}
