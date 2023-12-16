import { createRenderer } from "vue";
import { Stage } from "konva/lib/Stage";
import { Node } from "konva/lib/Node";
import { Layer } from "konva/lib/Layer";
import { Group } from "konva/lib/Group";
import { Shape } from "konva/lib/Shape";
import { Text } from "konva/lib/shapes/Text";
import { Circle } from "konva/lib/shapes/Circle";
import { Rect } from "konva/lib/shapes/Rect";
import Demo from "./Demo.vue";

const stage = new Stage({
  container: "#app",
  width: window.innerWidth,
  height: window.innerHeight,
});

const rootLayer = new Layer();
stage.add(rootLayer);

export const renderer = createRenderer<Node, Node>({
  patchProp(
    el,
    key,
    prevValue,
    nextValue,
    isSVG,
    prevChildren,
    parentComponent,
    parentSuspense,
    unmountChildren,
  ): void {
    el.setAttr(key, nextValue);
  },
  insert(el, parent, anchor): void {
    console.log("insert", { el, parent, anchor });
    if (parent instanceof Layer || parent instanceof Group) {
      if (el instanceof Shape || el instanceof Group) {
        parent.add(el);
      }
    }
  },
  remove(el): void {
    console.trace(el);
    console.log("remove", { el });
    el.destroy();
  },
  createElement(type: string, isSVG = false, isCustomizedBuiltIn, vnodeProps) {
    console.log("createElement", {
      type,
      isSVG,
      isCustomizedBuiltIn,
      vnodeProps,
    });
    switch (type) {
      case "circle": {
        return new Circle();
      }
      case "rectangle": {
        return new Rect();
      }
      case "text": {
        return new Text();
      }
      case "group": {
        return new Group();
      }
    }
    return new Layer();
  },
  createText(text: string) {
    console.log("createText", { text });
    return new Text({ text, visible: !!text });
  },
  createComment(text) {
    console.log("createComment", { text });
    return new Text({ visible: false, text });
  },
  setText(node, text: string): void {
    throw new Error("Function not implemented.");
  },
  setElementText(node, text: string): void {
    console.log("setElementText", { node, text });
    if (node instanceof Group) {
      node.children.forEach((el) => {
        el.remove();
      });
      node.add(new Text({ text }));
    }
    // TODO 形状中插入文字
    else if (node instanceof Shape) {
      // const group = new Group({
      //   x: node.x(),
      //   y: node.y(),
      // });
      // console.log({ x: node.x(), y: node.y() });
      // if (node.parent) {
      //   node.parent.add(group);
      // } else {
      //   rootLayer.add(group);
      // }
      // node.moveTo(group);
      // group.add(new Text({ text }));
    }
    // const parent = node.children[0];
    // if (parent instanceof Group) {
    //   parent.add(new Text({ text }));
    // }
  },
  parentNode(node) {
    return node.parent;
  },
  nextSibling(node) {
    if (!node.parent) return null;
    const index = node.parent.children.findIndex((item) => item === node);
    if (index === -1) return null;
    if (index === node.parent.children.length) {
      return node.parent.children[node.parent.children.length - 1] || null;
    }
    return node.parent.children[index + 1];
  },
  querySelector(selector) {
    throw new Error("Function not implemented.");
  },
});
renderer.createApp(Demo).mount(rootLayer);
console.log("toObject", stage.toObject());
