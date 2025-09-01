import { computed, defineComponent, h } from "vue";
import type { PropType } from "vue";
import { Position } from "../types/position";

export const ColorPickerHueCursor = defineComponent({
  props: {
    hue: {
      type: Number,
      required: true,
    },
    direction: {
      type: String as PropType<"horizontal" | "vertical">,
      required: true,
    },
    position: {
      type: Object as PropType<Position>,
      required: true,
    },
  },
  setup(props) {
    const isHorizontal = () => props.direction === "horizontal";

    const positionStyle = computed(() => {
      const huePosition = isHorizontal() ? props.position.x : props.position.y;
      return isHorizontal()
        ? { left: `${huePosition}px` }
        : {
            top: `${huePosition}px`,
          };
    });

    return () =>
      h("div", {
        style: {
          backgroundColor: `hsl(${props.hue}, 100%, 50%)`,
          ...positionStyle.value,
        },
      });
  },
});
