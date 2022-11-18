<template>
  <container>
    <sprite :texture="bulletItem"></sprite>
  </container>
</template>

<script> 
import { onMounted, onUnmounted, reactive } from "vue";
import bulletItem from "../assets/bunny-self.png";
import { game } from "../game";
import config from "../config"

export default {
  setup() {
    return {
      bulletItem,
    };
  },
};

export function useBullet() {
  const bullets = reactive([]);

  function addBullet(position) {
    bullets.push({ width: 61, height: 99, ...position});
  }

  function destoryBullet(index) {
    bullets.splice(index, 1)
  }

  function move() {
    function handleTicker() {
      bullets.forEach((bullet, index) => {
        bullet.y -= config.plane.bullet.speed;
        if (bullet.y < - 100) {
          bullets.splice(index, 1);
        }
      })
    }
    onMounted(() => {
      game.ticker.add(handleTicker)
    });
    onUnmounted(() => {
      game.ticker.remove(handleTicker)
    })
  }
  move();

  return {
    bullets,
    addBullet,
    destoryBullet
  };
}
</script>

<style></style>
