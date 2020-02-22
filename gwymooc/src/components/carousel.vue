<template>
  <el-carousel class="carsouel" height="400px">
    <el-carousel-item v-for="item in 4" :key="item">
      <img :src="slides[item-1].slideimg" @click="linkto(slides[item-1].courseid)">
    </el-carousel-item>
  </el-carousel>
</template>
<script>
  import api from './../public/api.js'
  import func from './../public/fuc.js'

  export default {

    data () {
      return {
        slides: []
      }
    },
    mounted() {
      this.init();
    },
    methods:{
      init(){
        func.ajaxGet(api.carouselList+ '?' +Date.now(), res => {
          this.slides = res.data.slides;
        });
      },
      linkto(id){
        this.$router.push({name:'Course',params:{id:id}})
      }
    }
  }
</script>

<style>
  .carsouel{
    width: 1000px;
    margin: 0 auto;
  }
  .el-carousel__item img{
    background: repeat center;
  }

</style>
