<template>
    <el-container class="pt_container">
         <el-header class="pt_el_header" ref="ptHeader">
            <el-row class="row-bg" type="flex" justify="end">
                <!-- 24格 -->
                <el-col :span="2"><el-button @click="itemClick($event, 1)" type="text" :class="pageIndex == 1 ? selectItem : unSelectItem">首页</el-button></el-col>
                <el-col :span="2"><el-button @click="itemClick($event, 2)" type="text" :class="pageIndex == 2 ? selectItem : unSelectItem">{{isLogin}}</el-button></el-col>
                <el-col :span="2"><el-button @click="itemClick($event, 3)" type="text" :class="pageIndex == 3 ? selectItem : unSelectItem">产品</el-button></el-col>
                <el-col :span="2"><el-button @click="itemClick($event, 4)" type="text" :class="pageIndex == 4 ? selectItem : unSelectItem">案例</el-button></el-col>
                <el-col :span="2"><el-button @click="itemClick($event, 5)" type="text" :class="pageIndex == 5 ? selectItem : unSelectItem">团队</el-button></el-col>
                <el-col :span="2"><el-button @click="itemClick($event, 6)" type="text" :class="pageIndex == 6 ? selectItem : unSelectItem">关于</el-button></el-col>
                <el-col :span="2"><el-button @click="itemClick($event, 7)" type="text" :class="pageIndex == 7 ? selectItem : unSelectItem">联系</el-button></el-col>
            </el-row>
         </el-header>
        <pt-main></pt-main>
    </el-container>
</template>

<script>
    import ptMain from './ptMain.vue';
    import axios from 'axios';
    import * as utils  from '../utils/utils.js';
    export default {
        data () {
            return {
                selectItem : 'pt_button_curr',
                unSelectItem : '',
            }
        },
        components : {
            ptMain,
        },
        computed : {
            pageIndex () {
                return this.$store.state.pageIndex || 1;
            },
            isLogin () {
                return this.$store.state.isLogin ? '退出' : '登录';
            }
        },
        methods : {
            itemClick (e,data) {
                if(data == 2 && this.$store.state.isLogin == 1) {
                    axios({
                        method: 'get',
                        url: '/aj/logout',
                    }).then((res) => {
                        if(res.data.code == 1) {
                            this.$alert('退出成功', '登录信息', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$store.commit('upateLogin', 0);
                                }
                            });
                        }
                    });
                } else {
                    this.$store.commit('upatePageIndex', data);
                }
            }
        },
        created () {
            if(utils.cookie.get('APU')) {
                this.$store.commit('upateLogin', 1);
            }
        }
    };
</script>

<style>
    html {
        height:100%;
        min-width: 1000px;
    }
    body {
        height: 100%;
        margin-top: 0px;
        margin-bottom: 0px;
        background-image: url('/assets/index3.png');
        background-repeat:no-repeat; 
        background-size:100% 100%;
    }
    .pt_container {
        height: 100%;
    }
    .pt_button_curr {
        background-color: yellow !important;
        color : black !important;
    }
    main.el-main {
        overflow: hidden;
    }
    header.pt_el_header {
        padding: 0;
    }
    .el-row {
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
    }
</style>