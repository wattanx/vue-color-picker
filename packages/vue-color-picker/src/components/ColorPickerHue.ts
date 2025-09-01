import { defineComponent, h } from "vue";
import type { Position } from "../types/position";
import { ColorPickerCanvas } from "./ColorPickerCanvas";

export const ColorPickerHue = defineComponent({
  emits: {
    moveHue: (position: Position) => true,
  },
  setup(_, { emit, slots }) {
    const onChangePosition = (position: Position) => {
      emit("moveHue", position);
    };

    return () =>
      h(
        ColorPickerCanvas,
        {
          onChangePosition,
        },
        slots.default?.()
      );
  },
});
