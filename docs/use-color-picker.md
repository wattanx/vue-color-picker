# useColorPicker

Provides the core logic for `Color Picker`.

## Usage

```vue{10-21}
<script setup lang="ts">
import {
  ColorPickerHue,
  ColorPickerHueCursor,
  ColorPickerSaturation,
  ColorPickerSaturationCursor,
  useColorPicker,
} from "@wattanx/vue-color-picker";

const {
  onMoveHue,
  onMoveSaturation,
  selfColor,
  saturationPosition,
  huePosition,
} = useColorPicker({
  initialColor: "#FFFFFF",
  width: 160,
  height: 160,
  direction: "vertical",
});
</script>
<template>
  <div class="container mt-4 flex flex-col p-4 space-y-4">
    <div class="flex flex-row">
      <div class="w-[160px]">
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
      </div>
      <ColorPickerHue class="color-picker-hue" @moveHue="onMoveHue">
        <ColorPickerHueCursor
          class="color-picker-hue_cursor"
          :hue="selfColor.hsv.h"
          :direction="'vertical'"
          :position="huePosition"
        ></ColorPickerHueCursor>
      </ColorPickerHue>
    </div>
  </div>
</template>
```

## Type Declarations

```ts
export type UseColorPicker = {
  /**
   * @default '#FFFFFF'
   */
  initialColor?: string;
  /**
   * @default 214
   */
  width?: number;
  /**
   * @default 150
   */
  height?: number;

  /**
   * Direction of hue bars.
   * @default 'horizontal'
   */
  direction?: "horizontal" | "vertical";
};

export declare const useColorPicker: ({
  initialColor,
  width,
  height,
  direction,
}: UseColorPicker) => {
  selfColor: vue_demi.Ref<{
    hex: string;
    hsv: {
      h: number;
      s: number;
      v: number;
    };
    rgb: {
      b: number;
      g: number;
      r: number;
    };
  }>;
  inputColor: vue_demi.Ref<string>;
  saturationPosition: vue_demi.ComputedRef<{
    x: number;
    y: number;
  }>;
  huePosition: vue_demi.ComputedRef<{
    x: number;
    y: number;
  }>;
  onSetHex: (e: MouseEvent) => void;
  onMoveSaturation: ({ x, y }: Position) => void;
  onMoveHue: ({ x, y }: Position) => void;
};
```
