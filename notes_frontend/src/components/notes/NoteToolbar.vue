<script setup lang="ts">
import { computed } from 'vue'
import { useNotesStore } from '@/stores/notes'
import { storeToRefs } from 'pinia'

const store = useNotesStore()
const { selectedNote } = storeToRefs(store)

const title = computed({
  get: () => selectedNote.value?.title ?? '',
  set: (v: string) => store.updateSelected({ title: v }),
})

const onToggleFavorite = () => {
  store.toggleFavorite()
}

const onDelete = () => {
  if (!selectedNote.value) return
  const ok = confirm('Delete this note? This cannot be undone.')
  if (ok) store.deleteSelected()
}
</script>

<template>
  <div class="toolbar" v-if="selectedNote">
    <input
      class="title-input"
      v-model="title"
      placeholder="Note title..."
    />
    <div class="actions">
      <button class="btn ghost" :title="selectedNote.favorite ? 'Unfavorite' : 'Favorite'" @click="onToggleFavorite">
        <span :class="['star', { active: selectedNote.favorite }]">★</span>
      </button>
      <button class="btn danger" title="Delete note" @click="onDelete">Delete</button>
    </div>
  </div>
  <div v-else class="toolbar empty">
    <p>Select or create a note to get started.</p>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-bottom: 1px solid rgba(17, 24, 39, 0.06);
  background: linear-gradient(180deg, rgba(37,99,235,0.04), rgba(255,255,255,0.9));
}

.title-input {
  flex: 1;
  border-radius: var(--radius-md);
  border: 1px solid rgba(17, 24, 39, 0.08);
  padding: 10px 12px;
  outline: none;
  background: #fff;
  transition: box-shadow .2s ease, border-color .2s ease;
  font-weight: 600;
  color: var(--ocean-text);
}

.title-input:focus {
  border-color: rgba(37, 99, 235, 0.5);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
}

.actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 9px 12px;
  border-radius: var(--radius-md);
  border: 1px solid rgba(17, 24, 39, 0.08);
  background: #fff;
  color: var(--ocean-text);
  cursor: pointer;
  transition: transform .08s ease, box-shadow .2s ease, background .2s ease;
}

.btn:hover {
  box-shadow: var(--shadow-sm);
  background: linear-gradient(180deg, rgba(59,130,246,0.06), #fff);
}

.btn:active {
  transform: translateY(1px);
}

.btn.ghost {
  background: linear-gradient(180deg, rgba(245,158,11,0.1), rgba(255,255,255,1));
}

.btn.danger {
  color: #fff;
  background: linear-gradient(180deg, #ef4444, #dc2626);
  border: 1px solid #dc2626;
}

.btn.danger:hover {
  box-shadow: 0 6px 18px rgba(239,68,68,0.22);
}

.star {
  color: #d1d5db;
  font-size: 18px;
}

.star.active {
  color: #f59e0b;
}

.toolbar.empty {
  justify-content: center;
}
</style>
