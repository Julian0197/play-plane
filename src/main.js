import { createApp } from "./runtime-canvas";
import { getRootContainer } from "./game";
import App from "./App.vue";

// pixijs
// 基于canvas重写renderer

createApp(App).mount(getRootContainer());
