import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    common: {
      loading: 'Loading…',
    },
    auth: {
      backHome: 'Back to home',
      fields: {
        username: 'Username',
        password: 'Password',
      },
      login: {
        title: 'Log in',
        subtitle: 'Enter your username and password to continue.',
        submit: 'Log in',
        goSignup: 'Need an account? Sign up',
      },
      signup: {
        title: 'Create an account',
        subtitle: 'Choose a username and password to get started.',
        submit: 'Sign up',
        goLogin: 'Already have an account? Log in',
      },
      errors: {
        required: 'Please enter a username and password.',
        usernameTaken: 'That username is already taken.',
        invalidCredentials: 'Incorrect username or password.',
        generic: 'Something went wrong. Try again.',
      },
      session: {
        signedInAs: 'Signed in as {name}',
      },
      logout: 'Log out',
    },
    boards: {
      title: 'Your boards',
      subtitle: 'Open a board to manage lists and tasks.',
      home: 'Home',
      empty: 'You do not have any boards yet. Create one soon from the board view.',
      cardHint: 'Board details and columns will appear here in a later step.',
    },
    welcome: {
      eyebrow: 'Projects, tasks, and boards',
      headline: 'Ship work with clarity',
      subhead:
        'Plan like Jira, move fast like Trello. Boards, lists, and teamwork in one place.',
      getStarted: 'Get started',
      viewBoards: 'View my boards',
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
