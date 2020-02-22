<template>

  <div class="body">
    <div class="title">
      {{courseData[0].coursename}}
    </div>
    <video v-bind:src="courseData[0].videourl" controls="controls" class="video">
      您的浏览器不支持 video 标签。
    </video>
  </div>

</template>


<script>
  import api from './../public/api.js'
  import func from './../public/fuc.js'

  export default {
    data(){
      return{
        courseData:[]
      }
    },
    methods:{


      init() {
        func.ajaxPost(api.courseDetail, { courseid: this.$route.params.id } , res => {
          if (res.data.code === 200) {
            this.courseData = res.data.course;
          }
        });
      },

    },
    mounted(){
      this.init();
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .body{
      width: 1500px;
      margin: 0 auto;
    }
    .video{
      height: 720px;
      width: 1200px;
      padding-left: 150px;
    }
    .title{
      display: flex;
      justify-content: center;
      font-weight: 500;
      font-size: x-large;
      padding: 10px 0px;
    }

</style>
