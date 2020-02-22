<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm"
             label-position="left"
             label-width="0px"
             class="card-box login-form">
      <h3 class="title">登录</h3>
      <el-form-item prop="userid">

        <el-input name="userid"  type="text"
                  v-model="loginForm.userid"
                  autoComplete="on"
                  placeholder="账号"></el-input>

      </el-form-item>
      <el-form-item prop="password">

        <el-input name="password" :type="pwdType"
                  @keyup.enter.native="handleLogin"
                  v-model="loginForm.password"
                  placeholder="密码"></el-input>
        <!--<span class="show-pwd" @click="showPwd"><i class="el-icon-view"></i></span>-->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import api from './../public/api.js'
  import func from './../public/fuc.js'

  export default {
    name: 'login',
    data() {

      return {
        loginForm: {
          userid: '',
          password: ''
        },
        loginRules: {
          userid:[{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }, {
            min: 2,
            max: 6,
            message: '长度在 2 到 6 个字符'
          }, {
            pattern:/^[a-zA-Z](\w){2,6}$/,
            message: '以字母开头，长度在2-6之间， 只能包含字符、数字和下划线'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }, {
            min: 6,
            max: 20,
            message: '长度在 6 到 20 个字符'
          }, {
            pattern: /^(\w){6,20}$/,
            message: '只能输入字母、数字、下划线'
          }]
        },
        loading: false,
        pwdType: 'password',
        userdata:[]
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            func.ajaxPost(api.login, { userid: this.loginForm.userid ,pwd:this.loginForm.password } , res => {
              if (res.data.code === 200) {
                this.userdata = res.data.user;
                this.$message({
                  message: '登录成功',
                  type: 'success'
                });
                this.loading = false;
                this.$router.push('/');
                this.$store.commit('idstate',{
                  username:this.userdata[0].username,
                  userid:this.userdata[0].userid
                })
              }
              if (res.data.code === 501) {
                this.$message.error('账号不存在');
                this.loading = false
              }
              if (res.data.code === 502) {
                this.$message.error('密码错误');
                this.loading = false
              }
            });

          }
          else {
            this.$message.error('输入错误');
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .title{
    text-align: center;
  }
  .login-container{
    width: 500px;
    margin: 0 auto;
  }



</style>
