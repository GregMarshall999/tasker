<template>
  <div class="boards-bg">
    <v-container class="py-8 py-md-12" fluid>
      <v-row justify="center">
        <v-col cols="12" md="10" lg="8">
          <div class="d-flex flex-column flex-sm-row align-sm-center justify-space-between ga-4 mb-8">
            <div>
              <h1 class="text-h4 font-weight-bold text-high-emphasis mb-1">
                {{ t('boards.title') }}
              </h1>
              <p class="text-body-2 text-medium-emphasis mb-0">
                {{ t('boards.subtitle') }}
              </p>
            </div>
            <div class="d-flex flex-wrap ga-2">
              <v-btn
                color="primary"
                prepend-icon="mdi-view-dashboard-outline"
                rounded="lg"
                variant="tonal"
                :to="{ path: '/' }"
              >
                {{ t('boards.home') }}
              </v-btn>
              <v-btn
                color="surface-variant"
                prepend-icon="mdi-logout"
                rounded="lg"
                variant="tonal"
                @click="logout"
              >
                {{ t('auth.logout') }}
              </v-btn>
            </div>
          </div>

          <v-alert
            class="mb-6 text-start"
            density="comfortable"
            rounded="lg"
            type="info"
            variant="tonal"
          >
            {{ t('auth.session.signedInAs', { name: auth.username ?? '' }) }}
          </v-alert>

          <v-skeleton-loader
            v-if="boards.loading"
            class="rounded-xl"
            type="card"
          />

          <template v-else>
            <v-alert
              v-if="boards.items.length === 0"
              rounded="lg"
              type="info"
              variant="tonal"
            >
              {{ t('boards.empty') }}
            </v-alert>

            <v-row v-else>
              <v-col
                v-for="b in boards.items"
                :key="b.id"
                cols="12"
                sm="6"
              >
                <v-card
                  class="h-100"
                  rounded="xl"
                  variant="tonal"
                  color="surface-variant"
                >
                  <v-card-item>
                    <template #prepend>
                      <v-avatar color="primary" variant="tonal" size="44">
                        <v-icon icon="mdi-view-column-outline" size="24" />
                      </v-avatar>
                    </template>
                    <v-card-title class="text-wrap text-h6">
                      {{ b.title }}
                    </v-card-title>
                    <v-card-subtitle class="text-caption">
                      {{ t('boards.cardHint') }}
                    </v-card-subtitle>
                  </v-card-item>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
  import { useAuthStore } from '@/stores/auth'
  import { useBoardsStore } from '@/stores/boards'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'

  const { t } = useI18n()
  const auth = useAuthStore()
  const boards = useBoardsStore()
  const router = useRouter()

  if (auth.userId) {
    await boards.fetchForOwner(auth.userId)
  }

  async function logout () {
    boards.clear()
    auth.logout()
    await router.push('/')
  }
</script>

<style scoped>
.boards-bg {
  min-height: 100%;
  background: linear-gradient(
    180deg,
    rgb(var(--v-theme-surface)) 0%,
    rgb(var(--v-theme-surface-variant) / 0.35) 45%,
    rgb(var(--v-theme-surface)) 100%
  );
}
</style>
