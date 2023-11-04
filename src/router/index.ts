import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/home.vue";

export default createRouter({
    history: createWebHistory("/"),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        }
    ]
})