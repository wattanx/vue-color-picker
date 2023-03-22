<script setup lang="ts">
import Example1 from "./Example1.vue";
import Example2 from "./Example2.vue";
</script>
<template>
  <div class="container mt-4 flex flex-col p-4 space-y-4">
    <p>Vue3 Playground</p>
    <Example1 />
    <Example2 />
  </div>
</template>
<style scoped>
.color-picker-saturation {
  width: 100%;
  position: relative;
  margin-top: 15px;
  height: 150px;
  background-image: linear-gradient(transparent, black),
    linear-gradient(to right, white, transparent);
  user-select: none;
}
.color-picker-saturation_cursor {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 15px #00000026;
  box-sizing: border-box;
  transform: translate(-10px, -10px);
}

.color-picker-hue {
  width: 12px;
  position: relative;
  margin-top: 15px;
  height: 160px;
  background-image: linear-gradient(
    to bottom,
    rgb(255, 0, 0),
    rgb(255, 255, 0),
    rgb(0, 255, 0),
    rgb(0, 255, 255),
    rgb(0, 0, 255),
    rgb(255, 0, 255),
    rgb(255, 0, 0)
  );
  user-select: none;
  border-radius: 12px;
}

.color-picker-hue_cursor {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  box-shadow: #0003 0 0 0 0.5px;
  box-sizing: border-box;
  transform: translate(-10px, -4px);
  left: 6px;
}
</style>
