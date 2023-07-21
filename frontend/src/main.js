import Vue from "vue";
import App from "./App.vue";
import BaseCalendar from "@/components/ui/BaseCalendar.vue";
import router from "@/router/router";

Vue.component("base-calendar", BaseCalendar);

const app = new Vue({
  router,
  render: (h) => h(App),
});

app.$mount("#app");
