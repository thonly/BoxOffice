pragma solidity ^0.4.24;

contract BoxOfficeRegistry {
    
    address public owner;
    address public currentBoxOffice;
    address[] public previousBoxOffices;
    
    event BoxOfficeUpgraded(address newBoxOffice);
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    constructor(address boxOffice) public {
        owner = msg.sender;
        currentBoxOffice = boxOffice;
    }

    function upgradeBoxOffice(address newBoxOffice) public onlyOwner returns (bool) {
        if(newBoxOffice != currentBoxOffice) {
            previousBoxOffices.push(currentBoxOffice);
            currentBoxOffice = newBoxOffice;
            emit BoxOfficeUpgraded(newBoxOffice);
            return true;
        }
        return false;
    }
    
    function kill() public onlyOwner {
        selfdestruct(owner);
    }
    
}