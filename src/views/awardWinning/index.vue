<template>
  <div>
    <div class="award_header"></div>
    <div style="margin-top: 20px">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="证书编号" prop="number">
          <el-input v-model="ruleForm.number"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" icon="el-icon-search" type="primary" @click="search('ruleForm')">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-top: 20px;margin-bottom: 20px">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名"
         >
        </el-table-column>
        <el-table-column
          prop="school"
          label="学校">
        </el-table-column>
        <el-table-column
          prop="itemName"
          label="比赛名称"
         >
        </el-table-column>
        <el-table-column
          prop="groupName"
          label="组别">
        </el-table-column>
        <el-table-column
          prop="teacher"
          label="指导教师">
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="address"-->
<!--          label="手机号码">-->
<!--        </el-table-column>-->
        <el-table-column
          prop="award"
          label="奖项">
        </el-table-column>
        <el-table-column
          label="证书编号" >
          <template slot-scope="scope">
            {{"SD"+scope.row.number}}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-size="100"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getAirAward} from "../../api/competition";
export default {
  name: "index",
  data() {
    return {
      ruleForm: {
        name: "",
        number: ""
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        number: [
          { required: true, message: '请输入证书编号', trigger: 'blur' },
        ],
      },
      tableData:[],
      total: 0
    }
  },
  methods : {
    search(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let query = {
            name:this.ruleForm.name,
            number: this.ruleForm.number
          }
          getAirAward(query).then( (res) => {
            if (res.total === 1) {
              this.total = res.total;
              this.tableData = res.rows;
              console.log(this.tableData);
            } else {
              this.$message.warning("未查询到获奖信息，请检查姓名和证书编号是否有误！");
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.award_header {
  width: 100%;
  height: 400px;
  background-image: url("../../assets/zhifeiji.png") ;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
