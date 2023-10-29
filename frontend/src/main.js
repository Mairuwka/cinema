import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/router";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";

const app = createApp(App);

app.use(ToastPlugin);
app.use(router);

app.mount("#app");
