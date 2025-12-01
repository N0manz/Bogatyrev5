import { ref, reactive, computed } from 'vue'
import { randHex, hexToRgbString, generateHarmony } from '../utils/color'

export function usePaletteStore() {
  const count = ref(5)
  const format = ref('HEX')
  const darkMode = ref(false)

  const colors = reactive([])
  const locks = reactive([])

  const toast = reactive({ show: false, text: '' })

  const savedPalettes = ref([])

  function ensureLength(arr, len, fillFn) {
    while (arr.length < len) arr.push(fillFn())
    while (arr.length > len) arr.pop()
  }

  function randomize() {
    const base = randHex()
    const newColors = generateHarmony(base, count.value)

    ensureLength(colors, count.value, () => ({ hex: randHex() }))
    ensureLength(locks, count.value, () => false)

    for (let i = 0; i < count.value; i++) {
      if (locks[i]) continue
      colors[i] = { hex: newColors[i] }
    }
  }

  function copyColor(c) {
    const text = format.value === 'HEX' ? c.hex : hexToRgbString(c.hex)
    navigator.clipboard.writeText(text)
  }

  function toggleLock(idx) {
    locks[idx] = !locks[idx]
  }

  function updateColor(idx, h) {
    if (!h.startsWith('#')) h = '#' + h
    colors[idx].hex = h
  }

  function savePalette() {
    const list = JSON.parse(localStorage.getItem('saved') || '[]')
    const entry = { id: Date.now(), colors: colors.map(c => c.hex) }
    list.unshift(entry)
    localStorage.setItem('saved', JSON.stringify(list))
    loadSavedList()
  }

  function loadSavedList() {
    savedPalettes.value = JSON.parse(localStorage.getItem('saved') || '[]')
  }

  function loadSaved(idx) {
    const p = savedPalettes.value[idx]
    if (!p) return
    count.value = p.colors.length
    ensureLength(colors, count.value, () => ({ hex: randHex() }))
    ensureLength(locks, count.value, () => false)
    for (let i = 0; i < count.value; i++) colors[i].hex = p.colors[i]
  }

  function deleteSaved(idx) {
    savedPalettes.value.splice(idx, 1)
    localStorage.setItem('saved', JSON.stringify(savedPalettes.value))
  }

  const visibleColors = computed(() => {
    ensureLength(colors, count.value, () => ({ hex: randHex() }))
    ensureLength(locks, count.value, () => false)
    return colors.slice(0, count.value)
  })

  return {
    count, format, darkMode,
    colors, locks,
    toast, savedPalettes,
    visibleColors,
    randomize, copyColor, toggleLock, updateColor,
    savePalette, loadSaved, deleteSaved, loadSavedList,
    hexToRgbString
  }
}
