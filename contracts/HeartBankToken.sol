pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract HeartBankToken is StandardToken {

    string public constant name = "HeartBank Kiitos";
    string public constant symbol = "H3K";
    uint8 public constant decimals = 0;

    constructor() public {
        totalSupply_ = 1 ether;
        balances[msg.sender] = totalSupply_;
    }

}