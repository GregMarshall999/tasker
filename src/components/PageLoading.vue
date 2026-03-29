<template>
  <div class="page-loading d-flex flex-column align-center justify-center ga-4 pa-8">
    <v-progress-circular
      color="primary"
      indeterminate
      size="56"
      width="5"
      aria-hidden="true"
    />
    <p class="text-body-1 text-medium-emphasis mb-0">
      {{ t('common.loading') }}
    </p>
  </div>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>

<style scoped>
.page-loading {
  min-height: min(70vh, 32rem);
}
</style>
