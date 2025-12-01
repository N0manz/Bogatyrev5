<template>
  <div class="mock">
    <button :style="{ background: palette[0]?.hex }" class="btn">
      Кнопка
    </button>

    <div class="card" :style="{ background: palette[1]?.hex }">
      Карточка
    </div>

    <h2 :style="{ color: palette[2]?.hex }">Заголовок</h2>
  </div>
</template>

<script setup>
defineProps({ palette: Array });
</script>

<style scoped>
.mock {
  border: 1px dashed #aaa;
  padding: 12px;
  border-radius: 8px;
}
.card {
  padding: 14px;
  border-radius: 8px;
  margin-top: 10px;
  color: white;
}
.btn {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  color: white;
}
</style>
