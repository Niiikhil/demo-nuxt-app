<template>
  <header class="header">
    <div class="container bar">
      <NuxtLink to="/" class="brand">
        <img src="/favicon.svg" alt="" width="28" height="28">
        <span>Nuxt on the Edge</span>
      </NuxtLink>
      <nav class="nav">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/about">How it works</NuxtLink>
        <EnvBadge />
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(12px);
  background: color-mix(in srgb, var(--bg) 70%, transparent);
  border-bottom: 1px solid var(--border);
}
.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  gap: 16px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
}
.nav {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 0.95rem;
}
.nav a {
  color: var(--muted);
  text-decoration: none;
  transition: color 0.15s;
}
.nav a:hover,
.nav a.router-link-exact-active { color: var(--text); }

@media (max-width: 560px) {
  .brand span { display: none; }
  .nav { gap: 14px; }
}
</style>
