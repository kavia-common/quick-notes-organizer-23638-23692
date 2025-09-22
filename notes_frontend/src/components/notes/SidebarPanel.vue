<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useNotesStore } from '@/stores/notes'
import { ref } from 'vue'

const store = useNotesStore()
const { filteredNotes, selectedId, query } = storeToRefs(store)

const localQuery = ref(query.value)

const onSearch = () => {
  store.setQuery(localQuery.value)
}

const selectNote = (id: string) => {
  store.select(id)
}

const createNote = () => {
  store.createNote()
}

const formatDate = (ts: number) => {
  const d = new Date(ts)
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const noteClasses = (id: string, favorite: boolean) => {
  return {
    'note-item': true,
    active: selectedId.value === id,
    favorite,
  }
}
</script>

<template>
  <div class="sidebar">
    <div class="controls">
      <div class="search">
        <input
          v-model="localQuery"
          class="search-input"
          placeholder="Search notes..."
          @input="onSearch"
        />
        <span class="search-icon">🔎</span>
      </div>
      <button class="add-btn" @click="createNote" title="New note">
        <span class="plus">＋</span>
        New
      </button>
    </div>

    <div class="list">
      <div
        v-for="n in filteredNotes"
        :key="n.id"
        :class="noteClasses(n.id, n.favorite)"
        @click="selectNote(n.id)"
      >
        <div class="row">
          <h4 class="title">{{ n.title || 'Untitled' }}</h4>
          <span class="star" :title="n.favorite ? 'Favorited' : 'Not favorite'">★</span>
        </div>
        <p class="preview">{{ n.content || 'No content yet...' }}</p>
        <div class="meta">
          <span>{{ formatDate(n.updatedAt) }}</span>
        </div>
      </div>

      <div v-if="filteredNotes.length === 0" class="empty">
        <p>No notes match your search.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.controls {
  padding: 12px;
  display: flex;
  gap: 10px;
  align-items: center;
  border-bottom: 1px solid rgba(17, 24, 39, 0.06);
  background: linear-gradient(180deg, rgba(37,99,235,0.04), rgba(255,255,255,0.9));
}

.search {
  position: relative;
  flex: 1;
}

.search-input {
  width: 100%;
  padding: 10px 36px 10px 12px;
  border-radius: var(--radius-md);
  border: 1px solid rgba(17, 24, 39, 0.08);
  outline: none;
  background: #fff;
  transition: box-shadow .2s ease, border-color .2s ease;
}

.search-input:focus {
  border-color: rgba(37, 99, 235, 0.5);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 9px;
  opacity: 0.6;
  pointer-events: none;
}

.add-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  border: 1px solid rgba(17, 24, 39, 0.08);
  background: linear-gradient(180deg, rgba(245,158,11,0.1), rgba(255,255,255,0.9));
  color: var(--ocean-text);
  cursor: pointer;
  transition: transform .08s ease, box-shadow .2s ease, background .2s ease;
}

.add-btn:hover {
  box-shadow: var(--shadow-sm);
  background: linear-gradient(180deg, rgba(245,158,11,0.18), rgba(255,255,255,1));
}

.add-btn:active {
  transform: translateY(1px);
}

.plus {
  color: var(--ocean-secondary);
  font-size: 18px;
}

/* List */
.list {
  padding: 8px;
  overflow: auto;
  height: 100%;
}

.note-item {
  border: 1px solid rgba(17, 24, 39, 0.06);
  background: #fff;
  border-radius: var(--radius-md);
  padding: 10px 12px;
  margin: 8px 0;
  cursor: pointer;
  transition: transform .08s ease, box-shadow .2s ease, border-color .15s ease, background .2s ease;
}

.note-item:hover {
  box-shadow: var(--shadow-sm);
  border-color: rgba(37, 99, 235, 0.22);
}

.note-item.active {
  border-color: rgba(37, 99, 235, 0.4);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  background: linear-gradient(180deg, rgba(59,130,246,0.06), #fff);
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.title {
  font-size: 14px;
  font-weight: 600;
  color: var(--ocean-text);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.star {
  color: #fbbf24; /* amber-400 */
  opacity: 0.0;
  transition: opacity .2s ease;
}

.note-item.favorite .star {
  opacity: 1;
}

.preview {
  margin: 6px 0 6px 0;
  font-size: 12px;
  color: rgba(17, 24, 39, 0.65);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

.meta {
  font-size: 11px;
  color: rgba(17, 24, 39, 0.5);
}

.empty {
  margin-top: 24px;
  text-align: center;
  color: rgba(17, 24, 39, 0.6);
}
</style>
