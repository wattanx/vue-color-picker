# Color Picker Hue

This is a Hue Component that implements only minimal styling.

::: info
This component is just a wrapper for `ColorPickerCanvas`.
You don't have to use it.
:::

## Usage

```vue
<script setup lang="ts">
import {
  ColorPickerHue,
  ColorPickerHueCursor,
  useColorPicker,
} from "@wattanx/vue-color-picker";

const { onMoveHue, selfColor, huePosition } = useColorPicker({
  initialColor: "#FFFFFF",
  width: 160,
  height: 160,
});
</script>
<template>
  <ColorPickerHue class="color-picker-hue" @moveHue="onMoveHue">
    <ColorPickerHueCursor
      class="color-picker-hue-cursor"
      :hue="selfColor.hsv.h"
      :direction="'vertical'"
      :position="huePosition"
    ></ColorPickerHueCursor>
  </ColorPickerHue>
</template>
```
