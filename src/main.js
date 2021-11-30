import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import '@/styles/element-variables.scss';
import '@/styles/element-reset.scss';
import '@/styles/common.scss';

import { showLoading, hideLoading } from '@/utils/loading';
import '@/styles/normalize.css';
import khDialog from '@/components/KhDialog/khDialog.vue';
import slideDialogFull from '@/components/SlideDialog/slideDialogFull.vue';
Vue.component('kh-dialog', khDialog);
Vue.component('slide-dialog-full', slideDialogFull);
Vue.use(ElementUI);
Vue.prototype.$showLoading = showLoading;
Vue.prototype.$hideLoading = hideLoading;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
console.log(1);
console.log(2);
