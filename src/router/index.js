import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import MediaList from "../components/MediaList.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  { path: "/medialist", component: MediaList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
