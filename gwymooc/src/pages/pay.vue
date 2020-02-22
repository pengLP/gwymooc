<template>

  <div class="body">
    <div class="title">
      <h3> 您 的 订 单 </h3>
    </div>
    <el-row :gutter="20" type="flex" justify="start" v-for="(cd,index) in cartData" class="row">
      <el-col :push="5" :span="3">
        <div class="hotimg" :style="{backgroundImage:`url(${cd.imgurl})`}"></div>
      </el-col>
      <el-col :push="5" :span="10">

        <div class="content">
          <h3>{{ cd.coursename }}</h3>
          <div class="toleft">
            <div>{{ cd.details }}</div>
          </div>
        </div>

      </el-col>
    </el-row>
    <el-row type="flex" justify="center"  class="row">
      <el-button type="danger" @click="pay">支付</el-button>
    </el-row>
  </div>

</template>


<script>
  import api from './../public/api.js'
  import func from './../public/fuc.js'

  export default {
    data(){
      return{
        cartData:[]
      }
    },
    methods:{


      init() {
        func.ajaxPost(api.getCart, { userid: this.$store.state.userid } , res => {
          if (res.data.code === 200) {
            this.cartData = res.data.cart;
          }
        });
      },
      pay(){
        func.ajaxPost(api.pay, { order: this.cartData } , res => {
          if (res.data.code === 200) {
            this.$message.success('支付成功');
            this.$router.push('/usercenter');
          }
        });
      }
    },
    mounted(){
      this.init();
    },
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

  .row{
    margin-top: 10px;
  }
  .toleft{
    display: flex;
    justify-content: space-between;
  }

</style>
