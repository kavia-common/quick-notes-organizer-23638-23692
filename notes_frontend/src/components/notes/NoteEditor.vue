<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useNotesStore } from '@/stores/notes'
import { storeToRefs } from 'pinia'

const store = useNotesStore()
const { selectedNote } = storeToRefs(store)
const content = computed({
  get: () => selectedNote.value?.content ?? '',
  set: (v: string) => store.updateSelected({ content: v }),
})

// Autosize textarea height
const area = ref<HTMLTextAreaElement | null>(null)
const fit = () => {
  if (!area.value) return
  area.value.style.height = '0px'
  const h = area.value.scrollHeight + 2
  area.value.style.height = Math.max(240, h) + 'px'
}

onMounted(() => fit())
watch(content, () => {
  // Defer to next tick to ensure DOM has updated
  requestAnimationFrame(() => fit())
})
</script>

<template>
  <div class="editor" v-if="selectedNote">
    <textarea
      ref="area"
      class="content"
      v-model="content"
      placeholder="Start writing..."
    />
    <div class="footer">
      <span class="hint">Your notes are saved automatically</span>
    </div>
  </div>
  <div class="editor empty" v-else>
    <p>Select a note from the list or create a new one.</p>
  </div>
</template>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 14px 16px 10px 16px;
}

.content {
  width: 100%;
  min-height: 240px;
  resize: none;
  border-radius: var(--radius-md);
  border: 1px solid rgba(17, 24, 39, 0.08);
  padding: 14px;
  outline: none;
  background: #fff;
  box-shadow: inset 0 1px 2px rgba(17, 24, 39, 0.03);
  transition: box-shadow .2s ease, border-color .2s ease, background .2s ease;
  line-height: 1.6;
  font-size: 14px;
  color: var(--ocean-text);
}

.content:focus {
  border-color: rgba(37, 99, 235, 0.5);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
  background: linear-gradient(180deg, rgba(59,130,246,0.03), #fff);
}

.footer {
  display: flex;
  justify-content: flex-end;
  padding: 10px 4px 2px;
  color: rgba(17, 24, 39, 0.55);
  font-size: 12px;
}

.editor.empty {
  align-items: center;
  justify-content: center;
  color: rgba(17, 24, 39, 0.7);
}
</style>
