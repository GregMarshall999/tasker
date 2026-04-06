import { defineStore } from 'pinia'

function apiBase () {
  return import.meta.env.VITE_API_BASE ?? '/api'
}

export interface Board {
  id: string
  title: string
  ownerId: string
}

export const useBoardsStore = defineStore('boards', {
  state: () => ({
    items: [] as Board[],
    loading: false,
  }),
  actions: {
    async fetchForOwner (ownerId: string) {
      this.loading = true
      try {
        const base = apiBase()
        const res = await fetch(
          `${base}/boards?ownerId=${encodeURIComponent(ownerId)}`,
          { headers: { Accept: 'application/json' } },
        )
        if (!res.ok) throw new Error('FETCH_FAILED')
        const rows = await res.json() as unknown
        this.items = Array.isArray(rows) ? (rows as Board[]) : []
      } finally {
        this.loading = false
      }
    },
    clear () {
      this.items = []
    },
  },
})
