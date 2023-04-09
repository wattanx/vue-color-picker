import { defineComponent, h, isVue3 } from "vue-demi";
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

    const eventHandlers = isVue3
      ? {
          onChangePosition,
        }
      : {
          on: {
            changePosition: onChangePosition,
          },
        };

    return () =>
      h(
        ColorPickerCanvas,
        {
          ...eventHandlers,
        },
        slots.default?.()
      );
  },
});
