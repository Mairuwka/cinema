import Vue from "vue";
import VueRouter from "vue-router";
import SessionsPage from "@/components/pages/SessionsPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/sessions",
    name: "sessions",
    component: SessionsPage,
    alias: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
