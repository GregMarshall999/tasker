<template>
  <v-app>
    <v-main>
      <router-view v-slot="{ Component }">
        <Suspense>
          <component
            :is="Component"
            v-if="Component"
          />
          <template #fallback>
            <page-loading />
          </template>
        </Suspense>
      </router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import PageLoading from '@/components/PageLoading.vue'
</script>
