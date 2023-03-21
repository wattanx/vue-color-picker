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
};

export const useColorPicker = ({
  initialColor = "#FFFFFF",
  width = 214,
  height = 150,
}: UseColorPicker) => {
  const selfColor = ref(transformColor("hex", initialColor));
  const inputColor = ref(initialColor);

  const saturationPosition = computed(() => ({
    x: (selfColor.value.hsv.s / 100) * width,
    y: ((100 - selfColor.value.hsv.v) / 100) * width,
  }));

  const huePosition = computed(() => ({
    x: (selfColor.value.hsv.h / 360) * width,
  }));

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

  const onMoveHue = ({ x }: Position) => {
    const newHsv = { ...selfColor.value.hsv, h: (x / width) * 360 };
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
