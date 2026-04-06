import { defineStore } from 'pinia'

function apiBase () {
  return import.meta.env.VITE_API_BASE ?? '/api'
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    username: null as string | null,
    userId: null as string | null,
  }),
  actions: {
    setSession (username: string, userId: string) {
      this.isAuthenticated = true
      this.username = username
      this.userId = userId
    },
    logout () {
      this.isAuthenticated = false
      this.username = null
      this.userId = null
    },
    /**
     * Creates a user via JSON Server. Passwords are stored in plain text for local dev only.
     */
    async signup (username: string, password: string) {
      const base = apiBase()
      const dup = await fetch(`${base}/users?username=${encodeURIComponent(username)}`)
      if (dup.ok) {
        const rows = await dup.json() as unknown[]
        if (Array.isArray(rows) && rows.length > 0) throw new Error('USERNAME_TAKEN')
      }
      const res = await fetch(`${base}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) throw new Error('SIGNUP_FAILED')
      const created = await res.json() as { id: string }
      this.setSession(username, String(created.id))
    },
    /**
     * Looks up credentials via JSON Server query (local dev only; not for production).
     */
    async login (username: string, password: string) {
      const base = apiBase()
      const q = new URLSearchParams({ username, password })
      const res = await fetch(`${base}/users?${q}`, { headers: { Accept: 'application/json' } })
      if (!res.ok) throw new Error('LOGIN_FAILED')
      const rows = await res.json() as { id: string; username: string }[]
      if (!Array.isArray(rows) || rows.length === 0) throw new Error('INVALID_CREDENTIALS')
      const row = rows[0]
      this.setSession(row.username, String(row.id))
    },
  },
})
