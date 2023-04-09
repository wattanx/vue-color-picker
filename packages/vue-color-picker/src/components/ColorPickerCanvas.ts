import { defineComponent, ref, h, isVue3 } from "vue-demi";
import { Position } from "../types/position";
import { clamp } from "../utils";

export const ColorPickerCanvas = defineComponent({
  emits: {
    changePosition: (position: Position) => true,
  },
  setup(_, { emit, slots }) {
    const divRef = ref<HTMLDivElement | null>(null);

    const move = (e: MouseEvent): void => {
      if (divRef.value) {
        const { width, height, left, top } =
          divRef.value.getBoundingClientRect();

        const x = clamp(e.clientX - left, width, 0);
        const y = clamp(e.clientY - top, height, 0);

        emit("changePosition", { x, y });
      }
    };

    const onMousedown = (e: MouseEvent): void => {
      if (e.button !== 0) return;

      move(e);

      const onMouseMove = (_e: MouseEvent): void => {
        move(_e);
      };

      const onMouseUp = (_e: MouseEvent): void => {
        document.removeEventListener("mousemove", onMouseMove, false);
        document.removeEventListener("mouseup", onMouseUp, false);

        move(_e);
      };

      document.addEventListener("mousemove", onMouseMove, false);
      document.addEventListener("mouseup", onMouseUp, false);
    };

    const eventHandlers = isVue3
      ? {
          onMousedown,
        }
      : {
          on: {
            mousedown: onMousedown,
          },
        };

    return () =>
      h(
        "div",
        {
          ...eventHandlers,
          ref: divRef,
        },
        slots.default?.()
      );
  },
});
