import { create } from "zustand";

const useGoalStore = create((set) => ({
  goals: [],
  setGoals: (goals) => set({ goals }),
  addGoal: (goal) => set((state) => ({ goals: [goal, ...state.goals] })),
  updateGoal: (goal) =>
    set((state) => ({
      goals: state.goals.map((item) => (item._id === goal._id ? goal : item))
    })),
  removeGoal: (goalId) =>
    set((state) => ({
      goals: state.goals.filter((goal) => goal._id !== goalId)
    }))
}));

export default useGoalStore;
