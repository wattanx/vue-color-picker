import { ref, computed } from "vue-demi";
import { Position } from "../types/position";
import { transformColor } from "../utils";

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

export const useColorPicker = ({
  initialColor = "#FFFFFF",
  width = 214,
  height = 150,
  direction = "horizontal",
}: UseColorPicker) => {
  const selfColor = ref(transformColor("hex", initialColor));
  const inputColor = ref(initialColor);

  const saturationPosition = computed(() => ({
    x: (selfColor.value.hsv.s / 100) * width,
    y: ((100 - selfColor.value.hsv.v) / 100) * height,
  }));

  const huePosition = computed(() => {
    return {
      x: (selfColor.value.hsv.h / 360) * width,
      y: (selfColor.value.hsv.h / 360) * height,
    };
  });

  const onSetHex = (e: MouseEvent) => {
    const hex = (e.currentTarget as HTMLInputElement).value;

    inputColor.value = hex;
    if (/^#[0-9A-Fa-f]{6}$/i.test(hex)) {
      const newColor = transformColor("hex", hex);
      selfColor.value = newColor;
    }
  };

  const onMoveSaturation = ({ x, y }: Position) => {
    const newHsv = {
      ...selfColor.value.hsv,
      s: (x / width) * 100,
      v: 100 - (y / height) * 100,
    };
    const newColor = transformColor("hsv", newHsv);
    selfColor.value = newColor;
    inputColor.value = newColor.hex;
  };

  const onMoveHue = ({ x, y }: Position) => {
    const dir = direction === "horizontal" ? width : height;
    const position = direction === "horizontal" ? x : y;
    const newHsv = { ...selfColor.value.hsv, h: (position / dir) * 360 };
    const newColor = transformColor("hsv", newHsv);

    selfColor.value = newColor;
    inputColor.value = newColor.hex;
  };

  return {
    selfColor,
    inputColor,
    saturationPosition,
    huePosition,
    onSetHex,
    onMoveSaturation,
    onMoveHue,
  };
};
