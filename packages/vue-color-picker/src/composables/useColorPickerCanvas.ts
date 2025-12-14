import { ref, onUnmounted } from "vue";
import type { Ref } from "vue";
import type { Position } from "../types/position";
import { clamp } from "../utils";

export type UseColorPickerCanvasOptions = {
  onChangePosition: (position: Position) => void;
};

export type UseColorPickerCanvasReturn = {
  targetElementRef: Ref<HTMLDivElement | null>;
  onMousedown: (e: MouseEvent) => void;
  onTouchStart: (e: TouchEvent) => void;
};

export const useColorPickerCanvas = ({
  onChangePosition,
}: UseColorPickerCanvasOptions): UseColorPickerCanvasReturn => {
  const targetElementRef = ref<HTMLDivElement | null>(null);
  const cleanupFns: Array<() => void> = [];

  onUnmounted(() => {
    cleanupFns.forEach((fn) => fn());
  });

  const move = (e: MouseEvent | Touch): void => {
    if (targetElementRef.value) {
      const { width, height, left, top } =
        targetElementRef.value.getBoundingClientRect();

      const x = clamp(e.clientX - left, width, 0);
      const y = clamp(e.clientY - top, height, 0);

      onChangePosition({ x, y });
    }
  };

  const onMousedown = (e: MouseEvent): void => {
    if (e.button !== 0) return;

    move(e);

    const onMouseMove = (_e: MouseEvent): void => {
      move(_e);
    };

    const cleanup = (): void => {
      document.removeEventListener("mousemove", onMouseMove, false);
      document.removeEventListener("mouseup", onMouseUp, false);
      const index = cleanupFns.indexOf(cleanup);
      if (index > -1) {
        cleanupFns.splice(index, 1);
      }
    };

    const onMouseUp = (_e: MouseEvent): void => {
      cleanup();
      move(_e);
    };

    cleanupFns.push(cleanup);
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

    const cleanup = (): void => {
      document.removeEventListener("touchmove", onTouchMove, false);
      document.removeEventListener("touchend", onTouchEnd, false);
      const index = cleanupFns.indexOf(cleanup);
      if (index > -1) {
        cleanupFns.splice(index, 1);
      }
    };

    const onTouchEnd = (_e: TouchEvent): void => {
      cleanup();
      if (_e.changedTouches.length > 0) {
        move(_e.changedTouches[0]);
      }
    };

    cleanupFns.push(cleanup);
    document.addEventListener("touchmove", onTouchMove, false);
    document.addEventListener("touchend", onTouchEnd, false);
  };

  return {
    targetElementRef,
    onMousedown,
    onTouchStart,
  };
};
