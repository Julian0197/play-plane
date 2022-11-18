import { game } from "../game";
import { hitTestObject } from "@/utils";
import { onMounted, onUnmounted } from "vue"; 

export function useFighting({
  enemys,
  bullets,
  planeInfo,
  gameover,
  hitEnemy,
  destoryBullet,
}) {
  // fighting
  function handleTicker() {
    // 敌方飞机和我方飞机碰撞
    enemys.forEach((enemy) => {
      if (hitTestObject(planeInfo, enemy)) {
        // gameover => 页面跳转
        gameover();
      }
    });

    // 我方子弹和敌方飞机碰撞
    enemys.forEach((enemy, eIndex) => {
      bullets.forEach((bullet, bIndex) => {
        if (hitTestObject(enemy, bullet)) {
          hitEnemy(enemy, eIndex)
          destoryBullet(bIndex);
        }
      });
    });
  }

  onMounted(() => {
    game.ticker.add(handleTicker);
  });
  onUnmounted(() => {
    game.ticker.remove(handleTicker);
  });
}
