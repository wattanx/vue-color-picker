<script setup lang="ts">
import { ColorPickerCanvas, useColorPicker } from "@wattanx/vue-color-picker";

const { onMoveHue, onMoveSaturation, selfColor, saturationPosition } =
  useColorPicker({
    initialColor: "#FFFFFF",
  });
</script>
<template>
  <div class="container mt-4 flex flex-col p-4 space-y-4">
    <p>Vue3 Playground</p>
    <div class="flex space-x-2">
      <label for="hex">Hex</label>
      <input
        :value="selfColor.hex"
        class="border-gray-300 border-[1px]"
        id="hex"
        type="text"
      />
    </div>
    <div class="w-[214px]">
      <ColorPickerCanvas
        class="color-picker-saturation"
        :style="{ backgroundColor: `hsl(${selfColor.hsv.h}, 100%, 50%)` }"
        @changePosition="onMoveSaturation"
        ><div
          class="color-picker-saturation_cursor"
          :style="{
            backgroundColor: selfColor.hex,
            left: `${saturationPosition.x}px`,
            top: `${saturationPosition.y}px`,
          }"
        ></div>
      </ColorPickerCanvas>
    </div>
    <div
      class="w-[214px] border-[1px] border-gray-300 h-5"
      :style="{ backgroundColor: selfColor.hex }"
    ></div>
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
</style>
