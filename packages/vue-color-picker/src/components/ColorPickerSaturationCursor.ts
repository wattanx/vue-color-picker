import { defineComponent, h } from "vue";
import type { PropType } from "vue";
import { Position } from "../types/position";

export const ColorPickerSaturationCursor = defineComponent({
  props: {
    hex: {
      type: String,
      required: true,
    },
    saturationPosition: {
      type: Object as PropType<Position>,
      required: true,
    },
  },
  setup(props) {
    return () =>
      h("div", {
        style: {
          backgroundColor: props.hex,
          left: `${props.saturationPosition.x}px`,
          top: `${props.saturationPosition.y}px`,
        },
      });
  },
});
