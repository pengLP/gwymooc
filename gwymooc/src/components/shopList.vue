<template>
  <div>
    <div class="title">
      <h3> 课 程 列 表 </h3>
    </div>
    <div class="sort">
      <el-row :gutter="10">
        <el-col :push="16" :span="5">
          <el-select v-model="value" placeholder="请选择" @change="handleCurrentChange(1)">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div class="body">
      <el-row :gutter="20" type="flex" justify="start" v-for="index in (Math.ceil(coursedata.length / 5))">
        <el-col :push="4" :span="3" v-for="cl in (coursedata.slice((index - 1) * 5, (index - 1) * 5 + 5))">
          <div @click="linkto(cl.courseid)">
            <div class="hotimg" :style="{backgroundImage:`url('${cl.imgurl}')`}"></div>
            <div class="content">
              <h3>{{ cl.coursename}}</h3>
              <div class="price">{{ cl.price }}元</div>
            </div>
          </div>

        </el-col>
      </el-row>
    </div>
    <div class="pagepick">
      <el-row :gutter="10">
        <el-col :push="16" :span="5">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="25"
            layout="total, prev, pager, next"
            :total="courselength">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>



</template>


<script>
  import api from './../public/api.js'
  import func from './../public/fuc.js'
  import axios from 'axios'
  import ElCol from "element-ui/packages/col/src/col";

  export default {

    components: {ElCol},
    data(){
      return{
        coursedata:[],
        courselength:[],
        currentPage1: '1',
        value:'1',
        options: [{
          value: '1',
          label: '全部'
        }, {
          value: '2',
          label: '行测'
        }, {
          value: '3',
          label: '申论'
        }, {
          value: '4',
          label: '面试'
        }, {
          value: '5',
          label: '其他'
        }]
      }
    },
    methods:{

      handleCurrentChange(val) {
        func.ajaxPost(api.coursePage, { pageid: val ,type: this.value } , res => {
          if (res.data.code === 200) {
            this.coursedata = res.data.course;
            this.courselength = res.data.len;
          }
        });
      },
      linkto(id){
        this.$router.push({name:'Course',params:{id:id}})
      }
    },
    mounted(){

      this.handleCurrentChange(1);
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .body{

    margin: 0px auto;
  }
  .sort{
    margin: 0px 0px 20px 0px;
  }
  .pagepick{
    margin-top: 20px;
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
