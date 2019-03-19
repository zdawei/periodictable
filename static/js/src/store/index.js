
export default {
    state : {
        pageIndex : 1,
        isLogin : 0,
        ptTip : null
    },
    mutations : {
        upatePageIndex (state, opt) {
            state.pageIndex = opt;
        },
        upateLogin (state, opt) {
            state.isLogin = opt;
        },
        updateptTip (state, opt) {
            state.ptTip = opt;
        }
    },
};
