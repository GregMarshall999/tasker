<template>
  <v-container class="fill-height py-10" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="6" lg="4">
        <v-card rounded="xl" variant="elevated" class="pa-2">
          <v-card-title class="text-h5 pb-2">
            {{ t('auth.login.title') }}
          </v-card-title>
          <v-card-subtitle class="text-wrap pb-4">
            {{ t('auth.login.subtitle') }}
          </v-card-subtitle>

          <v-card-text>
            <v-alert
              v-if="errorKey"
              class="mb-4"
              density="compact"
              type="error"
              variant="tonal"
            >
              {{ t(errorKey) }}
            </v-alert>

            <v-form @submit.prevent="submit">
              <v-text-field
                v-model="username"
                autocomplete="username"
                class="mb-2"
                :disabled="loading"
                :label="t('auth.fields.username')"
                required
                variant="outlined"
              />
              <v-text-field
                v-model="password"
                autocomplete="current-password"
                class="mb-4"
                :disabled="loading"
                :label="t('auth.fields.password')"
                type="password"
                required
                variant="outlined"
              />
              <v-btn
                block
                color="primary"
                :loading="loading"
                rounded="lg"
                size="large"
                type="submit"
              >
                {{ t('auth.login.submit') }}
              </v-btn>
            </v-form>
          </v-card-text>

          <v-card-actions class="px-4 pb-4 pt-0">
            <v-btn
              block
              variant="text"
              :to="{ path: '/signup' }"
            >
              {{ t('auth.login.goSignup') }}
            </v-btn>
            <v-btn
              block
              variant="text"
              :to="{ path: '/' }"
            >
              {{ t('auth.backHome') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { useAuthStore } from '@/stores/auth'
  import { useI18n } from 'vue-i18n'
  import { ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const { t } = useI18n()
  const route = useRoute()
  const router = useRouter()
  const auth = useAuthStore()

  const username = ref('')
  const password = ref('')
  const loading = ref(false)
  const errorKey = ref<string | null>(null)

  async function submit () {
    errorKey.value = null
    const u = username.value.trim()
    const p = password.value
    if (!u || !p) {
      errorKey.value = 'auth.errors.required'
      return
    }
    loading.value = true
    try {
      await auth.login(u, p)
      const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : ''
      await router.push(redirect || '/boards')
    } catch (e) {
      const code = e instanceof Error ? e.message : ''
      if (code === 'INVALID_CREDENTIALS') errorKey.value = 'auth.errors.invalidCredentials'
      else errorKey.value = 'auth.errors.generic'
    } finally {
      loading.value = false
    }
  }
</script>
