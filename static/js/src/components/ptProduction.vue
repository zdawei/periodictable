<template>
    <el-row :gutter="20">
        <el-col :span="12" :offset="6">
            <el-card class="box-card pt_card" shadow="hover">
                <div class="ptProduction">
                    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="元素" prop="element">
                            <el-input v-model="ruleForm2.element" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="材料" prop="stuff">
                            <el-input  v-model="ruleForm2.stuff" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="性质" prop="nature">
                            <el-input v-model.number="ruleForm2.nature"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                            <el-button @click="resetForm('ruleForm2')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            let validateEl = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入元素'));
                } 
                callback();
            };
            let validateStuff = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入材料'));
                }
                callback();
            };
            let checkNature = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入性质'));
                }
                callback();
            };
            return {
                ruleForm2: {
                    element: '',
                    stuff: '',
                    nature: ''
                },
                rules2: {
                    element: [
                        { validator: validateEl, trigger: 'blur' }
                    ],
                    stuff: [
                        { validator: validateStuff, trigger: 'blur' }
                    ],
                    nature: [
                        { validator: checkNature, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                if(this.$store.state.isLogin == 0) {
                    this.$alert('请先登录', '登录信息', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$store.commit('upatePageIndex', 2);
                        }
                    });
                    return ;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios({
                            method: 'get',
                            url: '/aj/elsubmit',
                            params: this.$data[formName]
                        }).then( e => {
                            if(e.data.code == 1) {
                                console.log(e.data);
                                this.$alert('输入成功', '元素信息', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.$store.commit('updateptTip', e.data.res);
                                        this.$store.commit('upatePageIndex', 1);
                                    }
                                });
                            } else {
                                this.$alert(e.data.msg, '元素信息', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.$message({
                                            type: 'info',
                                            message: `请重新输入`
                                        });
                                    }
                                });
                            }

                        });
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style>
    .ptProduction {
        padding: 50px 50px 20px 0px;
    }
    .pt_card {
        margin-top: 100px;
    }
</style>