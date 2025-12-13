import { defineComponent, ref, h } from "vue";
import type { Position } from "../types/position";
import { clamp } from "../utils";

export const ColorPickerCanvas = defineComponent({
  emits: {
    changePosition: (position: Position) => true,
  },
  setup(_, { emit, slots }) {
    const divRef = ref<HTMLDivElement | null>(null);

    const move = (e: MouseEvent | Touch): void => {
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

    const onTouchStart = (e: TouchEvent): void => {
      if (e.touches.length !== 1) return;

      e.preventDefault();
      move(e.touches[0]);

      const onTouchMove = (_e: TouchEvent): void => {
        move(_e.touches[0]);
      };

      const onTouchEnd = (_e: TouchEvent): void => {
        document.removeEventListener("touchmove", onTouchMove, false);
        document.removeEventListener("touchend", onTouchEnd, false);

        if (_e.changedTouches.length > 0) {
          move(_e.changedTouches[0]);
        }
      };

      document.addEventListener("touchmove", onTouchMove, false);
      document.addEventListener("touchend", onTouchEnd, false);
    };

    return () =>
      h(
        "div",
        {
          onMousedown,
          onTouchstart: onTouchStart,
          ref: divRef,
        },
        slots.default?.()
      );
  },
});
