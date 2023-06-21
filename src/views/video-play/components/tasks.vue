<template>
  <el-row class="taskBox_container">
    <div v-if="taskList.length === 0">该课程还未发布作业</div>
    <div v-else>
      <div
        class="task_box"
        v-for="(item, index) in taskList"
        :key="index"
        @click="goTaskDetail(item)"
      >
        {{ item.homeworkId + " _ " + item.homeworkTitle }}
      </div>
      <el-pagination
        class="block"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!--    作业详情dialog-->
    <el-dialog
      :title="detailList.homeworkTitle"
      :visible.sync="detailDialogVisible"
      width="30%"
      style="font-weight: bold"
    >
      <!--      提交作业dialog-->
      <el-dialog
        title="提交作业"
        :visible.sync="uploadDialogVisible"
        width="30%"
        append-to-body
      >
        <!--        <div style="font-weight: bold; color: black;margin-bottom: 10px">提交作业名称：</div>-->
        <!--        <el-input v-model="addTaskForm.searchValue" size="mini"></el-input>-->
        <div style="font-weight: bold; color: black; margin: 10px 0">
          <span>上传pdf文件：</span>
          <el-upload
            style="display: inline-block"
            action="http://upload.qiniup.com/"
            :data="{ token: this.qiniuToken }"
            :before-upload="beforeAvatarUpload0"
            :on-success="handleAvatorsuccess0"
            :on-progress="progressAvatarUpload0"
            :file-list="addFileList0"
            ref="addUpload"
          >
            <el-button type="primary" size="mini">上传pdf报告</el-button>
          </el-upload>
        </div>
        <div style="font-weight: bold; color: black; margin-bottom: 10px">
          <span>上传附件：</span>
          <el-upload
            style="display: inline-block"
            action="http://upload.qiniup.com/"
            :data="{ token: this.qiniuToken }"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatorsuccess"
            :on-progress="progressAvatarUpload"
            :file-list="addFileList"
            ref="addUpload"
          >
            <el-button type="primary" size="mini">上传附件</el-button>
          </el-upload>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="success" @click="addMyTask">确认提交</el-button>
        </span>
      </el-dialog>

      <div>
        <span style="font-weight: bold; color: black">作业描述:</span>
        <div class="task_description">{{ detailList.homeworkDescription }}</div>
      </div>
      <div style="margin: 10px 0">
        <span style="font-weight: bold; color: black">截止时间:</span>
        <span> {{ detailList.endTime }}</span>
      </div>
      <div style="margin: 10px 0">
        <span style="font-weight: bold; color: black">作业附件:</span>
        <span v-if="detailList.attachmentUrl === ''">暂无附件</span>
        <div v-else style="display: inline-block">
          <el-button
            type="primary"
            size="mini"
            style="margin-left: 20px"
            @click="downLoadAttachment"
            >下载附件</el-button
          >
        </div>
      </div>
      <div style="font-weight: bold; color: black">我的作业:</div>
      <div class="task_description">
        <div style="text-align: center; margin: 10px">
          <el-button
            type="danger"
            icon="el-icon-upload"
            round
            :disabled="this.flag===1"
            @click="uploadDialogVisible = true"
            >提交作业</el-button
          >
        </div>
        <div style="margin-top: 10px">
          <div
            v-if="myTaskList.length === 0"
            style="text-align: center; font-size: 10px"
          >
            同学，你还未参与本次随堂作业，快去提交吧
          </div>
          <div v-else>
            <div style="font-size: 10px;">共 {{taskTotal}} 次提交记录</div>
            <el-row v-for="(item, index) in myTaskList" :key="index">
              <div v-if="item.delFlag === '0'" class="myTask_detail">
                {{ item.createTime }}<span style="color: #05be08">提交</span>
                <div style="margin-top: 10px">
                  <el-button
                    v-if="item.reportUrl !== null"
                    type="success"
                    size="mini"
                    @click="downPdf(item.reportUrl)"
                  >下载pdf报告</el-button
                  >
                  <el-button v-else type="info" size="mini"
                  >未上传pdf报告</el-button
                  >
                  <el-button
                    v-if="item.attachmentUrl !== null"
                    type="success"
                    size="mini"
                    @click="downAttachment(item.attachmentUrl)"
                  >下载附件</el-button
                  >
                  <el-button v-else type="info" size="mini">未上传附件</el-button>
                  <el-button
                    type="danger"
                    size="mini"
                    @click="deleteMyTask(item.id)"
                  >撤销并重新提交</el-button
                  >
                </div>
              </div>
              <div v-else class="myTask_detail">
                {{ item.updateTime }}<span style="color: red">撤销</span>
                <div style="margin-top: 10px">
                  <el-button
                    v-if="item.reportUrl !== null"
                    type="success"
                    size="mini"
                    @click="downPdf(item.reportUrl)"
                  >下载pdf报告</el-button
                  >
                  <el-button v-else type="info" size="mini"
                  >未上传pdf报告</el-button
                  >
                  <el-button
                    v-if="item.attachmentUrl !== null"
                    type="success"
                    size="mini"
                    @click="downAttachment(item.attachmentUrl)"
                  >下载附件</el-button
                  >
                  <el-button v-else type="info" size="mini">未上传附件</el-button>
                  <!--                <el-button type="danger" size="mini" disabled >撤销并重新提交</el-button>-->
                </div>
              </div>
            </el-row>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="info" size="small" @click="detailClose"
          >关 闭</el-button
        >
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import {
  getAllTask,
  addMyTask,
  getMyTask,
  deleteMyTask,
} from "../../../api/course";

export default {
  name: "tasks",
  props: ["courseId"],
  data() {
    return {
      tasks: "",
      //  所有作业列表
      taskList: [],
      //  作业详情dialog
      detailDialogVisible: false,
      //  作业详情页
      detailList: [],
      //
      flag: 0,
      //  跳转的课程的homeworkId
      homeworkId: null,
      //  用户提交过的作业列表
      myTaskList: [],
      //  用户提交过的作业总数
      taskTotal: null,
      //  提交作业dialog
      uploadDialogVisible: false,
      //  提交作业文件
      addTaskForm: {
        // searchValue: '',
        reportUrl: null,
        attachmentUrl: null,
      },
      //  获取七牛云 token
      qiniuToken: "",
      //  pdf报告
      addFileList0: [],
      //  附件
      addFileList: [],
      //  分页
      total: 0,
      pageNum: 1,
      pageSize: 10,
    };
  },
  computed: {
  },
  mounted() {
    this.getAllTask();
    this.getQiniuToken();
  },
  methods: {
    //  获取课程对应作业列表
    getAllTask() {
      let query = {
        courseId: this.courseId,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      getAllTask(query).then((res) => {
        this.taskList = res.rows;
        this.total = res.total;
        console.log(this.taskList);
      });
    },
    //  跳转作业详情dialog
    goTaskDetail(item) {
      this.detailList = [];
      this.flag = 0;
      this.taskTotal = 0;
      this.detailDialogVisible = true;
      this.detailList = item;
      this.homeworkId = item.homeworkId;
      let query = {
        homeworkId: item.homeworkId,
      };
      // console.log(query);
      getMyTask(query).then((res) => {
        this.myTaskList = res.rows;
        this.taskTotal = res.total;
        this.myTaskList.forEach(item => {
          if (item.delFlag === "0") {
            this.flag++;
          }
        });
        // console.log(this.flag);
        // console.log(this.myTaskList);
      });
    },
    //  获取我的作业列表
    getMyTask() {
      console.log(this.flag);
      this.flag = 0;
      this.taskTotal = 0;
      let query = {
        homeworkId: this.homeworkId,
      };
      getMyTask(query).then((res) => {
        this.myTaskList = res.rows;
        this.taskTotal = res.total;
        this.myTaskList.forEach(item => {
          if (item.delFlag === "0") {
            this.flag++;
          }
        });
      });
    },
    //  作业详情——下载pdf报告
    downPdf(url) {
      window.open(url);
    },
    //  作业详情——下载附件
    downAttachment(url) {
      window.open(url);
    },
    //  用户撤回自己的作业
    deleteMyTask(id) {
      console.log(id);
      deleteMyTask(id).then((res) => {
        console.log(res);
        if (res.code === 200) {
          // this.$forceUpdate();
          this.getMyTask();
        }
      });
    },
    //  下载附件
    downLoadAttachment() {
      window.open(this.detailList.attachmentUrl);
    },
    //   提交我的作业文件
    addMyTask() {
      this.addTaskForm.homeworkId = this.detailList.homeworkId;
      console.log(this.addTaskForm);
      addMyTask(JSON.stringify(this.addTaskForm)).then((res) => {
        if (res.code === 200) {
          this.addFileList0 = [];
          this.addFileList = [];
          this.addTaskForm = {};
          this.$message.success("提交作业成功");
          this.uploadDialogVisible = false;
          this.getMyTask();
        } else if (res.code === 500) {
          this.addFileList0 = [];
          this.addFileList = [];
          this.addTaskForm = {};
          this.$message.error(res.msg);
          this.uploadDialogVisible = false;
        }
      });
    },
    //  关闭详情dialog
    detailClose() {
      // console.log(this.homeworkId);
      this.homeworkId = null;
      this.detailDialogVisible = false;
    },
    //  分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getAllTask();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getAllTask();
    },
    // 获取七牛云的token
    getQiniuToken() {
      this.axios({
        method: "get",
        url: "https://www.zhongkeruitong.top/towerImg/cms/filesystem/getToken",
      }).then((res) => {
        console.log("七牛云token", res);
        if (res.status !== 200) {
          return this.$message.error("获取七牛token失败！");
        } else {
          this.qiniuToken = res.data.uptoken;
          // console.log('七牛token',this.qiniuToken)
        }
      });
    },
    // 上传七牛云之前的钩子函数。即上传之前的文件处理函数
    beforeAvatarUpload0() {},
    // 文件上传七牛云成功后的处理函数
    handleAvatorsuccess0(res) {
      console.log("文件成功函数", res);
      this.addTaskForm.reportUrl = `https://qiniu.zhongkeruitong.top/${res.key}`;
      console.log(this.addTaskForm.reportUrl);
    },
    // 文件上传时的钩子
    progressAvatarUpload0() {
      this.querenFlag = true;
    },
    // 上传七牛云之前的钩子函数。即上传之前的文件处理函数
    beforeAvatarUpload() {},
    // 文件上传七牛云成功后的处理函数
    handleAvatorsuccess(res) {
      console.log("文件成功函数", res);
      this.addTaskForm.attachmentUrl = `https://qiniu.zhongkeruitong.top/${res.key}`;
      console.log(this.addTaskForm.attachmentUrl);
    },
    // 文件上传时的钩子
    progressAvatarUpload() {
      this.querenFlag = true;
    },
  },
};
</script>

<style scoped>
.taskBox_container {
  padding: 5px;
  background-color: white;
}
.task_box {
  width: 100%;
  height: 50px;
  padding-left: 10px;
  line-height: 50px;
  vertical-align: middle;
  margin-bottom: 5px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid #e6ebf5;
}
.task_box:hover {
  font-weight: bold;
  color: #5b5b5d;
  cursor: pointer;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid #e6ebf5;
}
.block {
}
.task_description {
  width: 100%;
  font-size: 14px;
  padding: 10px;
  margin-top: 10px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid #e6ebf5;
}
.myTask_detail {
  width: 100%;
  padding: 15px 10px;
  margin-bottom: 10px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid #e6ebf5;
}
</style>
