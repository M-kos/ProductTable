import Vue from 'vue';
import App from './app';
import store from './store';

import './assets/main.scss'

Vue.config.productionTip = false;

store.dispatch('getProducts')

new Vue({
  store,
  render: (h) => h(App)
}).$mount('#app');
