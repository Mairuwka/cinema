import Vue from "vue";
import VueRouter from "vue-router";
import SessionPage from "@/components/pages/SessionPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "sessions",
    component: SessionPage,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
