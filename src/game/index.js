// 封装pixi相关
import { Application } from 'pixi.js'


export const game = new Application({
  width: 750,
  height: 1080,
})

document.body.append(game.view);

// 暴露根容器 game.stage
export function getRootContainer() {
  return game.stage;
}