import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/common.scss'

// import { Graph02, Graph03, Dashboard01 } from '../dist/dashboard.common.js';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
