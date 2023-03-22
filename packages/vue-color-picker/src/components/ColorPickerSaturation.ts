import { defineComponent, h } from "vue-demi";
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
    return () =>
      h(
        ColorPickerCanvas,
        {
          on: {
            changePosition: onChangePosition,
          },
          // @ts-ignore
          onChangePosition,
          style: {
            backgroundColor: `hsl(${props.hue}, 100%, 50%)`,
          },
        },
        slots.default?.()
      );
  },
});
