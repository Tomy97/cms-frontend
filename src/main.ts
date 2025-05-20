import { createApp } from "vue";
import { createPinia, type Pinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "./style.css";
import { VueQueryPlugin } from "@tanstack/vue-query";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import { router } from "./app/routes.ts";
import App from "./App.vue";
import "./setup/veeValidate.ts";
import { useAuthStore } from "@/auth/store/auth.store.ts";
import 'primeicons/primeicons.css'

const pinia: Pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

window.addEventListener("storage", (e) => {
  if (e.key === "auth.token" && e.newValue === null) {
    const auth = useAuthStore();
    auth.logout();
  }
});

const primeVueThemeConfig = {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false,
    },
  },
};
createApp(App)
  .use(router)
  .use(pinia)
  .use(PrimeVue, primeVueThemeConfig)
  .use(VueQueryPlugin)
  .mount("#app");
