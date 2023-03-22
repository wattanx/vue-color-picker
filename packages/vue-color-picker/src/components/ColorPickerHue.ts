import { defineComponent, h } from "vue-demi";
import { Position } from "../types/position";
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
          on: {
            changePosition: onChangePosition,
          },
          // @ts-ignore
          onChangePosition,
        },
        slots.default?.()
      );
  },
});
