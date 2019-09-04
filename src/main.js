import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import SimpleStorageContract from "@/static/contracts/SimpleContract.json";
import AlarmUpload from "@/static/contracts/AlarmUpload.json";


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import ContractMutual from "./utils/contract.mutual";

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$contractMutual = new ContractMutual(SimpleStorageContract)
Vue.prototype.$alarmUpload = new ContractMutual(AlarmUpload)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
