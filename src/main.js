import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './assets/main.css'

const app = createApp(App)

app.provide('axios', axios)

app.use(router)

app.mount('#app')
