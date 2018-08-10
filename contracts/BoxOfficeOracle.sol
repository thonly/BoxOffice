pragma solidity ^0.4.24;

contract BoxOfficeOracle {
    
    address public admin;
    uint public usdPriceOfEth;
    
    event GetPrice();
    event PriceUpdated(uint price);
    
    constructor() public {
        admin = msg.sender;
        usdPriceOfEth = 354;
    }
    
    function updatePrice() public returns (bool) {
        emit GetPrice();
        return true;
    }
    
    function setPrice(uint price) public returns (bool) {
        require(msg.sender == admin);
        usdPriceOfEth = price;
        emit PriceUpdated(price);
        return true;
    }
    
    function convertToUsd(uint amountInWei) public view returns (uint) {
        return usdPriceOfEth * amountInWei / 1 ether;
    }
    
}