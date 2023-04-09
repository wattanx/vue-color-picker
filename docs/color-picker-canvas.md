# ColorPickerCanvas

The original component of `hue` and `saturation`.

## Usage

### Saturation

```vue
<script setup lang="ts">
import {
  ColorPickerCanvas
  useColorPicker,
} from "@wattanx/vue-color-picker";

const { onMoveSaturation, selfColor, saturationPosition } = useColorPicker({
  initialColor: "#FFFFFF",
  width: 160,
  height: 160,
});
</script>
<template>
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
</template>
```

### Hue

```vue
<script setup lang="ts">
import {
  ColorPickerCanvas
  useColorPicker,
} from "@wattanx/vue-color-picker";

const { onMoveHue, selfColor, huePosition } = useColorPicker({
  initialColor: "#FFFFFF",
  width: 160,
  height: 160,
});
</script>
<template>
  <ColorPickerCanvas class="color-picker-hue" @changePosition="onMoveHue">
    <div
      class="color-picker-hue_cursor"
      :style="{
        backgroundColor: `hsl(${selfColor.hsv.h}, 100%, 50%)`,
        left: `${huePosition.x}px`,
      }"
    ></div>
  </ColorPickerCanvas>
</template>
```
