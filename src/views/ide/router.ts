import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("./index.vue"),
    },
  ],
});
