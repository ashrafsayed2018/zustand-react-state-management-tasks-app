import { create } from 'zustand'
import { persist } from 'zustand/middleware'
const store = (set) => {
  return {
    tasks: [],
    draggedTask: null,
    addTask: (task) =>
      set((store) => ({ tasks: [...store.tasks, task] }), false, 'addTask'),
    removeTask: (id) =>
      set((store) => ({ tasks: store.tasks.filter((task) => task.id !== id) })),
    setDraggedTask: (title) => set({ draggedTask: title }),
    moveTask: (title, state) =>
      set((store) => ({
        tasks: store.tasks.map((task) =>
          task.title === title ? { title, state } : task
        ),
      })),
  }
}
export const tasksStore = create(persist(store, { name: 'store' }))
