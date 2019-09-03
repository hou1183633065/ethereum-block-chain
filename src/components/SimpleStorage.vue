<template>
  <div class="simplestorage">
    <div>
      <el-input
        type="text"
        autosize
        placeholder="请输入内容"
        v-model="inputModel">
      </el-input>
      <el-button type="primary" @click="createContract">部署合约</el-button>
      <el-button type="primary" @click="handleCode">查看代码</el-button>
      <el-button type="primary" @click="handleAccount">查看账户列表</el-button>
      <el-button type="primary" @click="getBalance">查看余额</el-button>
      <el-button type="primary" @click="setStorage">合约交互-设置存储值</el-button>
      <el-button type="primary" @click="getStorage">合约交互-获取存储值</el-button>
      <el-button type="primary" @click="getNum">合约交互-数值计算</el-button>
      <el-button type="primary" @click="getAddress">合约交互-获取地址</el-button>
    </div>
    <div>
      <h1>合约执行结果</h1>
      <div v-for="(item, index) in resultCode" :key="index">
        <p>第{{index+1}}条执行结果</p>
        <code>{{item}}</code>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputModel: "",
      resultCode: []
    };
  },
  methods: {
    handleCode() {
      this.$contractMutual
        .eth("getCode", this.$contractMutual.contract_address)
        .then(result => {
          this.resultCode.push(result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleAccount() {
      this.$contractMutual
        .eth("getAccounts")
        .then(result => {
          this.resultCode.push(result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getBalance() {
      this.$contractMutual
        .eth("getBalance", this.$contractMutual.defaultAccount)
        .then(result => {
          this.resultCode.push(result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    setStorage() {
      this.$contractMutual
        .send("set", this.inputModel)
        .then(result => {
          this.resultCode.push(result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getStorage() {
      this.$contractMutual
        .call("get")
        .then(result => {
          this.resultCode.push(result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAddress() {
      this.$contractMutual
        .call("getAddress")
        .then(result => {
          this.resultCode.push(result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getNum() {
      this.$contractMutual
        .call("computedNum", this.inputModel)
        .then(result => {
          this.resultCode.push(result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    createContract() {
      this.$contractMutual
        .createContract({
          from: this.$contractMutual.defaultAccount,
          data: this.$contractMutual.getContracts("bytecode")
        })
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
