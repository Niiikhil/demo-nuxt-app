<template>
  <div class="app">
    <div class="glow" aria-hidden="true" />
    <AppHeader />
    <NuxtPage />
    <AppFooter />
  </div>
</template>

<style scoped>
.app {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}
.app > :deep(main) { flex: 1; }

/* Soft animated glow behind the hero. */
.glow {
  position: absolute;
  inset: -200px -200px auto;
  height: 700px;
  background:
    radial-gradient(40% 50% at 30% 30%, rgba(0, 220, 130, 0.22), transparent 70%),
    radial-gradient(35% 45% at 75% 20%, rgba(139, 92, 246, 0.20), transparent 70%),
    radial-gradient(30% 40% at 55% 60%, rgba(54, 228, 218, 0.14), transparent 70%);
  filter: blur(20px);
  pointer-events: none;
  z-index: -1;
  animation: drift 18s ease-in-out infinite alternate;
}
@keyframes drift {
  to { transform: translate3d(40px, 30px, 0) scale(1.08); }
}
</style>
