import { create } from 'zustand';

const useStore = create((set) => ({
  projects: [],
  setProjects: (projects) => set({ projects }),
  addProject: (p) => set((s) => ({ projects: [p, ...s.projects] })),
  updateProject: (p) => set((s) => ({ projects: s.projects.map(x => x._id === p._id ? p : x) })),
  removeProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p._id !== id)
    }))
}));

export default useStore;
