<template>
  <div class="content">
    <el-tabs v-model="activeName" @tab-click="handleClick">
<!--      <el-tab-pane label="题库练习" name="first">-->
<!--       -->
<!--      </el-tab-pane>-->
      <div class="data_time">
        <div class="data_input">
          <el-input
            v-model="inputSearch"
            size="mini"
            placeholder="搜索题库名称"
            prefix-icon="el-icon-search"
          ></el-input>
        </div>
        <!--          <div class="data_picker">-->
        <!--            <el-date-picker-->
        <!--              v-model="dateValue"-->
        <!--              size="mini"-->
        <!--              type="datetimerange"-->
        <!--              range-separator="至"-->
        <!--              start-placeholder="开始日期"-->
        <!--              end-placeholder="结束日期"-->
        <!--            >-->
        <!--            </el-date-picker>-->
        <!--          </div>-->
      </div>
      <div class="data_table">
        <el-table
          :data="examList"
          stripe
          style="width: 100%"
          :header-cell-style="{
              background: '#ccc',
              color: 'rgb(25, 36, 55)',
            }"
        >
          <el-table-column label="题库名称" width="180" align="center">
            <template slot-scope="scope">
                <span class="data_examName" @click="gotoExam(scope.row.id)">{{
                    scope.row.examName
                  }}</span>
            </template>
          </el-table-column>
          <el-table-column label="题库分类">

          </el-table-column>
          <el-table-column
            prop="examTime"
            label="时长(分钟)"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column label="总分" align="center" prop="totalScore">
            <!--              <span>100</span>-->
          </el-table-column>
          <el-table-column label="及格分" align="center" prop="lowestScore">
            <!--              <span>60</span>-->
          </el-table-column>
          <el-table-column prop="isReview" label="人工阅卷" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.isReview == 0 ? "否" : "是" }}</span>
            </template>
          </el-table-column>
          <!--            <el-table-column label="开放时间" align="center" show-overflow-tooltip>-->
          <!--              <template slot-scope="scope">-->
          <!--                <span>{{-->
          <!--                    scope.row.startTime.substring(0, 10) +-->
          <!--                    " " +-->
          <!--                    scope.row.startTime.substring(11, 19) +-->
          <!--                    " " + "至" + " " +-->
          <!--                    scope.row.endTime.substring(0, 10) +-->
          <!--                    " " +-->
          <!--                    scope.row.endTime.substring(11, 19)-->
          <!--                  }}</span>-->
          <!--              </template>-->
          <!--            </el-table-column>-->
          <!--            <el-table-column label="考试状态" align="center">-->
          <!--              <template slot-scope="scope">-->
          <!--                &lt;!&ndash;                <span>{{new Date() > new Date(scope.row.endTime)}}</span>&ndash;&gt;-->
          <!--                &lt;!&ndash;                <span>{{new Date()}}</span>&ndash;&gt;-->
          <!--                &lt;!&ndash;                <span>{{new Date(scope.row.endTime)}}</span>&ndash;&gt;-->
          <!--                <el-tag v-if="new Date() < new Date(scope.row.startTime)">未开始</el-tag>-->
          <!--                <div v-else>-->
          <!--                  <el-tag v-if="new Date() > new Date(scope.row.endTime)" type="danger"-->
          <!--                  >已结束</el-tag>-->
          <!--                  <el-tag v-else type="success">进行中</el-tag>-->
          <!--                </div>-->
          <!--              </template>-->
          <!--            </el-table-column>-->
        </el-table>
      </div>
      <div class="data_pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.pageNum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          background
        >
        </el-pagination>
      </div>
    </el-tabs>
  </div>
</template>

<script>
import { getExamination } from "../../api/examination";
export default {
  name: "index",
  data() {
    return {
      activeName: "first",
      inputSearch: null,
      dateValue: null,
      examList: [],
      examState: null,
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
        total: 0,
      },
    };
  },
  computed: {
    examId() {
      return this.$route.params.id;
    },
  },
  mounted() {
    // 获取考试列表
    this.getExamList();
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
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 获取考试列表
    getExamList() {
      console.log(this.$store.state.userInfo.deptId);
      const query = {
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize,
        deptId: this.$store.state.userInfo.deptId
      };
      console.log(query);
      getExamination(query).then((res) => {
        console.log(res);
        this.examList = res.rows;
        this.pageInfo.total = res.total;
      });
    },
    // 一页展示条数变化
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.getExamList();
    },
    // 当前页变化
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val;
      this.getExamList();
    },
    // 前往考试详情页面
    gotoExam(id) {
      console.log("考试id",id);
      this.$store.commit("setExamId",id);
      this.$router.push(`/examination-detail/${id}`);
    },
  },
};
</script>

<style scoped>
.content {
  background: #f0f6fc;
  padding: 20px;
  margin: 30px;
}
.data_time {
  display: flex;
  margin: 15px 0;
}
.data_table {
  margin-top: 27px;
}
.data_input {
  width: 200px;
  margin-right: 10px;
}
.data_picker {
  width: 400px;
}
.data_pagination {
  margin: 30px 0 40px 0;
  text-align: center;
}
.data_examName {
  color: #1890ff;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
}
.data_examName:hover {
  color: orange;
}
</style>

