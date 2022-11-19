<template>
  <container>
    <sprite :texture="plane"></sprite>
  </container>
</template>

<script>
import plane from "../assets/plane.png";
import { reactive, onMounted, onUnmounted } from "vue";
import { planeMove } from "./planeMove";

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

  planeMove(planeInfo);
  attack();
  return {
    planeInfo,
  };
}
</script>

<style></style>
