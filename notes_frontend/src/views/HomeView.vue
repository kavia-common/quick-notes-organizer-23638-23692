<script setup lang="ts">
import SidebarPanel from '@/components/notes/SidebarPanel.vue'
import NoteToolbar from '@/components/notes/NoteToolbar.vue'
import NoteEditor from '@/components/notes/NoteEditor.vue'
</script>

<template>
  <div class="home-grid">
    <aside class="home-sidebar">
      <SidebarPanel />
    </aside>
    <section class="home-content">
      <NoteToolbar />
      <NoteEditor />
    </section>
  </div>
</template>

<style scoped>
.home-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 16px;
  min-height: calc(100vh - 140px);
}

.home-sidebar {
  background: var(--ocean-surface);
  border: 1px solid rgba(17, 24, 39, 0.06);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  min-height: 520px;
}

.home-content {
  background: var(--ocean-surface);
  border: 1px solid rgba(17, 24, 39, 0.06);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  min-height: 520px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Responsive */
@media (max-width: 980px) {
  .home-grid {
    grid-template-columns: 1fr;
  }
}
</style>
