<template>
  <div class="login-container">
    <el-form  :model="passForm" :rules="changeRules" ref="passForm"
             label-position="left"
             label-width="0px"
             class="card-box login-form">
      <h3 class="title">修改密码</h3>
      <el-form-item prop="oldpassword">

        <el-input name="oldpassword"  type="text"
                  v-model="passForm.oldpassword"
                  placeholder="旧密码"></el-input>

      </el-form-item>
      <el-form-item prop="newpassword">

        <el-input name="newpassword" :type="pwdType"

                  v-model="passForm.newpassword"
                  placeholder="密码"></el-input>
        <!--<span class="show-pwd" @click="showPwd"><i class="el-icon-view"></i></span>-->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          修改
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
        passForm: {
          oldpassword: '',
          newpassword: ''
        },
        changeRules: {
          oldpassword:[{
            required: true,
            message: '请输入旧密码',
            trigger: 'blur'
          }],
          newpassword: [{
            required: true,
            message: '请输入新密码',
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

      handleLogin() {
        this.$refs.passForm.validate(valid => {
          if (valid) {
            this.loading = true;
            func.ajaxPost(api.changePassword, { userid: this.$store.state.userid , oldpassword: this.passForm.oldpassword ,newpassword:this.passForm.newpassword } , res => {
              if (res.data.code === 200) {

                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.loading = false;
                this.$router.push('/usercenter');
              }
              if (res.data.code === 501) {
                this.$message.error('账号不存在');
                this.loading = false
              }
              if (res.data.code === 506) {
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
