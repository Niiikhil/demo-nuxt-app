<script setup lang="ts">
const { commitSha, commitUrl, runUrl, repoUrl, builtAt } = useRuntimeConfig().public

const built = new Date(builtAt).toLocaleString('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'UTC',
})
</script>

<template>
  <footer class="footer">
    <div class="container row">
      <span>Static Nuxt · S3 · CloudFront · Terraform · GitHub Actions</span>
      <span class="meta">
        Built {{ built }} UTC
        <template v-if="commitSha">
          · commit <a :href="commitUrl" target="_blank" rel="noopener"><code>{{ commitSha }}</code></a>
        </template>
        <template v-if="runUrl">
          · <a :href="runUrl" target="_blank" rel="noopener">deploy run</a>
        </template>
        <template v-if="repoUrl">
          · <a :href="repoUrl" target="_blank" rel="noopener">source</a>
        </template>
      </span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  padding: 28px 0;
  color: var(--muted);
  font-size: 0.88rem;
}
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
}
.meta a { color: var(--text); }
</style>
