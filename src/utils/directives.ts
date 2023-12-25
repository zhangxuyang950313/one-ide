import { DirectiveBinding, Plugin } from "vue";

export const lazy: Plugin = (app) => {
  const loadImg = (element: HTMLElement, binding: DirectiveBinding) => {
    if (element instanceof HTMLImageElement) {
      if (typeof binding.value === "string") {
        const image = new Image();
        image.onload = () => {
          element.src = binding.value;
        };
        image.src = binding.value;
      }
    }
  };
  app.directive("lazy", {
    created: loadImg,
    beforeUpdate: loadImg,
  });
};
