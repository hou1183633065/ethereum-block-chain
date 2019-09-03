
import getWeb3 from "@/utils/getWeb3";

import SimpleStorageContract from "@/static/contracts/SimpleContract.json";

import { default_account } from "@/utils/config";


class ContractMutual {
  constructor() {
    new getWeb3().then((web3) => {
      this.web3 = web3

      this.setDefaultAccount()

      if (this.contract_address) {

        this.contract.at(this.contract_address, (error, instance) => {

          if (!error) {
            this.setInstance(instance)
          }

        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  getContracts(keyName) {
    return SimpleStorageContract[keyName]
  }
  setDefaultAccount(account) {
    this.web3.eth.defaultAccount = account || this.web3.eth.coinbase;
  }
  get defaultAccount() {
    return this.web3.eth.defaultAccount
  }
  setInstance(instance) {
    this.instance = instance
  }
  get default_account() {
    return default_account
  }
  get contract() {
    return this.web3.eth.contract(this.getContracts('abi'));
  }
  get contract_address() {
    return window.localStorage.getItem('contract_address')
  }
  call() {
    let [methods, ...options] = arguments

    return new Promise((resolve, rejects) => {

      this.instance[methods].call(...options, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          rejects(error)
        }
      })
    })
  }
  send() {
    let [methods, ...options] = arguments
    return new Promise((resolve, rejects) => {
      this.instance[methods](...options, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          rejects(error)
        }
      })
    })
  }

  eth() {
    let [methods, ...options] = arguments
    return new Promise((resolve, rejects) => {
      this.web3.eth[methods](...options, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          rejects(error)
        }
      })
    })
  }

  createContract(options) {
    return new Promise((resolve, rejects) => {
      this.contract.new(options,
        (error, instance) => {
          if (!error) {
            if (instance.address) {
              window.localStorage.setItem('contract_address', instance.address)
              this.instance = instance
              resolve(this.instance)
            }
          } else {
            rejects(error)
          }
        }
      );
    })
  }
}
export default ContractMutual
