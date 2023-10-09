import Vue from "vue";
import App from "./App.vue";
import router from "@/router/router";
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

Vue.use(VueToast);

const app = new Vue({
  router,
  render: (h) => h(App),
});

app.$mount("#app");
