<template>
  <el-container>
    <el-header>
      <myheader></myheader>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer class="layout-copy">
        2018 &copy; Raxs
    </el-footer>
  </el-container>
</template>

<script>
  import Header from './components/Header.vue'

export default {
    components:{
      myheader: Header
    }
}
</script>

<style scoped>
  .layout-copy{
    text-align: center;
    line-height: 60px;
    color: gray;
  }
</style>
