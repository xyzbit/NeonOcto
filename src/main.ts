import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 先导入全局样式
import './style.css'
// 再导入像素风格样式
import './assets/pixel-style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
