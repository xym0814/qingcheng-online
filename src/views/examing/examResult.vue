<template>
  <div class="container">

<!--    不需要 分数 注释部分-->

<!--    <div style="color: #2d78f5;margin-bottom: 10px">-->
<!--      <span style="font-size: 60px;font-weight: bold">{{score}}</span>-->
<!--      <span style="font-weight: bold;font-size: 25px">分</span>-->
<!--    </div>-->

    <div style="font-size: 16px;margin-bottom: 10px;font-weight: bold">感谢您的作答！</div>
<!--    <div style="font-size: 20px;color: #ff8000;font-weight: bold">该试卷还有主观题，主观题分数将在阅卷后累计到总成绩，请知晓！</div>-->
  </div>
</template>

<script>
import {getExamScore} from "../../api/examination";

export default {
  name: "examResult",
  data(){
    return {
      query:{},
      score: undefined
    }
  },
  mounted() {
    this.getIds();
    // 禁止浏览器后退
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL);
    });
  },
  methods: {
    getIds(){
      this.query = JSON.parse(decodeURIComponent(this.$route.params.data));
      console.log(this.query);
      getExamScore(this.query).then(res=>{
        this.score = res.rows[0].objectiveScore;
      })
    },
  }
};
</script>

<style scoped>
.container{
  height: 500px;
  /*line-height: 200px;*/
  padding-top: 150px;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  text-align: center;
  background-color: #f8f8f8;
}
</style>
