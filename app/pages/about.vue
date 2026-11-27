<script setup lang="ts">
useHead({ title: 'How it works · Nuxt on the Edge' })

const { deployEnv } = useRuntimeConfig().public

const hops = [
  { name: 'Visitor', detail: 'requests /about over HTTPS' },
  { name: 'CloudFront', detail: 'nearest edge location; serves from cache when it can' },
  { name: 'CloudFront Function', detail: 'redirects, and rewrites /about → /about/index.html' },
  { name: 'S3 bucket', detail: 'private; only this distribution may read it' },
]

const tryIt = [
  { path: '/about', expect: '200 · rewritten to /about/index.html' },
  { path: '/about/', expect: '200 · same page, trailing slash' },
  { path: '/this-page-does-not-exist', expect: '404 · the generated 404 page' },
]

const caching = [
  { what: 'HTML, payloads, robots.txt', header: 'max-age=0, must-revalidate', why: 'new deploys are visible immediately' },
  { what: '/_nuxt/* (hashed JS/CSS)', header: 'max-age=31536000, immutable', why: 'file names change when content does' },
]
</script>

<template>
  <main class="container page">
    <header class="intro fade-up">
      <h1>How a request reaches this page</h1>
      <p>
        You're on the <strong>{{ deployEnv }}</strong> build. Nothing here runs on a server: every page is a
        pre-rendered file, and the work happens at the edge.
      </p>
    </header>

    <section class="flow">
      <div v-for="(hop, i) in hops" :key="hop.name" class="hop card fade-up" :style="{ animationDelay: `${i * 0.08}s` }">
        <span class="step">{{ i + 1 }}</span>
        <div>
          <strong>{{ hop.name }}</strong>
          <p>{{ hop.detail }}</p>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Try it</h2>
      <p class="section-lead">Each link exercises a different part of the edge setup.</p>
      <div class="try">
        <a v-for="t in tryIt" :key="t.path" :href="t.path" class="card try-item">
          <code>{{ t.path }}</code>
          <span>{{ t.expect }}</span>
        </a>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Caching</h2>
      <p class="section-lead">Set by the deploy step as files are uploaded; CloudFront honours them.</p>
      <div class="table card">
        <div class="row head">
          <span>Files</span><span>Cache-Control</span><span>Why</span>
        </div>
        <div v-for="c in caching" :key="c.what" class="row">
          <span>{{ c.what }}</span>
          <code>{{ c.header }}</code>
          <span class="muted">{{ c.why }}</span>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.page { padding-top: 72px; }
.intro h1 {
  font-size: clamp(2rem, 5vw, 3.2rem);
  letter-spacing: -0.02em;
  margin: 0 0 12px;
}
.intro p { color: var(--muted); max-width: 640px; font-size: 1.05rem; }

.flow {
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.hop {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  position: relative;
}
.hop:not(:last-child)::after {
  content: '→';
  position: absolute;
  right: -13px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--accent);
  font-weight: 700;
}
.hop p { margin: 4px 0 0; color: var(--muted); font-size: 0.9rem; }
.step {
  flex: none;
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  font-size: 0.85rem;
  font-weight: 700;
  color: #04130b;
  background: var(--accent);
}

.try {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.try-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-decoration: none;
  transition: transform 0.15s ease, border-color 0.15s ease;
}
.try-item:hover {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--accent) 50%, transparent);
}
.try-item span { color: var(--muted); font-size: 0.9rem; }

.table { padding: 0; overflow: hidden; }
.row {
  display: grid;
  grid-template-columns: 1.1fr 1.3fr 1.2fr;
  gap: 16px;
  padding: 14px 20px;
  align-items: center;
}
.row + .row { border-top: 1px solid var(--border); }
.head { font-weight: 600; font-size: 0.85rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.04em; }
.muted { color: var(--muted); }

@media (max-width: 860px) {
  .flow, .try { grid-template-columns: 1fr; }
  .hop:not(:last-child)::after { content: '↓'; right: 50%; top: auto; bottom: -19px; transform: none; }
  .row { grid-template-columns: 1fr; gap: 4px; }
  .head { display: none; }
}
</style>
