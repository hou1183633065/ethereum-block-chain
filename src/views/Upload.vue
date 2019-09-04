<template>
  <div class="home flex row center">
    <div class="flex row justify-center">
      <el-card class="box-card">
        <h1 class="pb20 text-center size28">上报违章信息</h1>
        <el-form label-position="right" label-width="120px" :model="uploadForm" ref="uploadForm">
          <el-form-item label="姓名：">
            <el-input v-model="uploadForm.name" style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：">
            <el-input v-model="uploadForm.IDCard" style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item label="违章处理：">
            <el-input v-model="uploadForm.handleScore" type="number" :rows="2" style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item label="违章记录：">
            <el-input v-model="uploadForm.handleDesc" type="textarea" :rows="2" style="width: 250px;"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('uploadForm')">提交</el-button>
            <el-button @click="resetForm('uploadForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="box-card" style="width: 800px;">
        <h1 class="pb20 text-center size28 flex row center">
          <span>记录列表</span>
          <el-button class="ml20" type="primary" @click="handleSearchAll">查询</el-button>
        </h1>
        <el-table
          :data="dataList"
          style="width: 100%">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="90"
            align="center">
          </el-table-column>
          <el-table-column
            prop="IDCard"
            align="center"
            width="200"
            label="身份证号">
          </el-table-column>
          <el-table-column
            prop="handleScore"
            align="center"
            width="120"
            label="处理分数">
          </el-table-column>
          <el-table-column
            prop="handleDesc"
            align="center"
            label="记录信息">
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {},
  data() {
    return {
      uploadForm: {
        name: "",
        IDCard: "",
        handleScore: "",
        handleDesc: ""
      },
      dataList: []
    };
  },
  mounted() {},
  methods: {
    submitForm(refName) {
      let {
        name = "",
        IDCard = "",
        handleScore = 0,
        handleDesc = ""
      } = this.uploadForm;
      this.$alarmUpload
        .send("upload", name, IDCard, handleScore, handleDesc)
        .then(result => {
          console.log(result);
          this.resetForm(refName);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSearchAll() {
      this.dataList = [];
      this.$alarmUpload
        .call("getTotal")
        .then(async result => {
          for (let i = 0; i < result.toNumber(); i++) {
            let detailData = await this.getDetail(i);
            this.dataList.push(detailData);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    async getDetail(_index) {
      let [
        name,
        IDCard,
        handleScore,
        handleDesc
      ] = await this.$alarmUpload.call("getDetailByIndex", _index);
      console.log(name, IDCard, handleScore, handleDesc);
      return {
        name,
        IDCard,
        handleScore,
        handleDesc
      };
    },
    resetForm(refName) {
      this.$refs[refName].resetFields();
      this.uploadForm = {};
    }
  }
};
</script>

