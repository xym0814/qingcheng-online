<template>
  <div>
    <video-header />
    <div class="main-container">
      <div class="main-container-left">
        <div class="title-bar">
          <ul>
            <li>
              <!--              <a-tag-->
              <!--                color="#f50"-->
              <!--                v-for="(item, index) in modalValue.courseLabels"-->
              <!--                :key="index"-->
              <!--              >-->
              <!--                {{ item }}-->
              <!--              </a-tag>-->
              <a-tag color="#f50">{{ modalValue.courseType }}</a-tag>
              <a-tag color="#f50">{{ modalValue.learningDirection }}</a-tag>
              <a-tag color="#f50">{{ modalValue.courseTitle }}</a-tag>
            </li>
            <li style="margin-top: 5px">
              <span
                >{{ modalValue.courseName }} -
                {{ directory[nowPlayIndex]["coursewareName"] }}</span
              >
            </li>
            <li>
              <div class="subtitle-bar">
                <span
                  >课程发布时间：{{
                    modalValue.updateTime
                      ? modalValue.updateTime
                      : "暂无时间信息"
                  }}</span
                >
              </div>
            </li>
          </ul>
        </div>
        <div class="video-player" id="dplayer"></div>
        <!-- 移动端课程目录显示 -->
        <div class="course-source">
          <div class="mobile-right">
            <div class="teacher-introduce">
              <img
                style="height: 50px; margin-right: 5px"
                src="../../assets/all-courses/上课.png"
              />
              <span style="font-size: 20px; font-family: '黑体'; color: #1890ff"
                >青程云课堂</span
              >
            </div>
            <a-collapse :bordered="false">
              <a-collapse-panel key="1" header="课程目录">
                <ul class="mobile-directory">
                  <li
                    v-for="(item, index) in directory"
                    :key="index"
                    :class="
                      nowPlayIndex === index
                        ? 'directory-item selected-item'
                        : 'directory-item'
                    "
                  >
                    <a
                      @click="changeVideo(index)"
                      :title="`P${index + 1} ${item.coursewareName}`"
                    >
                      <div
                        :class="
                          nowPlayIndex === index
                            ? 'click-title selected-item'
                            : 'click-title'
                        "
                      >
                        <img
                          v-show="nowPlayIndex === index"
                          src="../../assets/playing.gif"
                          style="height: 14px; width: 14px; margin-right: 5px"
                        />{{ `P${index + 1} ${item.coursewareName}` }}
                      </div>
                    </a>
                  </li>
                </ul>
              </a-collapse-panel>
            </a-collapse>
          </div>
          <a-tabs default-active-key="1">
            <a-tab-pane key="1">
              <span slot="tab">
                <a-icon type="book" />
                课程介绍
              </span>
              <div class="introduction">
                <p>{{ modalValue.courseDescription }}</p>
              </div>
            </a-tab-pane>
            <a-tab-pane key="2">
              <span slot="tab">
                <a-icon type="message" />
                课程讨论
              </span>
              <comments :courseId="courseId" />
            </a-tab-pane>
            <a-tab-pane key="3">
              <span slot="tab">
                <a-icon type="file-zip" />
                资料下载
              </span>
              <sources :courseId="courseId" />
            </a-tab-pane>
            <a-tab-pane key="4">
              <span slot="tab">
                <a-icon type="file" />
                课程作业
              </span>
              <tasks :courseId="courseId" />
            </a-tab-pane>
            <a-tab-pane key="5">
              <span slot="tab">
                <a-icon type="file" />
                课程评分
              </span>
              <courseMark :courseId="courseId" />
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
      <div class="main-container-right">
        <div class="teacher-introduce">
          <img
            style="height: 50px; margin-right: 5px"
            src="../../assets/all-courses/上课.png"
          />
          <span style="font-size: 20px; font-family: '黑体'; color: #1890ff"
            >青程云课堂</span
          >
        </div>
        <div class="directory">
          <div class="directory-title">
            <a-icon type="unordered-list" />&nbsp;课程目录
          </div>
          <ul>
            <li
              v-for="(item, index) in directory"
              :key="index"
              :class="
                nowPlayIndex === index
                  ? 'directory-item selected-item'
                  : 'directory-item'
              "
            >
              <a
                @click="changeVideo(index)"
                :title="`P${index + 1} ${item.coursewareName}`"
              >
                <div
                  :class="
                    nowPlayIndex === index
                      ? 'click-title selected-item'
                      : 'click-title'
                  "
                >
                  <img
                    v-show="nowPlayIndex === index"
                    src="../../assets/playing.gif"
                    style="height: 14px; width: 14px; margin-right: 5px"
                  />{{ `P${index + 1} ${item.coursewareName}` }}
                </div>
              </a>
            </li>
          </ul>
        </div>
<!--        课程推荐模块 论文用-->
        <div class="tuijian_container">
          <div class="ziti">相似课程推荐</div>
          <div class="containerall">
            <img src="../../../src/assets/tuijian1.png"/>
            <div class="title">
              Python图像处理（Pillow模块）
            </div>
            <div class="price">
              ￥0.00
            </div>
          </div>
          <div class="containerall">
            <img src="../../../src/assets/tuijian2.png"/>
            <div class="title">
              Python数据分析与机器学习
            </div>
            <div class="price">
              ￥1,980.00
            </div>
          </div>
          <div class="containerall">
            <img src="../../../src/assets/tuijian3.png"/>
            <div class="title">
              Python趣味编程+乐高MINDSTORMS®头脑风暴EV3机器人
            </div>
            <div class="price">
              ￥0.00
            </div>
          </div>
          <div class="containerall">
            <img src="../../../src/assets/tuijian4.png"/>
            <div class="title">
              数据分析与工业蒸汽量预测（人工智能方向）
            </div>
            <div class="price">
              ￥0.00
            </div>
          </div>
        </div>
      </div>
    </div>
    <video-footer />
  </div>
</template>

<script>
import VideoHeader from "./components/VideoHeader";
import Comments from "./components/comments";
import Sources from "./components/sources";
import Tasks from "./components/tasks";
import VideoFooter from "./components/VideoFooter";
import CourseMark from "./components/courseMark";
import { getCourseDetail, getVideoDetail } from "../../api/course";
import DPlayer from "dplayer";

export default {
  name: "index",
  components: {
    VideoFooter,
    Sources,
    Tasks,
    Comments,
    VideoHeader,
    CourseMark
  },
  data() {
    return {
      title: "人工智能介绍",
      tagName: "人工智能",
      directory: [
        {
          id: null,
          coursewareName: "",
          fileUrl: "",
        },
      ],
      modalValue: {
        courseId: 0,
        courseCover: "",
        courseName: "",
        courseDifficulty: "",
        courseDescription: "",
        courseCrowd: "",
        courseStorage: "",
        coursePrice: 0,
        courseLabels: [],
        courseType: "",
        learningDirection: "",
        courseTitle: "",
      },
      urlList: {},
      nowPlayIndex: 0,
      dp: undefined,
    };
  },
  computed: {
    courseId() {
      return this.$route.params.id;
    },
  },
  mounted() {
    this.getViewDetail(this.courseId);
  },
  methods: {
    /* 查询该课程的详细信息 */
    getViewDetail(id) {
      getVideoDetail(id).then((response) => {
        const _this = this;
        if (response.code === 200) {
          console.log(response.data);
          this.modalValue = response.data.course;
          this.urlList = response.data.courseware;
          // this.directory = this.modalValue["coursewareList"];
          this.directory = this.urlList;
          this.setDplayer(this.directory[this.nowPlayIndex]["fileUrl"]);
          this.getLabels(id);
        } else if (response.code === 2001) {
          this.$info({
            title: response.msg,
            centered: true,
            okText: "前往报名",
            onOk() {
              _this.$router.push(`/course-detail/${id}`);
            },
          });
        } else {
          this.msgError(`Error:${response.code} ${response.msg}`);
        }
      });
    },
    /* 查询该课程的标签 */
    getLabels(id) {
      getCourseDetail(id).then((response) => {
        if (response.code === 200) {
          this.modalValue["courseLabels"] = response.data["courseLabels"];
        }
      });
    },
    changeVideo(index) {
      this.nowPlayIndex = index;
      this.setDplayer(this.directory[this.nowPlayIndex]["fileUrl"]);
    },
    setDplayer(url) {
      this.dp = new DPlayer({
        container: document.getElementById("dplayer"),
        video: {
          url: url,
        },
      });
    },
  },
};
</script>

<style scoped>
.tuijian_container {
  margin-top: 20px;
  width: 80%;
  /*height: 100px;*/
  padding: 5px;
  background-color: rgb(240, 240, 240);
}
.ziti{
  font-size: 13px;
  font-weight: bold;
}
.containerall {
  width: 100%;
  /*height: 100px;*/
  padding: 2px;
  margin-bottom: 10px;
  border: 1px solid #f5f1f1;
  border-radius: 5px;
  background-color: #fff;
}

.containerall img {
  width: 100%;
  height: 70px;
  border-radius: 5px;
}
.title {
  margin-top: 2px;
  width: 100%;
  height: 15px;
  font-size: 12px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /*background-color: #1be3d2;*/
}
.price {
  color: #f61c1c;
}
.main-container {
  width: 1140px;
  margin: auto;
  display: flex;
}

.main-container-left {
  flex: 1;
}

.main-container-right {
  width: 320px;
  padding-left: 30px;
}

.title-bar {
  padding: 20px 0;
  font-size: 18px;
  color: rgb(33, 33, 33);
}

.title-bar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.title-bar .subtitle-bar {
  margin: 5px 0;
  font-size: 12px;
  color: rgb(153, 153, 153);
}

.video-player {
  width: 100%;
  height: 466px;
  background-color: black;
}

.course-source {
  padding: 20px 0;
}

.mobile-right {
  display: none;
}

.teacher-introduce {
  display: flex;
  padding: 20px;
  justify-content: center;
  align-items: center;
}

.directory {
  padding: 10px 6px;
  background-color: rgb(244, 244, 244);
  /*background-color: #67c23a;*/
}

.directory ul {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 400px;
  overflow-y: auto;
}

.mobile-directory {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
}

.directory ul::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3.5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.directory ul::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: #9fa0a2;
}

.directory ul::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  background: #ededed;
  border-radius: 10px;
}

.directory-title {
  color: rgba(0, 0, 0, 0.85);
  padding-left: 10px;
}

.directory-item {
  padding: 0 10px;
  margin: 5px 0;
  height: 30px;
  line-height: 30px;
}

.click-title {
  font-size: 12px;
  color: rgb(33, 33, 33);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.directory-item:hover {
  background-color: white;
}

.selected-item {
  background-color: white;
  color: #1890ff;
}

.introduction {
  min-height: 300px;
  line-height: 24px;
}

@media screen and (max-width: 480px) {
  .main-container {
    width: 100%;
    display: block;
  }

  .main-container-right {
    display: none;
  }

  .title-bar {
    padding: 20px 5px;
  }

  .video-player {
    height: 275px;
  }

  .introduction {
    padding: 0 5px;
  }

  .course-source {
    padding-top: 0;
  }

  .mobile-right {
    display: block;
  }

  .teacher-introduce {
    padding: 10px;
  }
}
</style>
