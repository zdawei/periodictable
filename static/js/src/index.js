
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import ptApp from './components/ptApp.vue';
import StoreObj from './store/index.js';
import ElementUI from 'element-ui';
import * as utils  from './utils/utils.js';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(Vuex);

const store = new Vuex.Store(StoreObj);

if(utils.cookie.get('APU')) {
    store.commit('upateLogin', 1);
    axios({
        method: 'get',
        url: '/aj/getel',
    }).then((res) => {
        if(res.data.code == 1) {
            store.commit('updateptTip', res.data.res);
        }
    });
}

new Vue({
    el: '#app',
    store,
    components : {
        ptApp,
    }
});