import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    common: {
      loading: 'Loading…',
    },
    welcome: {
      eyebrow: 'Projects, tasks, and boards',
      headline: 'Ship work with clarity',
      subhead:
        'Plan like Jira, move fast like Trello. Boards, lists, and teamwork in one place.',
      getStarted: 'Get started',
      scrollToFeatures: "See what's inside",
      featuresTitle: 'Built for how teams work',
      featuresSubtitle:
        'Start from this welcome screen; boards and JSON Server sync will plug in next.',
      features: {
        boards: {
          title: 'Boards & columns',
          description: 'Visualize status from backlog to done with drag-ready columns.',
        },
        backlog: {
          title: 'Lists & priorities',
          description: 'Order work, capture details, and keep scope visible to everyone.',
        },
        team: {
          title: 'Collaboration',
          description: 'Assign owners, comment, and stay aligned as work moves forward.',
        },
      },
    },
  }
}

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})
