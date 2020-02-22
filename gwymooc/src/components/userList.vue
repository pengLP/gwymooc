<template>
  <el-table
    :data="tableData"
    border
    style="width: 600px"
    :key="item">
    <el-table-column
      prop="userid"
      label="用户id"
      width="180">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户姓名"
      width="180">
    </el-table-column>
    <el-table-column
      label="操作"
      width="180">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

</template>


<script>
  import api from './../public/api.js'
  import func from './../public/fuc.js'
  import axios from 'axios'

  export default {

    data(){
      return{
        tableData:[]
      }
    },
    methods:{
      handleClick(row){
        func.ajaxPost(api.userDelete, { id: row.userid } , res => {
          if (res.data.code === 200) {
            let index = this.tableData.indexOf(row);
            this.tableData.splice(index, 1);
            this.$message.success('删除成功');
          }
        });
      },
      init(){
        func.ajaxGet(api.userList + '?' +Date.now(), res => {
          this.tableData = res.data.user;
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



</style>
