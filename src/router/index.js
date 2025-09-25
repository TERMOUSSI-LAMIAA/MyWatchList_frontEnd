import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import MediaList from "../views/MediaList.vue";
import MediaDetails from "../views/MediaDetails.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  { path: "/medialist", component: MediaList },
  { path: "/media/:id", component: MediaDetails, props: true }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
