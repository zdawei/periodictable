
// import axios from 'axios';
// import util from '../assets/js/util.js';

export default {
    state : {
        pageIndex : 1,
        isLogin : 0,
    },
    mutations : {
        upatePageIndex (state, opt) {
            state.pageIndex = opt;
        },
        upateLogin (state, opt) {
            state.isLogin = opt;
        }
    },
};
