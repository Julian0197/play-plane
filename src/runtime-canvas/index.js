// 基于canvas的renderer封装
import { createRenderer } from "vue";
import { Container, Sprite, Texture } from "pixi.js";

const renderer = createRenderer({
  createElement(type) {
    let element;
    switch (type) {
      case "container":
        element = new Container();
        break;
      case "sprite":
        element = new Sprite();
        break;
    }
    return element;
  },

  // 添加
  insert(el, parent) {
    if (el) {
      parent.addChild(el)
    }
  },

  // 处理属性
  patchProp(el, key, prevValue, nextValue) {
    // texture 设置图片路径，需要特殊处理
    switch (key) {
      case "texture":
        el.texture = Texture.from(nextValue);
        break;
      case "onClick":
        el.on("pointertap", nextValue);
        break;
      default:
        el[key] = nextValue;
        break;
    }
  },
  // 获取父级组件节点时，调用这个函数，返回父亲节点
  parentNode(node) {
    return node.parent;
  },
  remove(el) {
    if (el && el.parent) {
      el.parent.removeChild(el);
    }
  },
  createComment() {},
  nextSibling() {}
});

export function createApp(rootComponent) {
  return renderer.createApp(rootComponent);
}
