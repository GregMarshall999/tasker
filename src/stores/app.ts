import { defineStore } from 'pinia'

export type WelcomeFeature = {
  icon: string
  titleKey: string
  descriptionKey: string
}

export const useAppStore = defineStore('app', {
  state: () => ({
    appName: 'Tasker',
    welcomeFeatures: [
      {
        icon: 'mdi-view-column-outline',
        titleKey: 'welcome.features.boards.title',
        descriptionKey: 'welcome.features.boards.description',
      },
      {
        icon: 'mdi-format-list-checks',
        titleKey: 'welcome.features.backlog.title',
        descriptionKey: 'welcome.features.backlog.description',
      },
      {
        icon: 'mdi-account-group-outline',
        titleKey: 'welcome.features.team.title',
        descriptionKey: 'welcome.features.team.description',
      },
    ] satisfies WelcomeFeature[],
  }),
  getters: {
    brandingTitle: (state) => state.appName,
  },
})
