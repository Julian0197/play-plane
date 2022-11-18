<template>
  <container>
    <sprite :texture="plane"></sprite>
  </container>
</template>

<script>
import plane from "../assets/plane.png";
import { reactive, onMounted, onUnmounted } from "vue";

export default {
  setup() {
    return {
      plane,
    };
  },
};

export function usePlane({ onAttack }) {
  const planeInfo = reactive({
    x: 250,
    y: 600,
    width: 258,
    height: 364
  });

  // eslint-disable-next-line
  // 无需知道飞机移动的逻辑
  function move() {
    // move(键盘事件要传入e)
    const speed = 10;
    function handleMove(e) {
      switch (e.code) {
        case "ArrowUp":
          planeInfo.y -= speed;
          break;
        case "ArrowDown":
          planeInfo.y += speed;
          break;
        case "ArrowLeft":
          planeInfo.x -= speed;
          break;
        case "ArrowRight":
          planeInfo.x += speed;
          break;
      }
    }
    onMounted(() => {
      window.addEventListener("keyup", handleMove);
    });
    onUnmounted(() => {
      window.removeEventListener("keyup", handleMove);
    });
  }

  function attack() {
    function handleAttack(e) {
      if (e.code === "Space") {
        onAttack &&
          onAttack({
            x: planeInfo.x + 100,
            y: planeInfo.y,
          });
      }
    }
    onMounted(() => {
      window.addEventListener("keyup", handleAttack);
    });
    onUnmounted(() => {
      window.removeEventListener("keyup", handleAttack);
    });
  }

  move();
  attack();
  return {
    planeInfo,
  };
}
</script>

<style></style>
