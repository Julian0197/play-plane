import { game } from "@/game";
import { onMounted, onUnmounted } from "vue";

export function planeMove(planeInfo) {
  // eslint-disable-next-line
  const speed = 10;

  const leftAndRightArr = [];
  const upAndDownArr = [];

  const upCommand = {
    type: 'upAndDown',
    name: 'up',
    dir: -1
  };
  const downCommand = {
    type: 'upAndDown',
    name: 'down',
    dir: 1
  };
  const leftCommand = {
    type: 'leftAndRight',
    name: 'left',
    dir: -1
  };
  const rightCommand = {
    type: 'leftAndRight',
    name: 'right',
    dir: 1
  };

  const map = {
    "ArrowUp": upCommand,
    "ArrowDown": downCommand,
    "ArrowLeft": leftCommand,
    "ArrowRight": rightCommand
  }

  function getArrByCommand(command) {
    if (command.type === "leftAndRight") {
      return leftAndRightArr;
    } else {
      return upAndDownArr;
    }
  }

  function addCommand(command) {
    const arr = getArrByCommand(command);
    arr.unshift(command)
  }

  function removeCommand(command) {
    const arr = getArrByCommand(command);
    const index = arr.indexOf(command);
    arr.splice(index, 1)
  }

  function isExistCommand(command) {
    const arr = getArrByCommand(command);
    return arr.indexOf(command) !== -1
  }

  function handleKeyup(e) {
    //  当用户按下键，再次抬起时，被触发
    const command = map[e.code];
    if (command && isExistCommand(command)) {
      removeCommand(command);
    }
  }

  function handleKeydown(e) {
    //  当用户按下键时，立刻被触发
    const command = map[e.code];
    // 一个按键不能重复添加
    if (command && !isExistCommand(command)) {
      addCommand(command);
    }
  }

  function handleTicker() {
    const leftAndRightCommand = leftAndRightArr[0];
    if (leftAndRightCommand) {
      console.log(leftAndRightCommand);
      planeInfo.x += leftAndRightCommand.dir * speed;
    }
    const upAndDownCommand = upAndDownArr[0];
    if (upAndDownCommand) {
      planeInfo.y += upAndDownCommand.dir * speed;
    }
  }

  onMounted(() => {
    game.ticker.add(handleTicker);
    window.addEventListener("keyup", handleKeyup);
    window.addEventListener("keydown", handleKeydown);
  });
  onUnmounted(() => {
    game.ticker.remove(handleTicker);
    window.removeEventListener('keyup', handleKeyup)
    window.removeEventListener("keydown", handleKeydown);
  });
}
