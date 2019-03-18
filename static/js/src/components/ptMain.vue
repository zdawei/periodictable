<template>
        <el-main>
            <transition name="el-fade-in-linear">
                <pt-index v-show="pageIndex == 1"></pt-index>
            </transition>
            <transition name="el-fade-in-linear">
                <pt-login v-show="pageIndex == 2"></pt-login>
            </transition>
            <transition name="el-zoom-in-center">
                <pt-production v-show="pageIndex == 3"></pt-production>
            </transition>
            <transition name="el-zoom-in-center">
                <pt-case v-show="pageIndex == 4"></pt-case>
            </transition>
            <transition name="el-zoom-in-center">
                <pt-team v-show="pageIndex == 5"></pt-team>
            </transition>
            <transition name="el-zoom-in-center">
                <pt-about v-show="pageIndex == 6"></pt-about>
            </transition>
            <transition name="el-zoom-in-center">
                <pt-contact v-show="pageIndex == 7"></pt-contact>
            </transition>
        </el-main>
</template>

<script>
    import ptIndex from './ptIndex.vue';
    import ptLogin from './ptLogin.vue';
    import ptProduction from './ptProduction.vue';
    import ptCase from './ptCase.vue';
    import ptTeam from './ptTeam.vue';
    import ptAbout from './ptAbout.vue';
    import ptContact from './ptContact.vue';
    export default {
        data () {
            return {
            }
        },
        components : {
            ptIndex,
            ptLogin,
            ptProduction,
            ptCase,
            ptTeam,
            ptAbout,
            ptContact,
        },
        computed : {
            pageIndex () {
                if(this.$store.state.pageIndex == 2) {
                    document.body.style.backgroundImage = 'url(/assets/index2.jpg)';
                } else {
                    document.body.style.backgroundImage = 'url(/assets/index3.png)';
                }
                return this.$store.state.pageIndex || 1;
            }
        },
        methods : {
        }
    };
</script>

<style>
    .el-row {
        height:100%;
        margin-bottom: 0px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
        height:100%;
    }
    .pt_col_l {
        margin-top: 200px;
        margin-left: 30px;
    }
    .pt_col_r {
        margin-top: 130px;
        margin-left: 30px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        height:100%;
    }
    .pt_font {
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        font: 20px Extra large;
        color: #e5e9f2;
    }
</style>