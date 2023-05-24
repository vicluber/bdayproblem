import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './assets/main.css'
const app = createApp(App)
// import translations
import en from "./locales/en.json";
import es from "./locales/es.json";

// configure i18n
const i18n = createI18n({
  locale: "es",
  fallbackLocale: "es",
  messages: { en, es },
});

app.provide('axios', axios)

app.use(router)

app.use(i18n)

app.mount('#app')
