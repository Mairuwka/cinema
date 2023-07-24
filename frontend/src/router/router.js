import Vue from "vue";
import VueRouter from "vue-router";
import SessionShedule from "@/components/pages/SessionShedule.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "sessions",
    component: SessionShedule,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
