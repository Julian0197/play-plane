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

export function usePlane() {
  const planeInfo = reactive({
    x: 250,
    y: 65
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

  move();

  return {
    planeInfo,
  };
}
</script>

<style></style>
