import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import asyncStorageAdapter from './asyncStorageAdapter'

interface UseStoreState  {
   session:object | null
   setSession: (newSession:object) => void 
   setRemoveSession: () => void
}

export const useStore = create<UseStoreState>()(
  persist(
    (set, get) => ({
      session: {},
      setSession: (newSession:any) => set({ session: newSession }),
      setRemoveSession:() => set({session:null})
    }),
    {
      name: 'values-storage',
      storage: asyncStorageAdapter,
    },
  ),
)

