// The deploy workflow builds with ENVIRONMENT and GitHub's run variables set,
// so these values describe the exact build that is live.
const sha = process.env.GITHUB_SHA ?? ''
const repo = process.env.GITHUB_REPOSITORY ?? ''
const runId = process.env.GITHUB_RUN_ID ?? ''

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  devtools: { enabled: false },
  css: ['~/assets/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Nuxt on the Edge',
      meta: [
        { name: 'description', content: 'A static Nuxt site on S3 + CloudFront, deployed by GitHub Actions and Terraform.' },
        { name: 'theme-color', content: '#0b0f1a' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  nitro: {
    prerender: {
      // The "How it works" page links here on purpose to show the 404 page.
      ignore: ['/this-page-does-not-exist'],
    },
  },

  runtimeConfig: {
    public: {
      deployEnv: process.env.ENVIRONMENT || 'local',
      commitSha: sha.slice(0, 7),
      commitUrl: sha && repo ? `https://github.com/${repo}/commit/${sha}` : '',
      runUrl: runId && repo ? `https://github.com/${repo}/actions/runs/${runId}` : '',
      repoUrl: repo ? `https://github.com/${repo}` : '',
      builtAt: new Date().toISOString(),
    },
  },
})
