<template>
    <el-menu :default-active="activeIndex" class="nav-menu" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">
        <div id="logo"></div>
      </el-menu-item>
      <el-menu-item index="2">课程商城</el-menu-item>
      <el-menu-item index="4" class="login" v-if="logstate" >登录</el-menu-item>
      <el-menu-item index="5" class="login" v-if="logstate" >注册</el-menu-item>
      <el-submenu index="6" class="login" v-if="!logstate">
        <template slot="title">{{ user }}</template>
        <el-menu-item index="6">用户中心</el-menu-item>
        <el-menu-item index="7">登出</el-menu-item>
      </el-submenu>

      <el-menu-item index="8" class="login" v-if="!logstate" >

          <div class="shopicon"></div>
      </el-menu-item>


    </el-menu>
</template>

<script>
  import api from './../public/api.js'
  import func from './../public/fuc.js'

  export default {
      data(){
        return{

        }
      },
      methods:{
        handleSelect(key) {
          if(key == 1) this.$router.push('/');
          if(key == 2) this.$router.push('/shop');
          if(key == 4) this.$router.push('/login');
          if(key == 5) this.$router.push('/register');
          if(key == 6) this.$router.push('/usercenter');
          if(key == 7) this.$store.commit('logout')
          if(key == 8) this.$router.push('/shopcart');

        }
      },
      computed: {
        user () {
          return this.$store.state.username
        },
        logstate (){
          return this.$store.state.logstate
        }
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .login{
    float: right;
  }
  .nav-menu{
    padding: 0 200px;
  }
  #logo{
    background: url("./../assets/mooclogo.png") no-repeat center;
    height: 60px;
    width: 150px;
  }
  .shopicon{
    background: url("/static/shopcarticon.png") no-repeat center;
    height: 60px;
    width: 71px;
  }

</style>
