<template>
  <div class="bcg">
    <div class="title">
      <h3>推 荐 课 程</h3>
    </div>
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :span="3" v-for="item in 5">

        <div @click="linkto(hotdata[item-1].courseid)">
          <div class="hotimg" :style="{backgroundImage:`url(${hotdata[item-1].imgurl})`}"></div>
          <div class="content">
            <h3>{{ hotdata[item-1].coursename }}</h3>
            <div class="price">{{ hotdata[item-1].price }}元</div>
          </div>
        </div>

      </el-col>
    </el-row>
    <div class="title">
      <h3>新 上 好 课</h3>
    </div>
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :span="3" v-for="item in 5">

        <div @click="linkto(newdata[item-1].courseid)">
          <div class="hotimg" :style="{backgroundImage:`url(${newdata[item-1].imgurl})`}"></div>
          <div class="content">
            <h3>{{ newdata[item-1].coursename }}</h3>
            <div class="price">{{ newdata[item-1].price }}元</div>
          </div>
        </div>

      </el-col>
    </el-row>
  </div>



</template>


<script>
  import api from './../public/api.js'
  import func from './../public/fuc.js'


  export default {

    data(){
      return{
        hotdata:[],
        newdata:[]
      }
    },
    methods:{

      init(){
        func.ajaxGet(api.hotCourse + '?' +Date.now(), res => {
          this.hotdata = res.data.hots;
        });
        func.ajaxGet(api.newCourse + '?' +Date.now(), res => {
          this.newdata = res.data.news;
        });
      },
      linkto(id){
        this.$router.push({name:'Course',params:{id:id}})
      }
    },
    mounted(){
      this.init();
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .title{
      display: flex;
      justify-content: center;
      /*margin: 20px 0px;*/
      color: darkcyan;
    }
    /*.el-row{*/
      /*margin-top: 25px;*/
    /*}*/
    .hotimg{
      height: 120px;
      width: 200px;
      border-radius: 4px;
    }
    .content{
      width: 200px;
      color: grey;
    }
    .content  h3{
      margin: 0;
      font: 	17px Small ;
    }
    .price{
      margin-top: 5px;
    }

</style>
