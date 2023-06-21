<template>
  <div>
    <a-page-header @back="() => this.$router.push('telecast')">
      <span slot="title" style="font-weight: normal">直播列表</span>
    </a-page-header>
    <div class="container">
      <div class="container_left">
        <div class="container_header">
          <div
            style="
              width: 60px;
              height: 100%;
              padding: 5px;
              display: inline-block;
            "
          >
            <img src="../../assets/zhibo.png" />
          </div>
          <div style="display: inline-block; height: 60px; line-height: 60px">
            <span class="container_header_title"
              >{{liveTitle}}</span
            >
            <span class="container_header_author">创建者: {{nickName}}</span>
          </div>
        </div>
        <!--        <div class="video-player" id="dplayer"></div>-->
        <div id="J_prismPlayer" class="video-player"></div>
      </div>
      <div class="container_right"></div>
    </div>
  </div>
</template>

<script>
import DPlayer from "dplayer";
import { createPullAddress } from "../../api/telecast";

export default {
  name: "telecastDetail",
  data() {
    return {
      liveTitle: "",
      nickName: "",
      streamName: "",
      screenWidth: null
    };
  },
  watch: {
    screenWidth: function (n, o) {
      if (n <= 480) {
        console.log('屏幕宽度小于480了')
        this.setAliTwo();
      } else {
        console.log('屏幕宽度大于480')
      }
    }
  },
  mounted() {
    this.setAli();
    this.resize();
  },
  methods: {
    // 阿里云web 播放器文档   https://help.aliyun.com/document_detail/125574.html
    setAli() {
      this.info = this.$route.query.info;
      this.streamName = this.$route.query.streamName;
      this.liveTitle = this.$route.query.liveTitle;
      this.nickName = this.$route.query.nickName;
      // console.log(this.streamName);
      // console.log(this.liveTitle);
      // console.log(this.nickName);
      createPullAddress({streamName :this.streamName}).then( res=>{
        this.streamName = res.msg;
        var player = new Aliplayer(
          {
            id: "J_prismPlayer",
            source: this.streamName, //播放地址，使用超低延时直播（RTS）地址，协议是artc://。
            isLive: true, //是否为直播播放。
            width: "100%",
            height: "500px",
            autoplay: true,
            showBuffer: true,
            playsinline:true,
            enableSystemMenu: true,
            skinLayout: [
              {name: "bigPlayButton", align: "blabs", x: 30, y: 80},
              {name: "errorDisplay", align: "tlabs", x: 0, y: 0},
              {name: "infoDisplay", align: "cc"},
              {
                name: "controlBar", align: "blabs", x: 0, y: 0,
                children: [
                  {name:"liveDisplay", align:"tlabs", x: 15, y:6},
                  {name:"fullScreenButton", align:"tr", x:10, y: 10},
                  {name:"subtitle", align:"tr",x:15, y:12},
                  {name:"setting", align:"tr",x:15, y:12},
                  {name:"volume", align:"tr", x:5, y:10},
                  {name:"playButton", align:"tl", x:0, y:10},
                ]
              }
            ]
            // rtsVersion: 'x.x.x', // 可以手动指定RTS SDK版本
          },
          function (player) {
            player.play();
            console.log("The player is created.");
          }
        );
      })
    },
    setAliTwo() {
      this.info = this.$route.query.info;
      this.streamName = this.$route.query.streamName;
      this.liveTitle = this.$route.query.liveTitle;
      this.nickName = this.$route.query.nickName;
      // console.log(this.streamName);
      // console.log(this.liveTitle);
      // console.log(this.nickName);
      createPullAddress({streamName :this.streamName}).then( res=>{
        this.streamName = res.msg;
        var player = new Aliplayer(
          {
            id: "J_prismPlayer",
            source: this.streamName, //播放地址，使用超低延时直播（RTS）地址，协议是artc://。
            isLive: true, //是否为直播播放。
            width: "100%",
            height: "250px",
            autoplay: true,
            showBuffer: true,
            playsinline:true,
            enableSystemMenu: true,
            skinLayout: [
              {name: "bigPlayButton", align: "blabs", x: 30, y: 80},
              {name: "errorDisplay", align: "tlabs", x: 0, y: 0},
              {name: "infoDisplay", align: "cc"},
              {
                name: "controlBar", align: "blabs", x: 0, y: 0,
                children: [
                  {name:"liveDisplay", align:"tlabs", x: 15, y:6},
                  {name:"fullScreenButton", align:"tr", x:10, y: 10},
                  {name:"subtitle", align:"tr",x:15, y:12},
                  {name:"setting", align:"tr",x:15, y:12},
                  {name:"volume", align:"tr", x:5, y:10},
                  {name:"playButton", align:"tl", x:0, y:10},
                ]
              }
            ]
            // rtsVersion: 'x.x.x', // 可以手动指定RTS SDK版本
          },
          function (player) {
            player.play();
            console.log("The player is created.");
          }
        );
      })
    },
    setDplayer(url) {
      this.dp = new DPlayer({
        container: document.getElementById("dplayer"),
        video: {
          url: url,
        },
      });
    },
    resize(){
      //获取屏幕尺寸
      this.screenWidth = document.body.clientWidth
      window.onresize = () => {
        console.log('高度');
        //屏幕尺寸变化
        return (() => {
          this.screenWidth = document.body.clientWidth
        })()
      }
    }
  },
};
</script>

<style scoped>
.container {
  /*width: 1140px;*/
  width: 100%;
  margin: auto;
  display: flex;
  margin: 20px 0;
  /*background-color: #2d78f5;*/
}
.container_left {
  flex: 1;
}
.container_header {
  height: 60px;
  border-radius: 10px;
  margin-bottom: 5px;
  background-color: #eeefed;
}
.container_header img {
  width: 100%;
  height: 100%;
}
.container_header_title {
  font-size: 20px;
  font-weight: bold;
  color: #4f4f4f;
  margin-left: 10px;
}
.container_header_author {
  /*display: block;*/
  font-size: 10px;
  margin-left: 150px;
}
.video-player {
  width: 100%;
  height: 500px;
  background-color: black;
}
.container_right {
  width: 320px;
  padding-left: 30px;
}
@media screen and (max-width: 480px) {
  .video-player{
    width: 100%;
    height: 250px;
    background-color: black;
  }
}
</style>
