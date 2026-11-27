<template>
  <div class="wrap">
    <nav>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/about">About</NuxtLink>
    </nav>
    <NuxtPage />
  </div>
</template>

<style>
body { font-family: system-ui, sans-serif; margin: 0; }
.wrap { max-width: 40rem; margin: 3rem auto; padding: 0 1rem; }
nav { display: flex; gap: 1rem; margin-bottom: 2rem; }
</style>
