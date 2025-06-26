import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { key } from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()
// подключение vuetify, router, vuex
createApp(App)
  .use(router)
  .use(store, key)
  .use(vuetify)
  .mount('#app')
