import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set, get) => ({
      session: null,
      setSession: (newSession:any) => set({ session: newSession }),
      setRemoveSession:() => set({session:""})
    }),
    {
      name: 'values-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

