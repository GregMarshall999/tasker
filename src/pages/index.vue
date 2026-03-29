<template>
  <div class="welcome-bg">
    <v-container class="py-10 py-md-16" fluid>
      <v-row justify="center">
        <v-col cols="12" md="10" lg="9" xl="8">
          <section class="text-center mb-12 mb-md-16">
            <v-chip
              class="mb-6"
              color="primary"
              prepend-icon="mdi-checkbox-marked-circle-outline"
              size="small"
              variant="tonal"
            >
              {{ t('welcome.eyebrow') }}
            </v-chip>

            <h1 class="text-h3 text-md-h2 font-weight-bold mb-4 text-high-emphasis">
              {{ appStore.brandingTitle }}
            </h1>

            <p class="text-h6 text-medium-emphasis font-weight-regular mb-2">
              {{ t('welcome.headline') }}
            </p>

            <p class="text-body-1 text-medium-emphasis mx-auto mb-10" style="max-width: 40rem">
              {{ t('welcome.subhead') }}
            </p>

            <div class="d-flex flex-column flex-sm-row ga-3 justify-center align-center">
              <v-btn
                color="primary"
                size="large"
                rounded="lg"
                min-width="180"
                @click="scrollToFeatures"
              >
                {{ t('welcome.getStarted') }}
              </v-btn>
              <v-btn
                variant="text"
                size="large"
                rounded="lg"
                @click="scrollToFeatures"
              >
                {{ t('welcome.scrollToFeatures') }}
                <v-icon end>mdi-chevron-down</v-icon>
              </v-btn>
            </div>
          </section>

          <section id="features">
            <div class="text-center mb-8">
              <h2 class="text-h5 font-weight-bold mb-2">
                {{ t('welcome.featuresTitle') }}
              </h2>
              <p class="text-body-2 text-medium-emphasis">
                {{ t('welcome.featuresSubtitle') }}
              </p>
            </div>

            <v-row>
              <v-col
                v-for="(item, index) in appStore.welcomeFeatures"
                :key="index"
                cols="12"
                md="4"
              >
                <v-card
                  class="h-100 pa-2"
                  rounded="xl"
                  variant="tonal"
                  color="surface-variant"
                >
                  <v-card-item>
                    <template #prepend>
                      <v-avatar color="primary" variant="tonal" size="48">
                        <v-icon :icon="item.icon" size="28" />
                      </v-avatar>
                    </template>
                    <v-card-title class="text-wrap text-h6">
                      {{ t(item.titleKey) }}
                    </v-card-title>
                    <v-card-text class="text-body-2 text-medium-emphasis">
                      {{ t(item.descriptionKey) }}
                    </v-card-text>
                  </v-card-item>
                </v-card>
              </v-col>
            </v-row>
          </section>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
  import { useAppStore } from '@/stores/app'
  import { useI18n } from 'vue-i18n'

  const appStore = useAppStore()
  const { t } = useI18n()

  function scrollToFeatures () {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
</script>

<style scoped>
.welcome-bg {
  min-height: 100%;
  background: linear-gradient(
    180deg,
    rgb(var(--v-theme-surface)) 0%,
    rgb(var(--v-theme-surface-variant) / 0.35) 45%,
    rgb(var(--v-theme-surface)) 100%
  );
}
</style>
