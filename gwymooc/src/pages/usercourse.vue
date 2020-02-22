<template>

  <div>
    <div class="title">
      <h3> 课 程 列 表 </h3>
    </div>
    <div class="body">
      <el-row :gutter="20" type="flex" justify="start" v-for="cd in coursedata" class="row">
        <el-col :push="5" :span="3">
          <div class="hotimg" :style="{backgroundImage:`url(${cd.imgurl})`}"></div>
        </el-col>
        <el-col :push="5" :span="10">

          <div class="content">
            <h3>{{ cd.coursename }}</h3>
            <div class="toleft">
              <div>{{ cd.details }}</div>
              <div class="toright">
                <el-button type="info" round @click="toeva(cd.courseid)">评价</el-button>
                <el-button type="danger" round @click="watch(cd.courseid)">点击观看</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
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

        func.ajaxPost(api.getUserCourse, { userid: this.$store.state.userid } , res => {
          if (res.data.code === 200) {
            this.coursedata = res.data.course;
          }
        });
      },
      watch(id){
        this.$router.push({name:'Watch',params:{id:id}})
      },
      toeva(id){
        this.$router.push({name:'eva',params:{id:id}})
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

    margin: 0px auto;
  }
  .title{
    display: flex;
    justify-content: center;
    /*margin: 20px 0px;*/
    color: darkcyan;
  }

  .hotimg{
    height: 120px;
    width: 200px;
    border-radius: 4px;
  }
  .content{
    width: 100%;
    color: grey;
  }
  .toleft{
    display: flex;
    justify-content: space-between;
  }
  .toright{
    display: flex;
    justify-content: flex-end;
    padding-top: 10px;
  }

  .row{
    margin-top: 10px;
  }
  .title{
    display: flex;
    justify-content: center;
    /*margin: 20px 0px;*/
    color: darkcyan;
  }

</style>
