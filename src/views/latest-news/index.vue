<template>
  <div class="container">
    <div class="news_header"></div>
    <div class="news_title">
      <div class="news_title_icon"></div>
      <span style="font-weight: bold;font-size: 14px">通知公告</span>
      <div class="box_line"></div>
      <div class="list">
        <ul>
          <li class="list_item" ><span @click="goto('newsOne')">中国国际数字经济博览会首届“A-STPM未来科技挑战赛”</span>
          <h5 style="float: right">2021-08-09</h5></li>
          <li class="list_item" ><span @click="goto('newsTwo')">关于举办首届泰安市青少年创意编程与智能设计大赛通知<h5 style="float: right">2020-05-10</h5></span></li>
          <li class="list_item" ><span @click="goto('newsThree')">2019中科院ACME博弈算法挑战赛通知<h5 style="float: right">2019-09-10</h5></span></li>

        </ul>
      </div>
      <div class="block">
        <el-pagination
          size="small"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="3">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// import NewsOne from "./news/newsOne";

export default {
  name: "index",
  // components: { NewsOne },
  methods: {
    // this.$router.push(`/competition-detail/${id}`);\
    goto(name) {
      this.$router.push(`/${name}`);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style scoped>
.container{
  height: 80vh;
  /*background-color: #1be3d2;*/
}
.news_header{
  width: 100%;
  height: 300px;
  background-image: url("../../assets/newsBg.jpg");
  background-size: 100%;
}

.news_title{
  margin-top: 10px;
  height: 2rem;
  line-height: 2rem;
}

.news_title_icon{
  float: left;
  width: 1rem;
  height: 2rem;
  margin-right: 10px;
  background-color: #fbab7e;
  background-image: linear-gradient(62deg,#fbab7e,#f7ce68);
}

.box_line{
  width: 100%;
  margin-top: 10px;
  border-bottom: #1be3d2 1px solid;
}
.list_item{
  font-size: 15px;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 0.01rem dashed #ccc;
  position: relative;
}
.list_item span:hover {
  cursor: pointer;
  color: #2d78f5;
  border-bottom: 0.01rem #2d78f5 solid;
}
.block{
  position: absolute;
  /*background-color: #67c23a;*/
  left: 45%;
}
</style>
