import {createApp} from 'vue'
import {createPinia, type Pinia} from 'pinia'
import './style.css'
import {VueQueryPlugin} from '@tanstack/vue-query'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import {router} from './app/routes.ts'
import App from './App.vue'
import './setup/veeValidate.ts'

const pinia: Pinia = createPinia()
const primeVueThemeConfig = {
    theme: {
        preset: Aura
    }
}
createApp(App)
    .use(router)
    .use(pinia)
    .use(PrimeVue, primeVueThemeConfig)
    .use(VueQueryPlugin)
    .mount('#app')
