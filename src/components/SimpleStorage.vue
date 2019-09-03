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
      <code>{{resultCode}}</code>
    </div>
  </div>
</template>

<script>
// import Web3 from "web3";
// import getWeb3 from "@/utils/getWeb3";

// import truffleContract from "truffle-contract";
// import SimpleStorageContract from "../static/contracts/SimpleContract";

// const account_one = "0xa8f5C27769E322438Ec0654655641b6EF5a47299";
// const account_two = "0xb7674386405888984be6aa5c1f8d3d27bdb8e0c7";

// let web3;
// let contractInstance;
export default {
  name: "SimpleStorage",
  data() {
    return {
      message: null,
      contract: null,
      httpProvider: "http://localhost:8545",
      contract_address: "0xb1962b38f6b02aff2c0023c086f638386518dfa6",
      account: null,
      newValue: 0,
      currentNumber: 0,
      codeResult: "",
      accountResult: [],
      accountBalance: 0,
      inputModel: '',
      resultCode: ""
    };
  },
  methods: {
    handleCode() {
      this.$contractMutual
        .eth("getCode", this.$contractMutual.contract_address)
        .then(result => {
          this.resultCode = result;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleAccount() {
      this.$contractMutual
        .eth("getAccounts")
        .then(result => {
          this.resultCode = result;
        })
        .catch(err => {
          console.log(err);
        });
      // this.$contractMutual.web3.eth.getAccounts((error, result) => {
      //   console.log(error);
      //   this.resultCode = error || result;

      //   if (!error) {
      //     this.accountResult = result;
      //   }
      // });
    },
    getBalance() {
      web3.eth.getBalance(web3.eth.accounts[0], (error, result) => {
        console.log(error);
        this.resultCode = error || result;

        if (!error) {
          let resNumber = web3.toDecimal(result);
          this.accountBalance = web3.fromWei(resNumber);
        }
      });
    },
    setStorage() {
      this.$contractMutual
        .send("set", this.inputModel)
        .then(result => {
          this.resultCode = result;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getStorage() {
      this.$contractMutual
        .call("get")
        .then(result => {
          this.resultCode = result;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAddress() {
      this.$contractMutual
        .call("getAddress")
        .then(result => {
          this.resultCode = result;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getNum() {
      this.$contractMutual
        .call("computedNum", this.inputModel)
        .then(result => {
          this.resultCode = result;
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
      // let myContract = web3.eth.contract(SimpleStorageContract.abi);
      // let account = web3.eth.accounts[0];
      // console.log(myContract);
      // let newContract = myContract.new(
      //   {
      //     from: account,
      //     data: SimpleStorageContract.bytecode
      //   },
      //   (error, instance) => {
      //     // console.log(error, result);
      //     this.resultCode = error || result;
      //     if (!error) {
      //       contractInstance = instance;
      //     }
      //   }
      // );
    }
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.content {
  padding: 13px 13px 39px 13px;
}
.message {
  background: #eee;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 13px;
  line-height: 1;
  padding: 13px;
}
</style>
