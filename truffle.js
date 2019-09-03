// Allows us to use ES6 in our migrations and tests.
const path = require("path");
require('babel-register')

module.exports = {
  contracts_build_directory: path.join(__dirname, "src/static/contracts"),
  networks: {
    develop: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // Match any network id
      gas: 470000
    }
  }
}
