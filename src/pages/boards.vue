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
            <p
              v-if="boards.items.length === 0"
              class="text-body-2 text-medium-emphasis mb-4"
            >
              {{ t('boards.empty') }}
            </p>

            <v-row>
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
                    <template #append>
                      <div class="d-flex align-center">
                        <v-btn
                          :aria-label="t('boards.ariaEditBoard')"
                          icon="mdi-pencil"
                          rounded="lg"
                          size="small"
                          variant="text"
                          @click.stop="openEditBoard(b)"
                        />
                        <v-btn
                          :aria-label="t('boards.ariaDeleteBoard')"
                          color="error"
                          icon="mdi-close"
                          rounded="lg"
                          size="small"
                          variant="text"
                          @click.stop="openDeleteBoard(b)"
                        />
                      </div>
                    </template>
                  </v-card-item>
                </v-card>
              </v-col>

              <v-col
                cols="12"
                sm="6"
              >
                <v-card
                  v-if="!createOpen"
                  class="create-board-tile h-100 d-flex align-center justify-center cursor-pointer"
                  rounded="xl"
                  variant="outlined"
                  @click="openCreate"
                >
                  <v-card-item class="py-10 w-100">
                    <div class="d-flex flex-column align-center text-center ga-2">
                      <v-avatar color="primary" variant="tonal" size="48">
                        <v-icon icon="mdi-plus" size="28" />
                      </v-avatar>
                      <span class="text-subtitle-1 font-weight-medium text-high-emphasis">
                        {{ t('boards.createCard') }}
                      </span>
                    </div>
                  </v-card-item>
                </v-card>

                <v-card
                  v-else
                  class="h-100"
                  rounded="xl"
                  variant="tonal"
                  color="surface-variant"
                >
                  <v-card-text>
                    <v-alert
                      v-if="createError"
                      class="mb-3"
                      density="compact"
                      type="error"
                      variant="tonal"
                    >
                      {{ t('boards.createError') }}
                    </v-alert>
                    <v-form @submit.prevent="submitCreate">
                      <v-text-field
                        ref="titleFieldRef"
                        v-model="newTitle"
                        autofocus
                        class="mb-3"
                        density="comfortable"
                        :disabled="createSaving"
                        hide-details="auto"
                        :label="t('boards.titleLabel')"
                        variant="outlined"
                        @keydown.escape="cancelCreate"
                      />
                      <div class="d-flex flex-wrap ga-2">
                        <v-btn
                          color="primary"
                          :loading="createSaving"
                          rounded="lg"
                          type="submit"
                          variant="flat"
                        >
                          {{ t('boards.createSubmit') }}
                        </v-btn>
                        <v-btn
                          rounded="lg"
                          variant="text"
                          :disabled="createSaving"
                          @click="cancelCreate"
                        >
                          {{ t('boards.createCancel') }}
                        </v-btn>
                      </div>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog
      v-model="editDialog"
      max-width="28rem"
      scroll-strategy="close"
    >
      <v-card rounded="xl">
        <v-card-title class="text-h6">
          {{ t('boards.editBoard') }}
        </v-card-title>
        <v-card-text>
          <v-alert
            v-if="editError"
            class="mb-3"
            density="compact"
            type="error"
            variant="tonal"
          >
            {{ t('boards.editError') }}
          </v-alert>
          <v-form @submit.prevent="submitEditBoard">
            <v-text-field
              ref="editFieldRef"
              v-model="editTitle"
              autofocus
              density="comfortable"
              :disabled="editSaving"
              hide-details="auto"
              :label="t('boards.titleLabel')"
              variant="outlined"
              @keydown.enter.prevent="submitEditBoard"
              @keydown.escape="closeEditBoard"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-spacer />
          <v-btn
            rounded="lg"
            variant="text"
            :disabled="editSaving"
            @click="closeEditBoard"
          >
            {{ t('boards.createCancel') }}
          </v-btn>
          <v-btn
            color="primary"
            :loading="editSaving"
            rounded="lg"
            variant="flat"
            @click="submitEditBoard"
          >
            {{ t('boards.editSave') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="deleteDialog"
      max-width="24rem"
      scroll-strategy="close"
    >
      <v-card rounded="xl">
        <v-card-title class="text-h6">
          {{ t('boards.deleteBoard') }}
        </v-card-title>
        <v-card-text class="text-body-2">
          <v-alert
            v-if="deleteError"
            class="mb-3"
            density="compact"
            type="error"
            variant="tonal"
          >
            {{ t('boards.deleteError') }}
          </v-alert>
          {{ t('boards.deleteConfirm') }}
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-spacer />
          <v-btn
            rounded="lg"
            variant="text"
            :disabled="deleteSaving"
            @click="closeDeleteBoard"
          >
            {{ t('boards.createCancel') }}
          </v-btn>
          <v-btn
            color="error"
            :loading="deleteSaving"
            rounded="lg"
            variant="flat"
            @click="confirmDeleteBoard"
          >
            {{ t('boards.deleteSubmit') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
  import { useAuthStore } from '@/stores/auth'
  import { useBoardsStore } from '@/stores/boards'
  import { useI18n } from 'vue-i18n'
  import { nextTick, ref } from 'vue'
  import { useRouter } from 'vue-router'

  const { t } = useI18n()
  const auth = useAuthStore()
  const boards = useBoardsStore()
  const router = useRouter()

  const createOpen = ref(false)
  const newTitle = ref('')
  const createSaving = ref(false)
  const createError = ref(false)
  const titleFieldRef = ref<{ $el?: HTMLElement } | null>(null)

  const editDialog = ref(false)
  const editBoardId = ref<string | null>(null)
  const editTitle = ref('')
  const editSaving = ref(false)
  const editError = ref(false)
  const editFieldRef = ref<{ $el?: HTMLElement } | null>(null)

  const deleteDialog = ref(false)
  const deleteBoardId = ref<string | null>(null)
  const deleteSaving = ref(false)
  const deleteError = ref(false)

  if (auth.userId) {
    await boards.fetchForOwner(auth.userId)
  }

  async function openCreate () {
    createOpen.value = true
    createError.value = false
    await nextTick()
    titleFieldRef.value?.$el?.querySelector?.('input')?.focus?.()
  }

  function cancelCreate () {
    createOpen.value = false
    newTitle.value = ''
    createError.value = false
  }

  async function openEditBoard (b: { id: string; title: string }) {
    editBoardId.value = b.id
    editTitle.value = b.title
    editError.value = false
    editDialog.value = true
    await nextTick()
    editFieldRef.value?.$el?.querySelector?.('input')?.focus?.()
  }

  function closeEditBoard () {
    editDialog.value = false
    editBoardId.value = null
    editTitle.value = ''
    editError.value = false
  }

  async function submitEditBoard () {
    const id = editBoardId.value
    const title = editTitle.value.trim()
    if (!id || !title) return
    editSaving.value = true
    editError.value = false
    try {
      await boards.updateBoard(id, title)
      closeEditBoard()
    } catch {
      editError.value = true
    } finally {
      editSaving.value = false
    }
  }

  function openDeleteBoard (b: { id: string }) {
    deleteBoardId.value = b.id
    deleteError.value = false
    deleteDialog.value = true
  }

  function closeDeleteBoard () {
    deleteDialog.value = false
    deleteBoardId.value = null
    deleteError.value = false
  }

  async function confirmDeleteBoard () {
    const id = deleteBoardId.value
    if (!id) return
    deleteSaving.value = true
    deleteError.value = false
    try {
      await boards.deleteBoard(id)
      closeDeleteBoard()
    } catch {
      deleteError.value = true
    } finally {
      deleteSaving.value = false
    }
  }

  async function submitCreate () {
    const title = newTitle.value.trim()
    if (!title || !auth.userId) return
    createSaving.value = true
    createError.value = false
    try {
      await boards.createBoard(auth.userId, title)
      cancelCreate()
    } catch {
      createError.value = true
    } finally {
      createSaving.value = false
    }
  }

  async function logout () {
    boards.clear()
    auth.logout()
    await router.push('/')
  }
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.create-board-tile {
  border-style: dashed;
  min-height: 8.5rem;
}

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
