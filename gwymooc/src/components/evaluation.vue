<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 1024px"
      :key="item">
      <el-table-column
        prop="text"
        label="内容"
        width="800">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户姓名"
        width="220">
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
  import api from './../public/api.js'
  import func from './../public/fuc.js'

  export default {
    data(){
      return{
        tableData:[]
      }
    },
    methods:{
      init(){
        console.log(this.$route.params.id)
        func.ajaxPost(api.getEvaluation,{ courseid: this.$route.params.id }, res => {
          this.tableData = res.data.eva;
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
