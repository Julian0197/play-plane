export default {
  // 敌军飞机配置
  enemy: {
    speed() {
      return Math.floor(Math.random() * 10) + 5;
    }
  },
  // 我方飞机配置
  plane: {
    bullet: {
      speed: 10
    }
  }
};
