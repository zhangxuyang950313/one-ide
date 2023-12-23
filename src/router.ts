import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/home",
      name: "home",
      component: () => import("./views/view-home.vue"),
    },
    {
      path: "/ide",
      name: "ide",
      component: () => import("./views/view-ide.vue"),
    },
  ],
});
