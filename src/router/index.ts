/**
 * router/index.ts
 *
 * Automatic routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  if (to.path === '/boards') {
    const auth = useAuthStore()
    if (!auth.isAuthenticated || !auth.userId) {
      return { path: '/login', query: { redirect: to.fullPath } }
    }
  }
})

export default router
