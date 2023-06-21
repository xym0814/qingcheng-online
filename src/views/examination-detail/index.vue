<template>
  <div class="content">

<!--    调试时注释部分-->
    <div v-if="this.times === false">
      <div>
        <el-empty description="考试次数超限，总共只有1次考试机会！"></el-empty>
      </div>
    </div>
    <div v-else>
      <div v-if="new Date() < new Date(tableData.startTime) || new Date() > new Date(tableData.endTime) ">
        <el-empty description="考试未开始或已结束!"></el-empty>
      </div>
      <div v-else>

        <h3>考试信息</h3>
        <div class="examTable">
          <div class="exam">
            <div>考试名称</div>
            <div>{{ tableData.examName }}</div>
          </div>
          <div class="exam">
            <div>考试总分</div>
            <div>{{ tableData.totalScore }}</div>
          </div>
          <div class="exam">
            <div>及格分数</div>
            <div>{{ tableData.lowestScore }}</div>
          </div>
          <div class="exam">
            <div>考试时长</div>
            <div>{{ tableData.examTime }}</div>
          </div>
          <div class="exam">
            <div>考试类型</div>
            <div>
              正式考试
            </div>
          </div>
          <div class="exam">
            <div>注意事项</div>
            <div class="examWarning">{{ tableData.preContext }}</div>
          </div>
          <div class="exam" v-if="tableData.examPassword !=='' ">
            <div>输入密码</div>
<!--            <div class="examWarning">{{ tableData.preContext }}</div>-->
            <el-input v-model="examPasswordInput" style="width: 200px" size="small" placeholder="请输入密码"></el-input>
          </div>
        </div>
        <div class="examButton">
          <el-button @click="goBack">返回</el-button>
          <el-button type="primary" @click="goExaming">开始考试</el-button>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import { getExamination, getExamTimes } from "../../api/examination";
export default {
  name: "examination-detail",
  data() {
    return {
      examId: null,
      paperId: undefined,
      times: true,
      examPasswordInput: '',
      tableData: {},
    };
  },
  computed: {},
  mounted() {
    // 根据Id获取考试详情
    this.getExamInfo();
    // document.onkeydown = function (event) {
    //   if (event && event.keyCode === 123) {
    //     event.returnValue = false;
    //     // e.keyCode = 0   //去掉也可以的，倘若要写，则需要setter 以及 getter配合使用，不配合，会报错
    //     return false;
    //   }
    // };
    // document.oncontextmenu = function () {
    //   return false;
    // };
  },
  methods: {
    // 根据Id获取考试详情
    getExamInfo() {
      this.examId = this.$route.params.id;
      // console.log(this.examId);
      // this.examId = this.$store.state.examId;
      // console.log(this.examId);
      let query = {
        id: this.examId,
      };
      getExamination(query).then((res) => {
        this.tableData = res.rows[0];
        this.paperId = this.tableData.paperId;
        console.log(this.tableData);
        // console.log("this.paperId",this.paperId);
        // 查询考试次数
        let query1 = {
          examId: this.examId,
          paperId: this.paperId,
          studentId: this.$store.state.userInfo.userId,
        };
        console.log(query1);
        getExamTimes(query1).then( res => {
          this.times = res.data;
          console.log(this.times);
        });
      });
    },
    // 返回上一级
    goBack() {
      this.examId = null;
      this.$router.push("/examination");
    },
    // 前往考试页面
    goExaming() {
      // this.$store.commit("setExamingId", this.examId);
      console.log("原密码是",this.tableData.examPassword);
      if (this.examPasswordInput === this.tableData.examPassword) {
        this.$router.push(`/examing/${this.examId}`);
      } else {
        this.$message.error("密码输入错误，请重新输入！");
      };
    },
  },
};
</script>
<style scoped>
.content {
  font-size: 17px;
  background: #f0f6fc;
  width: 100%;
  padding: 20px;
  margin: 30px;
}
.exam {
  display: flex;
  padding: 10px;
}
.exam div:nth-child(1) {
  color: #909399;
  margin-right: 30px;
}
.exam div:nth-child(2) {
}

.examWarning {
  color: rgb(255, 51, 51);
}
.examButton {
  margin-top: 20px;
  margin-left: 7px;
}
</style>
