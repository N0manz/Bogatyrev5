<template>
  <div class="app" :class="{ dark: isDark }">
    <header class="header">
      <h1>Palette Studio</h1>

      <label class="toggle">
        <input type="checkbox" v-model="isDark" />
        <span>Тёмный фон</span>
      </label>

    </header>

    <PaletteGenerator />

    <transition name="fade">
      <div v-if="notification.visible" class="notification">
        {{ notification.message }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { reactive, ref, provide } from "vue";
import PaletteGenerator from "./components/PaletteGenerator.vue";

const isDark = ref(false);

const notification = reactive({
  visible: false,
  message: ""
});

function notify(msg, ms = 1300) {
  notification.message = msg;
  notification.visible = true;
  setTimeout(() => (notification.visible = false), ms);
}

provide("notify", notify);
provide("notification", notification);

// --- Экспорт JSON ---
import { inject } from "vue";
import { getCurrentInstance } from "vue";

function exportJson() {
  // доступ к компоненту PaletteGenerator
  const instance = getCurrentInstance();
  const paletteComp = instance.appContext.components.PaletteGenerator;
  // Вариант: используем event, но проще экспортировать прямо palette через глобальный ref
  const paletteEl = document.querySelector(".colors");
  if (!paletteEl) {
    notify("Нет палитры для экспорта");
    return;
  }
  const colors = [...paletteEl.querySelectorAll(".val")].map((el) => el.textContent);
  const jsonStr = JSON.stringify(colors, null, 2);

  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "palette.json";
  link.click();
  URL.revokeObjectURL(url);

  notify("Палитра экспортирована!");
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: #f5f7fb;
  color: #0f172a;
  padding: 20px;
}
.app.dark {
  background: #0b1220;
  color: #eef2ff;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.btn-export {
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background-color: #1f6feb;
  color: white;
}
.notification {
  position: fixed;
  right: 20px;
  bottom: 20px;
  padding: 10px 18px;
  background: black;
  color: white;
  border-radius: 6px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
