<template>
    <el-row :gutter="20" v-if="!isLogin">
        <el-col :span="12">
            <div class="pt_col_l">
                <div class="pt_font">IAS物理学</div>
                <div class="pt_font">材料数据库</div>
                <div class="pt_font">2015160104 丛牧鸽</div>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="pt_col_r">
                <img src="/assets/index.png"  alt="化学元素周期表" />
            </div>
        </el-col>
    </el-row>
    <el-row :gutter="0" v-else>
        <el-col :span="24" :offset="0">
            <div class="tableWrap">
                <PeriodicTable/>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import PeriodicTable from "./home/PeriodicTable";
    export default {
        data () {
            return {
            }
        },
        components : {
            PeriodicTable,
        },
        computed : {
            isLogin () {
                return this.$store.state.isLogin;
            }
        },
        methods : {
        }
    };
</script>

<style>
    .tableWrap {
        float: none !important;
    }
</style>