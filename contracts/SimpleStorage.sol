pragma solidity ^0.5.0;  
contract SimpleContract {  
    // The keyword "public" makes those variables  
    // readable from outside.  
    address public minter;  
    mapping (address => uint) public balances;  
    string public accounts;  
  
    // Events allow light clients to react on  
    // changes efficiently.  
    event Sent(address from, address to, uint amount);  
  
    // This is the constructor whose code is  
    // run only when the contract is created.  
    constructor (uint _apply, string memory _users) public {  
        minter = msg.sender;  
        balances[msg.sender]=_apply;  
        accounts=_users;  
    }  
  
    function mint(address receiver, uint amount) public {  
        if (msg.sender != minter) return;  
        balances[receiver] += amount;  
    }  
  
    function send(address receiver, uint amount) public {  
        if (balances[msg.sender] < amount) return;  
        balances[msg.sender] -= amount;  
        balances[receiver] += amount;  
        emit Sent(msg.sender, receiver, amount);  
    }  
    
    
    uint storedData;

    function getAddress() public view returns (address){
        return minter;
    }

    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }

    function computedNum(uint _num) public pure returns (uint) {
        return ++_num;
    }
} 