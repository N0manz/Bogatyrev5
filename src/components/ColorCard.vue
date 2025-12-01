<template>
  <div class="card" :style="{ background: color.hex }">
    <div class="top">
      <button
        @click.stop="togglePin"
        class="pin"
        :title="pinned ? 'Открепить цвет' : 'Закрепить цвет'"
      >
        {{ pinned ? "📌" : "📍" }}
      </button>

      <button @click.stop="copyColor" class="copy" title="Скопировать цвет">
        ⧉
      </button>
    </div>
    <div class="val" @click="copyColor">
      {{ display }}
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { hexToRgbString } from "../utils/color-utils.js";

const props = defineProps({
  color: Object,
  format: String,
  pinned: Boolean,
});

const emit = defineEmits(["copy", "toggle-pin"]);

const display = computed(() =>
  props.format === "hex" ? props.color.hex.toUpperCase() : hexToRgbString(props.color.hex)
);

function togglePin() {
  emit("toggle-pin");
}

function copyColor() {
  emit("copy", props.color.hex);
}
</script>

<style scoped>
.card {
  width: 140px;
  min-height: 90px;
  padding: 10px;
  border-radius: 8px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}
.top {
  display: flex;
  justify-content: space-between;
}
.pin,
.copy {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  padding: 5px 8px;
  border-radius: 6px;
  color: white;
  font-size: 14px;
}
.val {
  font-family: monospace;
  font-weight: 700;
  cursor: pointer;
  margin-top: 8px;
}
</style>
