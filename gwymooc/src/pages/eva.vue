<template>
  <div class="a">
    <el-form>
      <el-form-item label="评价">
        <el-input type="textarea" v-model="pingjia"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>

  </div>



</template>


<script>

  import api from './../public/api.js'
  import func from './../public/fuc.js'


  export default {

    data(){
      return {
        pingjia:''
      }
    },
    methods:{
      onSubmit(){

        console.log(this.pingjia)
        console.log(this.$route.params.id)
        func.ajaxPost(api.toEvaluation,{ courseid: this.$route.params.id , text: this.pingjia, username: this.$store.state.username  }, res => {
          this.$message.success('成功');
        });
      }
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .a{
      margin: 0 auto;
      width: 1024px;
    }

</style>
