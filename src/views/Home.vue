<template>
  <div class="home flex row center">
    <el-button @click="submitContract">部署合约</el-button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  methods: {
    submitContract() {
      this.$alarmUpload
        .createContract({
          from: this.$alarmUpload.defaultAccount,
          data: this.$alarmUpload.getContracts("bytecode")
        })
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
};
</script>

