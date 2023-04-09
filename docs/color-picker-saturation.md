# ColorPickerSaturation

This is a Saturation Component that implements only minimal styling.

```vue
<script setup lang="ts">
import {
  ColorPickerSaturation,
  ColorPickerSaturationCursor,
  useColorPicker,
} from "@wattanx/vue-color-picker";

const { onMoveSaturation, selfColor, saturationPosition } = useColorPicker({
  initialColor: "#FFFFFF",
  width: 160,
  height: 160,
});
</script>
<template>
  <ColorPickerSaturation
    class="color-picker-saturation"
    @moveSaturation="onMoveSaturation"
    :hue="selfColor.hsv.h"
    ><ColorPickerSaturationCursor
      class="color-picker-saturation_cursor"
      :saturationPosition="saturationPosition"
      :hex="selfColor.hex"
    ></ColorPickerSaturationCursor>
  </ColorPickerSaturation>
</template>
```

## Props

<!-- prettier-ignore -->
| Name | Type | Description |
| --- | --- | --- |
| hue <Badge type="info" text="required" /> | `number` |  Hue value. |
