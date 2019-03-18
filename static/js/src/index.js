
import Vue from 'vue';
import Vuex from 'vuex';
import ptApp from './components/_ptApp.vue';
import StoreObj from './store/index.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(Vuex);

const store = new Vuex.Store(StoreObj);

new Vue({
    el: '#app',
    store,
    components : {
        ptApp,
    }
});