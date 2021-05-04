import Vue from "vue"

import "normalize.css/normalize.css" // A modern alternative to CSS resets

import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"

import "@/styles/index.scss" // global css

import App from "./App"
import store from "./store"
import router from "./router"

import "@/icons" // icon
import "@/permission" // permission control
import * as filters from "./filters" // global filters
Vue.use(ElementUI, {
    size: "medium"
})
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
Vue.config.productionTip = false

new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
})
