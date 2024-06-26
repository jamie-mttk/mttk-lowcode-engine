import { createApp, } from 'vue'

//
import App from './App.vue'
import router from './router'
//
//  import {install} from 'mttk-lowcode-engine'
 import * as install from '@/install/index'
// import 'mttk-lowcode-engine/dist/index.css'

//
const app = createApp(App)
//
const { globalContext } =install.installAll(app,router, { url: import.meta.env.VITE_APP_API_BASE, router })
//
app.mount('#app')
//
//app will be used by App.vue
//export default does not work :(
export { app }
