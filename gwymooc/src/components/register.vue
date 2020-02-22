<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm"
             label-position="left"
             label-width="0px"
             class="card-box login-form">
      <h3 class="title">注册</h3>
      <el-form-item prop="userid">

        <el-input name="userid"
                  type="text"
                  v-model="loginForm.userid"
                  placeholder="账号"></el-input>

      </el-form-item>
      <el-form-item prop="username">

        <el-input name="username"
                  type="text"
                  v-model="loginForm.username"
                  placeholder="用户名"></el-input>

      </el-form-item>
      <el-form-item prop="password">

        <el-input name="password"
                  v-model="loginForm.password"
                  placeholder="输入密码"></el-input>

        <!--<span class="show-pwd" @click="showPwd"><i class="el-icon-view"></i></span>-->
      </el-form-item>


      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleRegister">
          注册
        </el-button>
      </el-form-item>

    </el-form>


  </div>
</template>

<script>
  import api from './../public/api.js'
  import func from './../public/fuc.js'

  export default {
    data() {
      return {
        loginForm: {
          userid: '',
          username:'',
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
          username:[{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },{
            min: 2,
            max: 5,
            message: '长度在 2 到 5 个字符'
          },{
            pattern: /^[\u4E00-\u9FA5]+$/,
            message: '用户名只能为中文'
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
        loading: false
      }
    },
    methods: {

      handleRegister() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            func.ajaxPost(api.register, { userid: this.loginForm.userid ,name: this.loginForm.username ,pwd:this.loginForm.password } , res => {
              if (res.data.code === 200) {

                this.$message({
                  message: '注册成功',
                  type: 'success'
                });
                this.loading = false;
                this.$router.push('/');
                this.$store.commit('idstate',{username:this.loginForm.username,userid:this.loginForm.userid})
              }
              if (res.data.code === 500) {
                this.$message.error('账号重复');
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
