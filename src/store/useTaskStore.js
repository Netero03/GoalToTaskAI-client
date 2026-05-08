import { create } from "zustand";

const useTaskStore = create((set) => ({
  tasks: [],
  selectedTaskId: null,
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),
  updateTask: (task) =>
    set((state) => ({
      tasks: state.tasks.map((item) => (item._id === task._id ? task : item))
    })),
  removeTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task._id !== taskId)
    })),
  setSelectedTaskId: (selectedTaskId) => set({ selectedTaskId })
}));

export default useTaskStore;
