import Vue from "vue";
import VueRouter from "vue-router";
import SessionsList from "@/components/pages/SessionsList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "sessions",
    component: SessionsList,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
