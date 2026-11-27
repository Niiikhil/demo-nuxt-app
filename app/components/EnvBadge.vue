<script setup lang="ts">
const { deployEnv } = useRuntimeConfig().public

const colors: Record<string, string> = {
  production: '#00dc82',
  staging: '#f59e0b',
  dev: '#38bdf8',
}
const color = colors[deployEnv] ?? '#9ca3af'
</script>

<template>
  <span class="badge" :style="{ '--c': color }" :title="`Built for the ${deployEnv} environment`">
    <span class="dot" />
    {{ deployEnv }}
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--c);
  background: color-mix(in srgb, var(--c) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--c) 35%, transparent);
}
.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--c);
  box-shadow: 0 0 0 0 var(--c);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--c) 60%, transparent); }
  70% { box-shadow: 0 0 0 7px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
}
</style>
