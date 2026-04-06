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
    async createBoard (ownerId: string, title: string) {
      const trimmed = title.trim()
      if (!trimmed) throw new Error('EMPTY_TITLE')
      const base = apiBase()
      const res = await fetch(`${base}/boards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ title: trimmed, ownerId }),
      })
      if (!res.ok) throw new Error('CREATE_FAILED')
      const created = await res.json() as Board
      this.items.unshift(created)
      return created
    },
    async updateBoard (id: string, title: string) {
      const trimmed = title.trim()
      if (!trimmed) throw new Error('EMPTY_TITLE')
      const base = apiBase()
      const res = await fetch(`${base}/boards/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ title: trimmed }),
      })
      if (!res.ok) throw new Error('UPDATE_FAILED')
      const updated = await res.json() as Board
      const i = this.items.findIndex(b => b.id === id)
      if (i !== -1) this.items[i] = updated
      return updated
    },
    async deleteBoard (id: string) {
      const base = apiBase()
      const res = await fetch(`${base}/boards/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('DELETE_FAILED')
      this.items = this.items.filter(b => b.id !== id)
    },
    clear () {
      this.items = []
    },
  },
})
