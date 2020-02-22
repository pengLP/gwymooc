<template>

  <div>
    <div class="border">
      <div class="title">
        <span>{{ coursedata[0].coursename }}</span>
      </div>
      <div class="descr">
        <span>{{ coursedata[0].describes }}</span>
      </div>
      <div class="price">
        <span>价格：{{ coursedata[0].price }}元</span>
      </div>
      <div class="buy">
        <el-button type="danger" @click="addcart" >加入购物车</el-button>
      </div>
    </div>

    <div class="tabs">
      <el-menu :default-active="activeIndex" class="pagetab"
               mode="horizontal"
               @select="handleSelect">
        <el-menu-item index="1" class="taba">课程评价</el-menu-item>
        <el-menu-item index="2" class="taba">课程咨询</el-menu-item>
      </el-menu>
    </div>
    <div class="tabs">
      <component v-bind:is="currentView">

      </component>
    </div>

  </div>

</template>


<script>

  import api from './../public/api.js'
  import func from './../public/fuc.js'
  import consult from './../components/consult.vue'
  import evaluation from './../components/evaluation.vue'


  export default {
    components:{
      consult,
      evaluation
    },
    data(){
      return {
        coursedata:[],
        activeIndex: '1',
        currentView:'evaluation'
      }
    },
    methods:{
      init(){
        func.ajaxPost(api.courseDetail, { courseid: this.$route.params.id } , res => {
          if (res.data.code === 200) {
            this.coursedata = res.data.course;
          }
        });
      },
      handleSelect(key){
        if(key == 1){
          this.currentView = 'evaluation'
        }else {
          this.currentView = 'consult'
        }
      },
      addcart(){
        if(this.$store.state.logstate == true) {
          this.$message({
            showClose: true,
            message: '请登录',
            type: 'warning'
          });
          this.$router.push('/login');
        }else {
          func.ajaxPost(api.addCart, {
            userid: this.$store.state.userid ,
            courseid: this.$route.params.id } , res => {
            if (res.data.code === 200) {
              this.$message.success('添加购物车成功');
            }
            if (res.data.code === 503) {
              this.$message.error('购物车已有该课程');
            }
            if (res.data.code === 505) {
              this.$message.error('已购买该课程');
            }
          });
        }
      }
    },
    mounted(){
      this.init();
    },
    computed: {
      logstate (){
        return this.$store.state.logstate
      }
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .border{
      margin: 0 auto;
      width: 1024px;
      height: 520px;
      background-image: url("/static/bcg001.jpg");
    }
    .title{
      padding-top: 150px;
      text-align: center;

    }
    .title span{
      font-size: 32px;
      color: #fff;
      text-align: center;
    }
    .descr{
      padding-top: 35px;
      text-align: center;
      width: 400px;
      margin: 0 auto;
    }
    .descr span{
      font-size: 18px;
      color: #fff;
      text-align: center;
    }
    .price{
      padding-top: 20px;
      text-align: center;
    }
    .price span{
      font-size: 18px;
      color: red;
      text-align: center;
    }
    .buy{
      text-align: center;
      padding-top: 20px;
    }

    .tabs{
      margin: 0 auto;
      width: 1024px;
    }
    .pagetab {
      display: flex;
      justify-content: center;
    }
    .taba{
      padding: 0px 100px;
    }

</style>
