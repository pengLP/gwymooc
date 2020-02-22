<template>

  <div>
    <div class="body">
      <el-table
        :data="coursedata"
        border
        style="width: 100%">
        <el-table-column
          prop="orderid"
          label="订单号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="userid"
          label="用户id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="userorder"
          label="订单内容">
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>


<script>
  import api from './../public/api.js'
  import func from './../public/fuc.js'
  export default {
    data(){
      return {
        coursedata:[]
      }
    },
    methods:{
      init(){

        func.ajaxPost(api.getUserOrder, { userid: this.$store.state.userid } , res => {
          if (res.data.code === 200) {
            this.coursedata = res.data.course;
          }
        });
      }
    },
    mounted(){
      this.init();
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .body{
    width: 1200px;
    margin: 0px auto;
  }


</style>
