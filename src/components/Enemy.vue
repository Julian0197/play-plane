<template>
  <container>
    <sprite :texture="enemyImg"></sprite>
  </container>
</template>

<script>
import { onMounted, onUnmounted, reactive } from "vue";
import enemyImg from "../assets/enemy.png";
import { game } from "../game";
import config from "../config"

export default {
  setup() {
    return {
      enemyImg,
    };
  },
};

export function useEnemy() {
  const enemys = reactive([]);

  // 一秒创建一个飞机
  function createEnemy() {
    setInterval(() => {
      enemys.push({
        x: Math.floor(Math.random() * 500) + 50,
        y: -100,
        speed: config.enemy.speed(),
        width: 308,
        height: 207,
        HP: 2,
      });
    }, 1000);    
  }

  function destoryEnemy(index) {
    enemys.splice(index, 1)
  }

  function hit(enemy, eIndex) {
    enemy.HP--;
    if (enemy.HP <= 0) {
      destoryEnemy(eIndex);
    }
  }

  function move() {
    function handleTicker() {
      enemys.forEach((enemy, index) => {
        enemy.y += enemy.speed;
        // 移除超出屏幕的飞机
        if (enemy.y > 1080) {
          enemys.splice(index, 1);
        }
      });
    }

    onMounted(() => {
      game.ticker.add(handleTicker);
    });
    onUnmounted(() => {
      game.ticker.remove(handleTicker);
    });
  }
  createEnemy();
  move();
  
  return {
    destoryEnemy,
    hitEnemy: hit,
    enemys,
  };
}
</script>

<style></style>
