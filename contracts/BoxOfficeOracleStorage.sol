pragma solidity ^0.4.24;

contract BoxOfficeOracleStorage {
    
    address public owner;
    mapping (address => bool) private admins;
    
    uint public usdPriceOfEth;
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
    modifier onlyAdmin {
        require(admins[msg.sender]);
        _;
    }
    
    constructor(address admin) public {
        owner = msg.sender;
        admins[admin] = true;
        usdPriceOfEth = 354;
    }
    
    function addAdmin(address admin) public onlyOwner returns (bool) {
        admins[admin] = true;
        return true;
    }
    
    function usdPriceOfEth(uint price) public onlyAdmin returns (bool) {
        usdPriceOfEth = price;
        return true;
    }
    
    function kill() public onlyOwner {
        selfdestruct(owner);
    }
    
}