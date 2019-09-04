pragma solidity ^0.5.0;  
contract AlarmUpload {  
    
    struct AlarmDetail {
        string name;
        string IDCard;
        string handleScore;
        string handleDesc;
    }
    
    AlarmDetail[] AlarmList;
    
    mapping(string => AlarmDetail) AlarmDetailMapping;
    
    function upload(string memory _name, string memory _IDCard, string memory _score, string memory _desc) public {
        AlarmList.push(AlarmDetail({
            name: _name,
            IDCard: _IDCard,
            handleScore: _score,
            handleDesc: _desc
        }));
        AlarmDetailMapping[_IDCard] = AlarmDetail({
            name: _name,
            IDCard: _IDCard,
            handleScore: _score,
            handleDesc: _desc
        });
    }
    
    function getTotal() public view returns (uint) {
        return AlarmList.length;
    }
    
    function getDetailByIndex(uint _index) public view returns (string memory name, string memory IDCard, string memory handleScore, string memory handleDesc){
        return (
           AlarmList[_index].name, 
           AlarmList[_index].IDCard, 
           AlarmList[_index].handleScore,
           AlarmList[_index].handleDesc
        );
    }
    
    function getDetailByIDCard(string memory _IDCard) public view returns (string memory name, string memory IDCard, string memory handleScore, string memory handleDesc){
        return (
            AlarmDetailMapping[_IDCard].name,
            AlarmDetailMapping[_IDCard].IDCard,
            AlarmDetailMapping[_IDCard].handleScore,
            AlarmDetailMapping[_IDCard].handleDesc
        );
    }
}