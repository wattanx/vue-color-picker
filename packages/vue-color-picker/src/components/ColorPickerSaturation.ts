import { defineComponent, h, isVue3 } from "vue-demi";
import { Position } from "../types/position";
import { ColorPickerCanvas } from "./ColorPickerCanvas";

export const ColorPickerSaturation = defineComponent({
  props: {
    hue: {
      type: Number,
      required: true,
    },
  },
  emits: {
    moveSaturation: (position: Position) => true,
  },
  setup(props, { emit, slots }) {
    const onChangePosition = (position: Position) => {
      emit("moveSaturation", position);
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
          style: {
            backgroundColor: `hsl(${props.hue}, 100%, 50%)`,
          },
        },
        slots.default?.()
      );
  },
});
