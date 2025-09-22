import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

/**
 * PUBLIC_INTERFACE
 * useNotesStore - Pinia store for managing notes with localStorage persistence.
 * Notes have id, title, content, timestamps, and favorite flag.
 * Provides CRUD operations and selection handling.
 */
export const useNotesStore = defineStore('notes', () => {
  // Types
  type Note = {
    id: string
    title: string
    content: string
    createdAt: number
    updatedAt: number
    favorite: boolean
  }

  const STORAGE_KEY = 'notes_app_v1'

  // State
  const notes = ref<Note[]>([])
  const selectedId = ref<string | null>(null)
  const query = ref('')

  // Load from localStorage
  const load = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as { notes: Note[]; selectedId: string | null }
        notes.value = parsed.notes || []
        selectedId.value = parsed.selectedId || (notes.value[0]?.id ?? null)
      }
    } catch {
      // ignore parse errors, start fresh
      notes.value = []
      selectedId.value = null
    }
  }

  // Persist to localStorage
  const persist = () => {
    const payload = JSON.stringify({ notes: notes.value, selectedId: selectedId.value })
    localStorage.setItem(STORAGE_KEY, payload)
  }

  // Initialize on first use
  load()

  // Watchers to persist changes
  watch([notes, selectedId], persist, { deep: true })

  // Getters
  const selectedNote = computed<Note | null>(() => {
    return notes.value.find((n) => n.id === selectedId.value) || null
  })

  const filteredNotes = computed<Note[]>(() => {
    const q = query.value.trim().toLowerCase()
    let list = [...notes.value]
    if (q) {
      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q)
      )
    }
    // Favorites on top, then by updatedAt desc
    list.sort((a, b) => {
      if (a.favorite !== b.favorite) return a.favorite ? -1 : 1
      return b.updatedAt - a.updatedAt
    })
    return list
  })

  // Helpers
  const generateId = () =>
    Math.random().toString(36).slice(2) + Date.now().toString(36)

  // Actions

  /**
   * PUBLIC_INTERFACE
   * createNote - Create a new note with optional title/content.
   */
  const createNote = (title = 'Untitled', content = '') => {
    const now = Date.now()
    const note: Note = {
      id: generateId(),
      title,
      content,
      createdAt: now,
      updatedAt: now,
      favorite: false,
    }
    notes.value.unshift(note)
    selectedId.value = note.id
  }

  /**
   * PUBLIC_INTERFACE
   * updateSelected - Update the currently selected note's title/content.
   */
  const updateSelected = (payload: Partial<Pick<Note, 'title' | 'content'>>) => {
    if (!selectedId.value) return
    const idx = notes.value.findIndex((n) => n.id === selectedId.value)
    if (idx === -1) return
    const updated = {
      ...notes.value[idx],
      ...payload,
      updatedAt: Date.now(),
    }
    notes.value[idx] = updated
  }

  /**
   * PUBLIC_INTERFACE
   * toggleFavorite - Toggle favorite flag on a note by id (defaults to selected).
   */
  const toggleFavorite = (id?: string) => {
    const targetId = id ?? selectedId.value
    if (!targetId) return
    const idx = notes.value.findIndex((n) => n.id === targetId)
    if (idx === -1) return
    notes.value[idx] = {
      ...notes.value[idx],
      favorite: !notes.value[idx].favorite,
      updatedAt: Date.now(),
    }
  }

  /**
   * PUBLIC_INTERFACE
   * deleteSelected - Delete the selected note and select a sensible neighbor.
   */
  const deleteSelected = () => {
    if (!selectedId.value) return
    const idx = notes.value.findIndex((n) => n.id === selectedId.value)
    if (idx === -1) return
    notes.value.splice(idx, 1)
    // Select next item if exists, else previous, else null
    selectedId.value =
      notes.value[idx]?.id || notes.value[idx - 1]?.id || notes.value[0]?.id || null
  }

  /**
   * PUBLIC_INTERFACE
   * select - Select a note by id.
   */
  const select = (id: string) => {
    selectedId.value = id
  }

  /**
   * PUBLIC_INTERFACE
   * setQuery - Set the current search/filter query.
   */
  const setQuery = (q: string) => {
    query.value = q
  }

  // Seed with a welcome note if empty
  if (notes.value.length === 0) {
    createNote('Welcome to Quick Notes', 'Start typing your thoughts here...')
  }

  return {
    notes,
    selectedId,
    selectedNote,
    filteredNotes,
    query,
    createNote,
    updateSelected,
    toggleFavorite,
    deleteSelected,
    select,
    setQuery,
  }
})
