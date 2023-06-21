<template>
  <div class="container">
    <div class="left_container">
      <div class="type_container">
        <!--        单选题-->
        <div v-if="danxuan.length > 0">
          <div  class="type_title"><span>单选题</span>
            <span class="type_title_num">总{{ danxuan.length }}题/共{{danxuan.length * danxuanScore}}分</span>
          </div>
          <div class="type_btn">
            <div v-for="(item,index1) in danxuan" :key="index1">
              <div :class="newList[item.num].newOption === undefined?(questionNum === (item.num+1)?'question_btn_choosed':'question_btn'):'question_btn_visited' " :id="item.num" @click="gotoThisQuestion(item.num)">
                {{item.num + 1}}
              </div>
            </div>
          </div>
        </div>
        <!--        多选题-->
        <div v-if="duoxuan.length > 0">
          <div  class="type_title"><span>多选题</span>
            <span class="type_title_num">总{{ duoxuan.length }}题/共{{duoxuan.length * duoxuanScore}}分</span>
          </div>
          <div class="type_btn">
            <div v-for="(item,index2) in duoxuan" :key="index2">
              <div :class="newList[item.num].optionArray.length === 0 ?(questionNum === (item.num+1)?'question_btn_choosed':'question_btn'):'question_btn_visited' " :id="item.num" @click="gotoThisQuestion(item.num)">
                {{item.num + 1}}
              </div>
            </div>
          </div>
        </div>
        <!--        填空题-->
        <div v-if="tiankong.length > 0">
          <div  class="type_title"><span>填空题</span>
            <span class="type_title_num">总{{ tiankong.length }}题/共{{tiankong.length * tiankongScore}}分</span>
          </div>
          <div class="type_btn">
            <div v-for="(item,index3) in tiankong" :key="index3">
              <div :class="newList[item.num].newOption === undefined?(questionNum === (item.num+1)?'question_btn_choosed':'question_btn'):'question_btn_visited' " :id="item.num" @click="gotoThisQuestion(item.num)">
                {{item.num + 1}}
              </div>
            </div>
          </div>
        </div>
        <!--        简答题-->
        <div v-if="jianda.length > 0">
          <div  class="type_title"><span>简答题</span>
            <span class="type_title_num">总{{ jianda.length }}题/共{{jianda.length * jiandaScore}}分</span>
          </div>
          <div class="type_btn">
            <div v-for="(item,index4) in jianda" :key="index4">
              <div :class="newList[item.num].newOption === undefined?(questionNum === (item.num+1)?'question_btn_choosed':'question_btn'):'question_btn_visited' " :id="item.num" @click="gotoThisQuestion(item.num)">
                {{item.num + 1}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="center_container">
      <!--      单选题-->
      <div v-if="tempQuestion.questionType === 1">
        <div class="center_question_type">
          单选题&nbsp;&nbsp;&nbsp;(本题分值: {{nowQuestionScore}}分)
        </div>
        <el-row class="center_question_title">
          <div class="center_question_title_left">
            <div class="circle_box">
              <div class="circle_num">{{questionNum}}</div>
            </div>
          </div>
          <div class="center_question_title_right">
          <span class="center_question_stem"
          >{{tempQuestion.question}}
          </span>
            <div v-if="tempQuestion.questionPictureList != []">
              <div class="picture_container" v-for="(item,index001) in tempQuestion.questionPictureList" :key="index001">
                <img :src="item" />
                <!--              <img src="../../assets/newsBg.jpg" />-->
                <!--              <img src="../../assets/newsBg.jpg" />-->
              </div>
            </div>
          </div>
        </el-row>
        <div>
          <div v-if="this.optionOrder ==='A' ">
            <div class="center_question_options" v-for="(item,index3) in JSON.parse(tempQuestion.questionOptions)" :key="index3">
              <button plain :class="newList[questionNum-1].newOption === item.option?'option_box_choosed':'option_box'"  @click="chooseOption(item.option)" >
                <div class="option_btn" v-if="index3 === 0">A<span>{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 1">B<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 2">C<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 3">D<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 4">E<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 5">F<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 6">G<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 7">H<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 9">I<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 10">G<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 11">K<span style="">{{item.context}}</span></div>
              </button>
            </div>
          </div>
          <div v-if="this.optionOrder ==='B' ">
            <div class="center_question_options" v-for="(item,index3) in JSON.parse(tempQuestion.questionOptionsB)" :key="index3">
              <button plain :class="newList[questionNum-1].newOption === item.option?'option_box_choosed':'option_box'"  @click="chooseOption(item.option)" >
                <div class="option_btn" v-if="index3 === 0">A<span>{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 1">B<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 2">C<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 3">D<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 4">E<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 5">F<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 6">G<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 7">H<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 9">I<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 10">G<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 11">K<span style="">{{item.context}}</span></div>
              </button>
            </div>
          </div>
          <div v-if="this.optionOrder ==='C' ">
            <div class="center_question_options" v-for="(item,index3) in JSON.parse(tempQuestion.questionOptionsC)" :key="index3">
              <button plain :class="newList[questionNum-1].newOption === item.option?'option_box_choosed':'option_box'"  @click="chooseOption(item.option)" >
                <div class="option_btn" v-if="index3 === 0">A<span>{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 1">B<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 2">C<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 3">D<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 4">E<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 5">F<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 6">G<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 7">H<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 9">I<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 10">G<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 11">K<span style="">{{item.context}}</span></div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!--      多选题-->
      <div v-if="tempQuestion.questionType === 2">
        <div class="center_question_type">
          多选题&nbsp;&nbsp;&nbsp;(本题分值: {{tempQuestion.score}}分)
        </div>
        <el-row class="center_question_title">
          <div class="center_question_title_left">
            <div class="circle_box">
              <div class="circle_num">{{questionNum}}</div>
            </div>
          </div>
          <div class="center_question_title_right">
          <span class="center_question_stem"
          >{{tempQuestion.question}}
          </span>
            <div v-if="tempQuestion.questionPictureList != []">
              <div class="picture_container" v-for="(item,index001) in tempQuestion.questionPictureList" :key="index001">
                <img :src="item" />
              </div>
            </div>
          </div>
        </el-row>
        <div>
          <div v-if="this.optionOrder ==='A' ">
            <div class="center_question_options" v-for="(item,index3) in JSON.parse(tempQuestion.questionOptions)" :key="index3">
              <button plain :class="newList[questionNum-1].optionArray.includes(item.option)?'option_box_choosed':'option_box'"  @click="duoxuanChooseOption(item.option)" >
                <div class="option_btn" v-if="index3 === 0">A<span>{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 1">B<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 2">C<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 3">D<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 4">E<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 5">F<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 6">G<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 7">H<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 9">I<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 10">G<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 11">K<span style="">{{item.context}}</span></div>
              </button>
            </div>
          </div>
          <div v-if="this.optionOrder ==='B' ">
            <div class="center_question_options" v-for="(item,index3) in JSON.parse(tempQuestion.questionOptions)" :key="index3">
              <button plain :class="newList[questionNum-1].optionArray.includes(item.option)?'option_box_choosed':'option_box'"  @click="duoxuanChooseOption(item.option)" >
                <div class="option_btn" v-if="index3 === 0">A<span>{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 1">B<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 2">C<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 3">D<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 4">E<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 5">F<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 6">G<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 7">H<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 9">I<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 10">G<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 11">K<span style="">{{item.context}}</span></div>
              </button>
            </div>
          </div>
          <div v-if="this.optionOrder ==='C' ">
            <div class="center_question_options" v-for="(item,index3) in JSON.parse(tempQuestion.questionOptions)" :key="index3">
              <button plain :class="newList[questionNum-1].optionArray.includes(item.option)?'option_box_choosed':'option_box'"  @click="duoxuanChooseOption(item.option)" >
                <div class="option_btn" v-if="index3 === 0">A<span>{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 1">B<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 2">C<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 3">D<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 4">E<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 5">F<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 6">G<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 7">H<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 9">I<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 10">G<span style="">{{item.context}}</span></div>
                <div class="option_btn" v-else-if="index3 === 11">K<span style="">{{item.context}}</span></div>
              </button>
            </div>
          </div>
          <el-button type="primary"  style="margin-top: 20px" @click="saveDuoxuanAnswer">保 存</el-button>
        </div>
      </div>
      <!--      填空题-->
      <div v-if="tempQuestion.questionType === 8">
        <div class="center_question_type">
          填空题&nbsp;&nbsp;&nbsp;(本题分值: {{tempQuestion.score}}分)
        </div>
        <el-row class="center_question_title">
          <div class="center_question_title_left">
            <div class="circle_box">
              <div class="circle_num">{{questionNum}}</div>
            </div>
          </div>
          <div class="center_question_title_right">
          <span class="center_question_stem"
          >{{tempQuestion.question}}
          </span>
            <div v-if="tempQuestion.questionPictureList != []">
              <div class="picture_container" v-for="(item,index001) in tempQuestion.questionPictureList" :key="index001">
                <img :src="item" />
                <!--              <img src="../../assets/newsBg.jpg" />-->
                <!--              <img src="../../assets/newsBg.jpg" />-->
              </div>
            </div>
          </div>
        </el-row>
        <div class="center_question_options">
          <el-input
            type="textarea"
            :rows="10"
            placeholder="请输入内容"
            v-model="newList[questionNum - 1].newOption">
          </el-input>
        </div>

        <el-button type="primary"  style="margin-top: 20px" @click="saveJiandaAnswer">保 存</el-button>
      </div>
      <!--      简答题-->
      <div v-if="tempQuestion.questionType === 3">
        <div class="center_question_type">
          简答题&nbsp;&nbsp;&nbsp;(本题分值: {{tempQuestion.score}}分)
        </div>
        <el-row class="center_question_title">
          <div class="center_question_title_left">
            <div class="circle_box">
              <div class="circle_num">{{questionNum}}</div>
            </div>
          </div>
          <div class="center_question_title_right">
          <span class="center_question_stem"
          >{{tempQuestion.question}}
          </span>
            <div v-if="tempQuestion.questionPictureList != []">
              <div class="picture_container" v-for="(item,index001) in tempQuestion.questionPictureList" :key="index001">
                <img :src="item" />
                <!--              <img src="../../assets/newsBg.jpg" />-->
                <!--              <img src="../../assets/newsBg.jpg" />-->
              </div>
            </div>
          </div>

        </el-row>
        <div class="center_question_options">
          <el-input
            type="textarea"
            :rows="10"
            placeholder="请输入内容"
            v-model="newList[questionNum - 1].newOption">
          </el-input>
        </div>

        <el-button type="primary"  style="margin-top: 20px" @click="saveJiandaAnswer">保 存</el-button>
      </div>
    </div>
    <div class="right_container">
      <div class="surplus_time">
        <span style="font-weight: bold">剩余时间</span>
        <h3 id="countDown">{{countDownMsg}}</h3>
      </div>
      <div class="submit_btn">
        <el-button
          type="warning"
          style="background-color: #ffb900; border-color: #ffb900"
          @click="submitBtn"
        >提交试卷</el-button
        >
      </div>
      <div class="submit_btn" style="border: none">
        <div>
          <el-button type="primary" size="small" icon="el-icon-back" @click="upQuestion" :disabled="upQuestionBtn"
          >上一题</el-button
          >
        </div>
        <div style="margin-top: 10px">
          <el-button type="primary" size="small" icon="el-icon-right" @click="downQuestion" :disabled="downQuestionBtn"
          >下一题</el-button
          >
        </div>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="submitBtnVisible"
      top="25vh"
      width="30%"
      >
     <div style="height: 20px;vertical-align: center">
       <div class="gantanhao"></div>
       <div v-if="leftNum!= 0" class="message">您还有{{leftNum}}道题未作答，确认要交卷吗？</div>
       <div v-else class="message">确认要交卷吗？</div>
     </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="submitBtnVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { getExamination, getPaper, getQuestion, examFirstPost, examAnswerPost, examAnswerPut, submitPut, scorePost, getQuestionDisorder, getOptionDisorder } from "../../api/examination";

// import MarkdownEditor from '@/components/MarkdownEditor'


export default {
  name: "examing",
  // components: { MarkdownEditor },
  data() {
    return {
      textarea: '',
      examId: null,
      paperId: null,
      questionCount: null,
      tempQuestion: {},
      questionTypeList: [],
      countDown: null,
      countDownMsg: null,
      danxuan:[],
      danxuanScore: undefined,
      duoxuan:[],
      duoxuanScore: undefined,
      tiankong:[],
      tiankongScore: undefined,
      jianda: [],
      jiandaScore: undefined,
      questionNum: 1,
      upQuestionBtn: true,
      downQuestionBtn: false,
      newList: [],
      isFullScreen: false,
      timeDate: 0,
      submitBtnVisible: false,
      recordId: undefined,
      times: undefined,
      nowQuestionScore: undefined,
      examScore: undefined,
      questionOrder: "A",
      optionOrder: "A",
      questionOrderList: ""
    };
  },
  computed: {
    leftNum() {
      let num = 0;
      this.newList.forEach( (item) => {
        if(item.newOption === undefined) {
          num++;
        }
      });
      return num;
    },
  },
  mounted() {
    this.getPaper();
    this.requestFullscreen();
    // 屏蔽F12
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

    // 多选题 ——提交答案
    saveDuoxuanAnswer() {
      let str = '';
      this.newList[this.questionNum-1].optionArray.forEach((item) => {
        str += item;
      })
      // console.log(str);
      if (this.newList[this.questionNum-1].submitFlag === 0) {
        let data = {
          examId: this.examId,
          paperId: this.paperId,
          recordId: this.recordId,
          studentId: this.$store.state.userInfo.userId,
          questionId:this.newList[this.questionNum-1].id,
          status: 0,
          questionScore: this.newList[this.questionNum-1].score,
          userAnswer: str
        };
        console.log(data);
        examAnswerPost(JSON.stringify(data)).then(res=>{
          console.log('第一次提交结果',res);
          // this.recordId = res.data;
          this.newList[this.questionNum-1].putId = res.data;
          console.log("putId",this.newList[this.questionNum-1].putId);
          this.newList[this.questionNum-1].submitFlag = 1;
          // 跳转到下一题
          if (this.questionNum < this.newList.length) {
            this.gotoThisQuestion(this.questionNum);
          }
        });
      } else {
        console.log(this.newList[this.questionNum-1]);
        let data1={
          id: this.newList[this.questionNum-1].putId,
          userAnswer: str
        };
        console.log(data1);
        examAnswerPut(JSON.stringify(data1)).then(res=>{
          console.log('修改答案提交结果',res);
          // 跳转到下一题
          if (this.questionNum < this.newList.length) {
            this.gotoThisQuestion(this.questionNum);
          }
          // this.recordId = res.data;
        });
      }
    },
    // 多选题确定答案
    duoxuanChooseOption(option){
      console.log("this.option",option);
      if( this.newList[this.questionNum-1].optionArray.includes(option) ) {
        this.newList[this.questionNum-1].optionArray.splice(this.newList[this.questionNum-1].optionArray.indexOf(option),1)
      } else {
        this.newList[this.questionNum-1].optionArray.push(option);
        this.newList[this.questionNum-1].optionArray.sort();
        console.log(this.newList[this.questionNum-1].optionArray);
      }
      console.log(this.newList[this.questionNum-1].optionArray);
    },

    // 获取考试试卷
    getPaper() {
      this.examId = this.$route.params.id;
      console.log("当前考试对应的考试id", this.examId);
      getExamination({ id: this.examId }).then((res) => {
        this.paperId = res.rows[0].paperId;
        this.countDown = res.rows[0].examTime * 60;
        this.timeCountDown();
        // console.log(this.countDown);
        console.log("当前考试对应的试卷id", this.paperId);
        // 进入考试先提交试卷记录表
        // console.log("用户id",this.$store.state.userInfo.userId);
        let data = {
          examId: this.examId,
          paperId: this.paperId,
          studentId: this.$store.state.userInfo.userId,
        };
        console.log(data);
        examFirstPost(data).then(res=> {
          console.log('进入考试先提交试卷记录表',res);
          this.recordId = res.data;
          // this.times = res
        });
        // 获取试题和选项乱序结果
        let query0 = {
          examId: this.examId,
          userId: this.$store.state.userInfo.userId,
        };
        getOptionDisorder(query0).then(res=>{
          this.optionOrder = res.msg;
          console.log("this.optionOrder",this.optionOrder);
        });
        getQuestionDisorder(query0).then(res=>{
          this.questionOrder = res.msg;
          console.log("this.questionOrder",this.questionOrder);
          // 获取试题
          getPaper({ id: this.paperId }).then((res) => {
            this.questionTypeList = JSON.parse(res.data.questionScore);
            console.log("this.questionTypeList",this.questionTypeList);
            if (this.questionOrder === 'A'){
              this.questionOrderList = res.data.questionList.split(',');
              console.log("this.questionOrderList",this.questionOrderList);
            } else if(this.questionOrder === 'B') {
              this.questionOrderList = res.data.questionList2.split(',');
              console.log("this.questionOrderList",this.questionOrderList);
            } else if (this.questionOrder === 'C') {
              this.questionOrderList = res.data.questionList3.split(',');
              console.log("this.questionOrderList",this.questionOrderList);
            }
            let num = 0;
            this.questionTypeList.forEach((item1) => {
              item1.questionId.forEach((item2) => {
                let listItem = {
                  // id: Number(this.questionOrderList[num]),
                  id: item2,
                  num: num,
                  // 试题记录修改所需id
                  putId: undefined,
                  type: item1.type,
                  score: item1.thisEveryTotal,
                  submitFlag: 0,
                  newOption: undefined,
                  optionArray: []
                };
                num ++;
                // console.log("每一个listItem",listItem);
                this.newList.push(listItem);
              });
            });
            console.log("this.newList",this.newList);
            this.newList.filter( item =>{
              if(item.type === "单选题") {
                this.danxuan.push(item);
                this.danxuanScore = item.score;
              } else if (item.type === "多选题") {
                this.duoxuan.push(item);
                this.duoxuanScore = item.score;
              } else if (item.type === "填空题") {
                  this.tiankong.push(item);
                  this.tiankongScore = item.score;
              } else if (item.type === "简答题") {
                this.jianda.push(item);
                this.jiandaScore = item.score;
              }
            });
            getQuestion({id:this.newList[0].id}).then( res => {
              console.log("res.data",res.data);
              this.tempQuestion = res.data;
              this.nowQuestionScore = this.newList[0].score;
            });
          });
        });
      });
    },
    //  左侧按钮 跳转题目
    gotoThisQuestion(num) {
      console.log("左侧点击题号index",num);
      this.questionNum = num + 1;
      this.nowQuestionScore = this.newList[num].score;
      console.log("该题的id是",this.newList[num].id);
      getQuestion({id: this.newList[num].id}).then( res => {
        // console.log(res.data);
        this.tempQuestion = res.data;
        console.log("this.tempQuestion",this.tempQuestion);
      });
      if (num === 0) {
        this.upQuestionBtn = true;
        this.downQuestionBtn = false;
      } else if (num === (this.newList.length - 1)) {
        this.upQuestionBtn = false;
        this.downQuestionBtn = true;
      } else {
        this.upQuestionBtn = false;
        this.downQuestionBtn = false;
      }
    },
    //  单选——选中试题 选项 并提交选中答案
    chooseOption(option){
      console.log("this.recordId",this.recordId);
      this.newList[this.questionNum-1].newOption = option;
      if (this.newList[this.questionNum-1].submitFlag === 0) {
        let data = {
          examId: this.examId,
          paperId: this.paperId,
          recordId: this.recordId,
          studentId: this.$store.state.userInfo.userId,
          questionId:this.newList[this.questionNum-1].id,
          status: 0,
          questionScore: this.newList[this.questionNum-1].score,
          userAnswer: this.newList[this.questionNum-1].newOption
        };
        console.log("data",data);
        examAnswerPost(JSON.stringify(data)).then(res=>{
          console.log('第一次提交结果',res);
          // this.recordId = res.data;
          this.tijiaoId = res.data;
          this.newList[this.questionNum-1].putId = res.data;
          this.newList[this.questionNum-1].submitFlag = 1;
          // 跳转到下一题
          if (this.questionNum < this.newList.length) {
            this.gotoThisQuestion(this.questionNum);
          }
        });
        // this.newList[this.questionNum-1].putId = this.tijiaoId;
        // console.log( "putId",this.newList[this.questionNum-1].putId);

      } else {
        console.log( "putId",this.newList[this.questionNum-1].putId);
        let data1={
          id: this.newList[this.questionNum-1].putId,
          userAnswer: this.newList[this.questionNum-1].newOption
        };
        console.log("data1",data1);
        examAnswerPut(JSON.stringify(data1)).then(res=>{
          console.log('修改答案提交结果',res);
          // 跳转到下一题
          if (this.questionNum < this.newList.length) {
            this.gotoThisQuestion(this.questionNum);
          }
          // this.recordId = res.data;
        });
      }
    },
    //  简答题——提交答案
    saveJiandaAnswer(){
      if (this.newList[this.questionNum-1].submitFlag === 0) {
        let data = {
          examId: this.examId,
          paperId: this.paperId,
          recordId: this.recordId,
          studentId: this.$store.state.userInfo.userId,
          questionId:this.newList[this.questionNum-1].id,
          status: 0,
          questionScore: this.newList[this.questionNum-1].score,
          userAnswer: this.newList[this.questionNum-1].newOption
        };
        console.log(data);
        examAnswerPost(JSON.stringify(data)).then(res=>{
          console.log('第一次提交结果',res);
          // this.recordId = res.data;
          this.newList[this.questionNum-1].putId = res.data;
          console.log("putId",this.newList[this.questionNum-1].putId);
          this.newList[this.questionNum-1].submitFlag = 1;
          // 跳转到下一题
          if (this.questionNum < this.newList.length) {
            this.gotoThisQuestion(this.questionNum);
          }
        });
      } else {
        console.log(this.newList[this.questionNum-1]);
        let data1={
          id: this.newList[this.questionNum-1].putId,
          userAnswer: this.newList[this.questionNum-1].newOption
        };
        console.log(data1);
        examAnswerPut(JSON.stringify(data1)).then(res=>{
          console.log('修改答案提交结果',res);
          // 跳转到下一题
          if (this.questionNum < this.newList.length) {
            this.gotoThisQuestion(this.questionNum);
          }
          // this.recordId = res.data;
        });
      }
    },
    // 确认提交按钮
    submitBtn(){
      this.submitBtnVisible = true;
    },
    //  提交试卷
    confirmSubmit(){
      //  提交按钮确认提交考试
      let query = {
        recordId: this.recordId
      };
      console.log(query);
      submitPut(query).then(res=> {
        console.log('提交试卷最后提交试卷记录表',res);
        // 计算本次本次考试得分
        let data = {
          id: this.recordId,
          examId: this.examId,
          paperId: this.paperId,
          userId: this.$store.state.userInfo.userId
        };
        console.log(data);
        scorePost(data).then(res=>{
          console.log("本次本人考试客观题总分",res);
          // console.log(data);
          data = encodeURIComponent(JSON.stringify(data));
          this.$router.push(`/examResult/${data}`);
          // this.$store.state
          // this.$router.push("/examResult");
        });
      });
    },
    //  上一题按钮
    upQuestion() {
      // console.log(this.questionNum);
      if (this.questionNum > 2) {
        getQuestion({id: this.newList[this.questionNum - 2].id}).then( res => {
          this.questionNum = this.questionNum-1;
          this.tempQuestion = res.data;
          this.upQuestionBtn = false;
          this.downQuestionBtn = false;
        });
      } else if (this.questionNum === 2) {
        getQuestion({id: this.newList[0].id}).then( res => {
          this.tempQuestion = res.data;
          this.upQuestionBtn = true;
          this.downQuestionBtn = false;
          this.questionNum = 1;
        });
      } else {
        this.questionNum = 1;
        this.upQuestionBtn = true;
        this.downQuestionBtn = false;
      }
    },
    // 下一题按钮
    downQuestion() {
      // console.log(this.questionNum);
      if (this.questionNum < (this.newList.length - 1)) {
        getQuestion({id: this.newList[this.questionNum].id}).then( res => {
          this.tempQuestion = res.data;
          this.downQuestionBtn = false;
          this.upQuestionBtn = false;
          this.questionNum = this.questionNum+1;
        });
      } else if (this.questionNum === (this.newList.length - 1)) {
        getQuestion({id: this.newList[this.questionNum].id}).then( res => {
          this.tempQuestion = res.data;
          this.downQuestionBtn = true;
          this.upQuestionBtn = false;
          this.questionNum = this.newList.length;
        });
      } else {
        this.questionNum = this.newList.length;
        this.downQuestionBtn = true;
        this.upQuestionBtn = false;
      }
    },
    // 倒计时
    timeCountDown() {
      // console.log("time");
      setInterval(() => {
        if (this.countDown >= 0) {
          let minutes = Math.floor(this.countDown / 60);
          let seconds = Math.floor(this.countDown % 60);
          this.countDownMsg = minutes + "分" + seconds + "秒";
          // document.getElementById("conntDown").innerHTML = msg;
          // if (this.countDown == 5 * 60){
          //   alert("还剩5分钟")
          // };
          --this.countDown;
        } else {
          // clearInterval(timer);
          // alert("时间到，结束!");
        }
      },1000)
    },
    // 进入时网页全屏
    requestFullscreen() {
      const docElm = document.documentElement;
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
        this.isFullScreen = true;
      } else {
        this.isFullScreen = false;
      }
    },
    //  填空题——提交答案
    saveTiankongAnswer(){
      if (this.newList[this.questionNum-1].submitFlag === 0) {
        let data = {
          examId: this.examId,
          paperId: this.paperId,
          recordId: this.recordId,
          studentId: this.$store.state.userInfo.userId,
          questionId:this.newList[this.questionNum-1].id,
          status: 0,
          questionScore: this.newList[this.questionNum-1].score,
          userAnswer: this.newList[this.questionNum-1].newOption
        };
        console.log(data);
        examAnswerPost(JSON.stringify(data)).then(res=>{
          console.log('第一次提交结果',res);
          // this.recordId = res.data;
          this.newList[this.questionNum-1].putId = res.data;
          console.log("putId",this.newList[this.questionNum-1].putId);
          this.newList[this.questionNum-1].submitFlag = 1;
          // 跳转到下一题
          if (this.questionNum < this.newList.length) {
            this.gotoThisQuestion(this.questionNum);
          }
        });
      } else {
        console.log(this.newList[this.questionNum-1]);
        let data1={
          id: this.newList[this.questionNum-1].putId,
          userAnswer: this.newList[this.questionNum-1].newOption
        };
        console.log(data1);
        examAnswerPut(JSON.stringify(data1)).then(res=>{
          console.log('修改答案提交结果',res);
          // 跳转到下一题
          if (this.questionNum < this.newList.length) {
            this.gotoThisQuestion(this.questionNum);
          }
          // this.recordId = res.data;
        });
      }
    },
  },
};
</script>
<style scoped>
.container {
  width: 100vw;
  height: 100vh;
}
.left_container {
  float: left;
  width: 18vw;
  height: 96vh;
  margin: 2vh 1vw 1vh 1vw;
  padding: 10px;
  box-shadow: 2px 2px 12px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background-color: white;
}
.center_container {
  float: left;
  width: 66vw;
  height: 96vh;
  margin-top: 2vh;
  margin-bottom: 1vh;
  padding: 20px;
  box-shadow: 2px 2px 12px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background-color: white;
}
.right_container {
  float: left;
  width: 12vw;
  height: 96vh;
  margin: 2vh 1vw 1vh 1vw;
  box-shadow: 2px 2px 12px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background-color: white;
}
.type_container {
  /*height: 100px;*/
  width: 100%;
  margin-bottom: 10px;
  /*background-color: #67c23a;*/
}
.type_title {
  font-weight: bold;
  padding: 10px;
  /*background-color: #2d78f5;*/
}
.type_title_num {
  font-size: 10px;
  font-weight: bold;
  float: right;
}
.type_btn {
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  /*background-color: #6a11cb;*/
}
.question_btn {
  /*display: inline-block;*/
  width: 30px;
  height: 20px;
  line-height: 20px;
  background: rgb(238, 238, 238);
  border-radius: 2px;
  font-size: 6px;
  font-weight: 700;
  margin: 5px 5px 10px 5px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
  text-align: center;
  caret-color: rgba(0, 0, 0, 0);
  color: rgb(82, 86, 98);
}
.question_btn_visited {
  color: white;
  background-color: #409eff;
  caret-color: rgba(0, 0, 0, 0);
  width: 30px;
  height: 20px;
  line-height: 20px;
  border-radius: 2px;
  font-size: 6px;
  font-weight: 700;
  margin: 5px 5px 10px 5px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
  text-align: center;
}
.question_btn_choosed{
  color: white;
  background-color: #ffb900;
  width: 30px;
  caret-color: rgba(0, 0, 0, 0);
  height: 20px;
  line-height: 20px;
  border-radius: 2px;
  font-size: 6px;
  font-weight: 700;
  margin: 5px 5px 10px 5px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
  text-align: center;
}

.center_question_type {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  padding-left: 10px;
  font-size: 16px;
  background-color: #eeeeee;
}
.center_question_title {
  width: 100%;
  display: flex;
  vertical-align: middle;
  margin-top: 5px;
  /*padding-left: 10px;*/
  font-size: 15px;
  /*background-color: #1b42d4;*/
}
.center_question_title_left {
  width: 35px;
  float: left;
  /*background-color: #1be3d2;*/
}
.center_question_title_right {
  /*float: left;*/
  width: calc(100% - 40px);
  margin-left: 10px;
  /*background-color: #f66698;*/
}
.picture_container {
  /*float: left;*/
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 10px;
  /*margin-left: 10px;*/
  /*background-color: #8bd692;*/
}
.picture_container img {
  width: 48%;
  margin-right: 2%;
  margin-bottom: 10px;
  height: 200px;
}
.circle_box {
  /*display: inline-block;*/
  display: flex;
  width: 30px;
  height: 30px;
  margin-top: 5px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  background-color: #5893fa;
}
.circle_num {
  display: inline-block;
  /*margin-top: -10px;*/
  color: white;
}
.center_question_stem {
  display: inline-block;
  margin-left: 5px;
  /*background-color: #6a11cb;*/
}
.center_question_options {
  width: 100%;
  display: inline-block;
  margin-top: 20px;
  /*background-color: #2d78f5;*/
}
.option_box{
  width: 100%;
  display: inline-block;
  white-space:normal;
  text-align: left;
  /*background-color: #2d78f5;*/
  line-height: 1;
  background-color: white;
  cursor: pointer;
  border: 1px solid #dedada;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.option_btn{
  display: inline-block;
  color: #2d78f5;
  font-weight: bold;
  font-size: 14px;
  margin-right: 10px;
  /*background-color: #67c23a;*/
}
.option_btn span{
  margin-left: 10px;
  color: #727479;
}
.option_box_choosed{
  line-height: 1;
  background-color: white;
  cursor: pointer;
  width: 100%;
  display: inline-block;
  white-space:normal;
  text-align: left;
  border: 1px solid #2d78f5;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}

.surplus_time {
  width: 80%;
  margin: 20px 10%;
  padding: 10px;
  border-bottom: 1px solid #aba7a7;
  text-align: center;
  /*background-color: #67c23a;*/
}
.surplus_time h3 {
  font-weight: bold;
  color: red;
}
.submit_btn {
  width: 80%;
  margin: 0 10% 20px 10%;
  padding-bottom: 20px;
  border-bottom: 1px solid #aba7a7;
  text-align: center;
}
.gantanhao{
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 10px;
  background: url("../../assets/gantanhao.png") no-repeat #ffb900 center;
  background-size:100%;
  vertical-align: middle;
}
.message{
  display: inline-block;
  height: 20px;
  line-height: 20px;
  vertical-align: middle;
  /*background-color: #67c23a;*/
}
</style>
