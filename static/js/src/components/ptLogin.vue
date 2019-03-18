<template>
    <el-row :gutter="20">
        <el-col :span="18" :offset="3">
            <el-card shadow="hover" class="box-card pt_box_card">
                <el-col :span="12">
                    <img src="/assets/index.png" alt="化学元素周期表" />
                </el-col>
                <el-col :span="12">
                    <h1 style="text-align: center;">用户登录</h1>
                    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="账号" prop="account">
                            <el-input v-model="ruleForm2.account" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-button type="text" class="pt_forget_password" @click="forgetPass">忘记密码?</el-button>
                        <el-form-item class="pt_submit">
                            <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
                            <el-button @click="signUp('ruleForm2')">注册</el-button>
                        </el-form-item>
                        <div class="line_02"><span>第三方登录</span></div>
                        <div style="margin-bottom: 30px;">
                            <img src="/assets/icon1.png" class="pt_icon">
                            <img src="/assets/icon2.png" class="pt_icon">
                            <img src="/assets/icon3.png" class="pt_icon">
                        </div>
                    </el-form>
                </el-col>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            var validateAccount = (rule, value, callback) => {
                // 账号
                if (value === '') {
                    callback(new Error('请输入账号'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                // 密码
                if (value === '') {
                    callback(new Error('请输入密码'));
                }  else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    account: '',
                    password: '',
                },
                rules2: {
                    account: [
                        { validator: validateAccount, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            forgetPass () {
                this.$alert('那就在注册一个号吧~', '登录信息', {
                    confirmButtonText: '确定',
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios({
                            method: 'post',
                            url: '/aj/login',
                            data: this.$data[formName]
                        }).then((res) => {
                            if(res.data.code == 1) {
                                this.$alert(res.data.msg, '登录信息', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.$store.commit('upatePageIndex', 1);
                                        this.$store.commit('upateLogin', 1);
                                    }
                                });
                            } else {
                                this.$alert(res.data.msg, '登录信息', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.$message({
                                            type: 'info',
                                            message: `请重新登录`
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
            signUp(formName) {
                axios({
                    method: 'post',
                    url: '/aj/reg',
                    data: this.$data[formName]
                }).then((res) => {
                    if(res.data.code == 1) {
                        this.$alert(res.data.msg, '注册信息', {
                            confirmButtonText: '确定',
                        });
                    } else {
                        this.$alert(res.data.msg, '注册信息', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `请重新注册`
                                });
                            }
                        });
                    }
                });
            }
        }
    }
</script>

<style>
    .pt_forget_password {
        width:100%;
    }
    .pt_forget_password span{
        float:right;
    }
    .pt_box_card{
        margin-top: 90px;
        max-width: 1170px;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
    }
    .pt_submit{
        margin-top: 10px;
        margin-left: 2%;
    }
    .line_02{
        height: 1px;
        border-top: 1px solid #ddd;
        text-align: center;
    }
    .line_02 span{
        position: relative;
        top: -8px;
        background: #fff;
        padding: 0 20px;
    }
    .pt_icon {
        margin-top: 40px;
        width: 30px;
        margin-left: 18%;
    }
</style>