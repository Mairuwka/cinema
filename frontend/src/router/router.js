import { createRouter, createWebHistory } from "vue-router";
import SessionsPage from "@/components/pages/SessionsPage.vue";

const routes = [
  {
    path: "/sessions",
    name: "sessions",
    component: SessionsPage,
    alias: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
