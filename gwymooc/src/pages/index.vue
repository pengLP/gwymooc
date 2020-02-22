<template>

  <div>
    <!--<div>-->
      <!--<userlist></userlist>-->
    <!--</div>-->
    <div class="bcg1">
      <carousel></carousel>
    </div>
    <div class="bcg2">
      <hotlist></hotlist>
    </div>
  </div>

</template>


<script>
    import userlist from './../components/userList.vue'
    import carousel from './../components/carousel.vue'
    import hotlist from   './../components/hotList.vue'
export default {
      components:{
        userlist,
        carousel,
        hotlist
      }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .bcg1{
      box-shadow: 0 2px 4px 0 rgba(7,17,27,.06);
      padding-bottom: 10px;
    }
    .bcg2{
      box-shadow: 0 2px 4px 0 rgba(7,17,27,.06);
      padding-bottom: 10px;
    }

</style>
