<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const is404 = computed(() => props.error.statusCode === 404)

useHead({ title: is404.value ? 'Page not found' : 'Something went wrong' })
</script>

<template>
  <div class="app">
    <AppHeader />
    <main class="container wrap">
      <p class="code gradient-text">{{ error.statusCode }}</p>
      <h1>{{ is404 ? 'This page took a wrong turn at the edge.' : 'Something went wrong.' }}</h1>
      <p class="muted">
        <template v-if="is404">
          CloudFront asked S3 for it, S3 said it doesn't exist, and you got this pre-rendered 404 page instead.
        </template>
        <template v-else>{{ error.message }}</template>
      </p>
      <NuxtLink to="/" class="btn btn-primary" @click="clearError({ redirect: '/' })">Back to home</NuxtLink>
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.app { min-height: 100vh; display: flex; flex-direction: column; }
.wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 20px;
}
.code {
  font-size: clamp(5rem, 18vw, 9rem);
  font-weight: 800;
  line-height: 1;
  margin: 0;
}
h1 { margin: 12px 0; font-size: clamp(1.4rem, 4vw, 2rem); }
.muted { color: var(--muted); max-width: 520px; margin: 0 0 28px; }
</style>
