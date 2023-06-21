<template>
  <div>
    <div class="select-title">
      <div class="title-left">
        <img
          class="title-image"
          src="../../assets/all-courses/course-title.png"
        />
        <img
          style="height: 12px"
          src="../../assets/all-courses/course-top.png"
        />
      </div>
      <div class="title-middle"></div>
      <el-button type="success" size="small" style="margin-right: 20px" @click="gotoTuiliu">我要开播</el-button>
      <div class="title-right">
        <a-input-search
          placeholder="搜索感兴趣的直播内容"
          enter-button="Search"
          v-model="inputSearch"
          @search="onSearch"
        />
      </div>
    </div>
    <div class="container">
      <div class="container_box" v-for="(item,index0) in tableData" :key="index0" @click="gotoDetail(item.streamName,index0)">
        <div class="container_box_img">
          <img :src="item.liveCover" />
<!--          <img :src="../../assets/touxiang.jpg"/>-->
        </div>
        <div :title="item.title" class="container_box_title">
          {{item.liveTitle}}
        </div>
        <div title="" class="container_box_author">
          {{item.nickName}}
        </div>
      </div>
    </div>
    <div class="data_pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pageNum"
        :page-sizes="[10]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
        background
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getTelecast } from "../../api/telecast";

export default {
  name: "index",
  data() {
    return {
      inputSearch: "",
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
        total: 0,
      },
      tableData: [
        // {
        //   pic:"../../assets/touxiang.jpg",
        //   title: "由 松鼠不是老鼠 创建的直播",
        //   author:"松鼠不是老鼠"
        // }
      ]
    };
  },
  mounted() {
    this.getTelecast();
  },
  methods: {
    //  获取直播列表
    getTelecast() {
      let query = {
        pageNum: 1,
        pageSize: 10
      };
      getTelecast(query).then( res=> {
        this.pageInfo.total = res.data.totalNum;
        this.tableData = res.data.onlineInfoList;
        console.log(this.tableData);
      })
    },
    // 跳转 直播详情
    gotoDetail(streamName,index) {
      // console.log("streamName是",streamName);
      console.log(index);
      this.$router.push({ path: "/telecastDetail", query: { streamName: streamName ,liveTitle: this.tableData[index].liveTitle
      ,nickName: this.tableData[index].nickName}});
    },
    gotoTuiliu(){
      this.$router.push("/pushFlow")
    },
    // 一页展示条数变化
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
    },
    // 当前页变化
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val;
      let query = {
        pageNum: this.pageInfo.pageNum,
        pageSize: 10
      };
      getTelecast(query).then( res=> {
        this.pageInfo.total = res.data.totalNum;
        this.tableData = res.data.onlineInfoList;
        console.log(this.tableData);
      })
    },
    // 按名称搜索
    onSearch(){

    }
  },
};
</script>

<style scoped>
.container {
  min-height: 450px;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  caret-color: rgba(0, 0, 0, 0)
  /*background-color: #eaeaea;*/
}
.container_box{
  width: 19%;
  height: 200px;
  margin-right: 1%;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #e6ebf5;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  overflow: hidden;
  color: #303133;

}
.container_box:hover {
  width: 20%;
  height: 210px;
  margin-left: -0.5%;
  margin-right: 0.5%;
  margin-top: -5px;
  margin-bottom: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  cursor: pointer;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}
.select-title {
  padding: 0 10px;
  min-height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.select-list {
  padding: 0 10px;
  background-image: linear-gradient(to top, #f2f4f6 0%, #eef1f5 100%);
  border-radius: 4px;
}
.title-image {
  height: 46px;
  margin-right: 8px;
}
.title-middle {
  flex: 1;
}
.title-right {
  width: 250px;
}
.data_pagination {
  margin: 30px 0 40px 0;
  text-align: center;
}
.container_box_img{
  width: 100%;
  height: 80%;
}
.container_box_img img{
  height: 100%;
  width: 100%;
}
.container_box_title{
  width: 100%;
  font-weight: bold;
  padding: 2px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.container_box_author{
  font-size: 10px;
  color: #949393;
  padding-left: 5px;
}
@media screen and (max-width: 480px) {
  .data_pagination {
    padding: 0 5% 0 5%;
    font-size: 12px;
    margin: 30px 0 40px 0;
    text-align: center;
  }
  .container_box{
    width: 46%;
  }
  .container_box:hover {
    width: 47%;
  }
}
</style>
