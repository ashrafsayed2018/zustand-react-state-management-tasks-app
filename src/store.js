import { create } from 'zustand'

const store = (set) => {
  return {
    tasks: [{ id: 1, title: 'test task 1 in ongoing', state: 'DONE' }],
    addTask: (task) => set((store) => ({ tasks: [...store.tasks, task] })),
    removeTask: (id) =>
      set((store) => ({ tasks: store.tasks.filter((task) => task.id !== id) })),
  }
}
export const tasksStore = create(store)
