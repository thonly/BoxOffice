pragma solidity ^0.4.24;

contract BoxOfficeRegistry {
    
    address public admin;
    address public currentBoxOffice;
    address[] public previousBoxOffices;
    
    event BoxOfficeUpgraded(address newBoxOffice);

    constructor(address boxOffice) public {
        admin = msg.sender;
        currentBoxOffice = boxOffice;
    }

    function upgradeBoxOffice(address newBoxOffice) public returns (bool) {
        require(msg.sender == admin);
        if(newBoxOffice != currentBoxOffice) {
            previousBoxOffices.push(currentBoxOffice);
            currentBoxOffice = newBoxOffice;
            emit BoxOfficeUpgraded(newBoxOffice);
            return true;
        }
        return false;
    }
}