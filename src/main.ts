import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

Vue.config.productionTip = false;

declare var require: any;
var VueTruncate = require("vue-truncate-filter");
Vue.use(VueTruncate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
