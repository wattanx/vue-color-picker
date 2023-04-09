# ColorPickerHueCursor

This is a Hue Cursor Component that implements only minimal styling.

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

## Props

<!-- prettier-ignore -->
| Name | Type | Description |
| --- | --- | --- | 
| hue <Badge type="info" text="required" /> | `number` |  Hue value. |
| direction <Badge type="info" text="required" /> | `'horizontal' \| 'vertical'`| Direction of the cursor. |
| position <Badge type="info" text="required" /> | `{ x: number; y: number }` | Position of the cursor. |
