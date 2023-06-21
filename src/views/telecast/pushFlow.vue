<template>
  <div>
    <a-page-header @back="() => this.$router.push('telecast')">
      <span slot="title" style="font-weight: normal">直播列表</span>
    </a-page-header>
    <el-row class="input_container">
      <h1 style="font-weight: bold">我要 开播</h1>
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="直播 名称" prop="name" class="input_length">
            <el-input v-model="ruleForm.name" size="small"></el-input>
          </el-form-item>
          <el-form-item label="直播 封面" prop="name">
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
              <el-button type="primary" size="small">上传 封面</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="ruleForm.pic !=='' " style="padding-left: 100px">
        <el-input :disabled="true" v-model="ruleForm.pic" size="small" style="margin: 20px 0"></el-input>
        <img :src="ruleForm.pic" class="picture" alt=""/>
      </div>
      <div style="padding-left: 100px">
        <el-button type="success" size="small" @click="createPushAddress">生成推流地址</el-button>
        <el-button type="primary" size="small" @click="updatePushAddress">重新生成推流地址</el-button>
        <el-input :disabled="true" v-model="tuiliuAddress" size="small" style="margin-top: 20px"></el-input>
      </div>
    </el-row>
    <el-row class="input_container" style="margin: 20px 0">
      <h1 style="font-weight: bold">开播 教程</h1>
      <h1>超低延时直播推流</h1>
      <p>超低延时直播服务推荐使用RTMP格式推流，本文以使用OBS工具推RTMP流为例。若您希望使用RTS格式推流，需要集成推流SDK，请参见使用直播推流SDK推流。</p>
      <p>1. 下载并安装OBS推流工具。下载地址，请参见<a href="https://obsproject.com/download?spm=a2c4g.11186623.0.0.144d14b8et5MEQ" target="_blank" style="color: #faa803;font-weight: bold">OBS Studio</a>。</p>
      <p>2. 运行OBS推流工具。</p>
      <p>3. 在菜单栏中选择<span>文件 > 设置。</span></p>
      <p>4. 在设置页面选择<span>推流</span>，配置信息如下所示:</p>
      <img src="../../assets/jiaocheng01.jpg"/>
      <img src="../../assets/jiaocheng02.jpg"/>
      <p>5. <span>可选：</span>使用OBS推流，在推流软件的输出中，设置以下视频编码参数值，去除B帧。</p>
      <p class="text_indent">◦ 输出模式：高级</p>
      <p class="text_indent">◦ 关键帧间隔（秒，0=自动）：1</p>
      <p class="text_indent">◦ CPU使用预设（高=较少的CPU占用）：veryfast</p>
      <p class="text_indent">◦ 配置（Profile）：baseline</p>
      <p class="text_indent">◦ 微调（Tune）：zerolatency</p>
      <img src="../../assets/jiaocheng03.png"/>
      <p>6. 在OBS主界面来源区域添加推流源后，单击<span>开始推流</span>。</p>
      <img src="../../assets/jiaocheng04.jpg"/>
    </el-row>
  </div>
</template>

<script>
import { createPushAddress, updatePushAddress } from "../../api/telecast";

export default {
  name: "pushFlow",
  data() {
    return {
      ruleForm:{
        name:'',
        pic: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入直播名称', trigger: 'blur' },
        ],
        pic: [
          { required: true, message: '请上传直播封面', trigger: 'blur' },
        ],
      },
      tuiliuAddress: '推流地址',
      qiniuToken: '',
      //  封面
      addFileList: [],
    }
  },
  mounted() {
    this.getQiniuToken();
    this.getPushAddress();
  },
  methods: {
    // 获取上次 推流信息
    getPushAddress(){
      createPushAddress({}).then( res=> {
        if(res.code == 200) {
          this.ruleForm.name = res.data.liveTitle;
          this.ruleForm.pic = res.data.liveCover;
          this.tuiliuAddress = res.data.pushUrl;
          console.log( this.tuiliuAddress);
        }
      })
    },
    // 推流
    createPushAddress(){
      let data ={
        liveCover: this.ruleForm.pic,
        liveTitle: this.ruleForm.name
      };
      createPushAddress(JSON.stringify(data)).then( res=> {
        if(res.code == 200) {
          this.tuiliuAddress = res.data.pushUrl;
          console.log( this.tuiliuAddress);
        }
      })
    },
    // 重新 推流
    updatePushAddress(){
      if( this.ruleForm.pic !=='' && this.ruleForm.name !== '') {
        let data ={
          liveCover: this.ruleForm.pic,
          liveTitle: this.ruleForm.name
        };
        updatePushAddress(JSON.stringify(data)).then( res=> {
          if(res.code == 200) {
            this.tuiliuAddress = res.data.pushUrl;
            console.log( this.tuiliuAddress);
          }
        })
      } else {
        this.$message.error('直播名称 或 直播封面 不能为空!')
      };
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
    beforeAvatarUpload() {},
    // 文件上传七牛云成功后的处理函数
    handleAvatorsuccess(res) {
      console.log("文件成功函数", res);
      this.ruleForm.pic = `https://qiniu.zhongkeruitong.top/${res.key}`;
      console.log(this.ruleForm.pic);
    },
    // 文件上传时的钩子
    progressAvatarUpload() {},
  }
};
</script>

<style scoped>
.input_container{
  /*height: 300px;*/
  border-radius: 10px;
  padding: 10px;
  background-color: #fafafa;
}
 p span {
   font-weight: bold;
 }
 .text_indent {
   text-indent: 2em;
 }
 .picture{
   width: 200px;
   height: 150px;
   margin-bottom: 10px;
   /*background-color: #05be08;*/
 }
.picture img{
  width: 100%;
  height: 100%;
}
.input_length{
  width: 50%
}
@media screen and (max-width: 480px) {
  .input_container img{
    width: 100%;
    height: 100%;
  }
  .input_length{
    width: 80%
  }
}
</style>
