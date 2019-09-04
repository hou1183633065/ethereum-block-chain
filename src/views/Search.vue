<template>
  <div class="about flex column center">
    <el-card class="box-card">
      <h1 class="pb20 text-center size28">违章信息查询</h1>
      <div class="flex row center">
        <el-input v-model="IDCard" placeholder="请输入身份证号查询" style="width: 250px;"></el-input>
        <el-button class="ml20" type="primary" @click="submitForm" :loading="loadingBtn" style="width: 90px;">查询</el-button>
      </div>
    </el-card>
    <el-card class="box-card" v-if="resultData.hasData">
      <h1 class="pb20 text-center size28">信息查询结果</h1>
      <div>
        <p>姓名：{{resultData.name}}</p>
        <p>身份证号：{{resultData.IDCard}}</p>
        <p>处理分数：{{resultData.handleScore}}</p>
        <p>记录信息：{{resultData.handleDesc}}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      IDCard: "",
      loadingBtn: false,
      resultData: {}
    };
  },
  methods: {
    async submitForm() {
      if (!this.IDCard) {
        return;
      }
      this.loadingBtn = true;
      console.log(this.IDCard);

      let [
        name,
        IDCard,
        handleScore,
        handleDesc
      ] = await this.$alarmUpload.call("getDetailByIDCard", this.IDCard);
      this.resultData = {
        hasData: true,
        name,
        IDCard,
        handleScore,
        handleDesc
      };
      this.loadingBtn = false;
    }
  }
};
</script>
