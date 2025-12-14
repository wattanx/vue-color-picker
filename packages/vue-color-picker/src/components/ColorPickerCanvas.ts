import { defineComponent, h } from "vue";
import type { Position } from "../types/position";
import { useColorPickerCanvas } from "../composables/useColorPickerCanvas";

export const ColorPickerCanvas = defineComponent({
  emits: {
    changePosition: (position: Position) => true,
  },
  setup(_, { emit, slots }) {
    const { targetElementRef, onMousedown, onTouchStart } = useColorPickerCanvas({
      onChangePosition: (position) => emit("changePosition", position),
    });

    return () =>
      h(
        "div",
        {
          onMousedown,
          onTouchstart: onTouchStart,
          ref: targetElementRef,
        },
        slots.default?.()
      );
  },
});
