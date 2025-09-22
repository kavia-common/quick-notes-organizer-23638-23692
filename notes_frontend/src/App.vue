<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <div class="brand">
        <div class="logo">✦</div>
        <div class="title">
          <h1>Quick Notes</h1>
          <p>Capture ideas. Stay organized.</p>
        </div>
      </div>
    </header>

    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
/* Ocean Professional Theme Tokens */
:root {
  --ocean-primary: #2563EB;
  --ocean-secondary: #F59E0B;
  --ocean-error: #EF4444;
  --ocean-bg: #f9fafb;
  --ocean-surface: #ffffff;
  --ocean-text: #111827;

  --radius-lg: 16px;
  --radius-md: 12px;
  --radius-sm: 8px;

  --shadow-sm: 0 1px 2px rgba(17, 24, 39, 0.06), 0 1px 1px rgba(17, 24, 39, 0.04);
  --shadow-md: 0 6px 18px rgba(37, 99, 235, 0.08), 0 2px 6px rgba(17, 24, 39, 0.06);
}

.app-shell {
  min-height: 100vh;
  background: linear-gradient(180deg, rgba(59,130,246,0.08), rgba(249,250,251,1) 22%, rgba(249,250,251,1));
  color: var(--ocean-text);
}

/* Header */
.app-header {
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: saturate(160%) blur(6px);
  background: linear-gradient(90deg, rgba(37, 99, 235, 0.10), rgba(255,255,255,0.7));
  border-bottom: 1px solid rgba(17, 24, 39, 0.06);
}

.brand {
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(37,99,235,0.95), rgba(59,130,246,0.75));
  color: white;
  display: grid;
  place-items: center;
  box-shadow: var(--shadow-md);
  font-size: 18px;
}

.title h1 {
  font-size: 18px;
  letter-spacing: 0.2px;
  color: var(--ocean-text);
  margin: 0;
}

.title p {
  margin: 0;
  font-size: 12px;
  color: rgba(17, 24, 39, 0.6);
}

/* Main */
.app-main {
  max-width: 1200px;
  margin: 18px auto;
  padding: 0 16px 28px;
}
</style>
