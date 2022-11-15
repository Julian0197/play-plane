import { createApp } from "./runtime-canvas";
import { getRootContainer } from "./game";
import App from "./App.vue";

// pixijs
// 基于canvas重写renderer

// 忽略警告
console.warn = () => {};
createApp(App).mount(getRootContainer());
