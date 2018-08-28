# BoxOffice

overview, link to article to learn about product functionalities, design decisions, and security vulnerabilities

https://medium.com/heartbankstudio/an-ethereum-dapp-to-decentralize-the-film-industry-and-empower-indie-filmmakers-82ad7e41a879

## Rinkeby Testnet

url, deployed addresses, links to etherscan; live on heroku 

### Deployed Contracts on Rinkeby
1. HeartBankCoin.sol: [0x7e4b1d67ffb30d45f46c33e40c60c77b0cd255aa](https://rinkeby.etherscan.io/address/0x7e4b1d67ffb30d45f46c33e40c60c77b0cd255aa)
2. BoxOffice.sol: [0x0b54d5f632b7e1f0ccf96842263d4750560b9147](https://rinkeby.etherscan.io/address/0x0b54d5f632b7e1f0ccf96842263d4750560b9147)
3. Oracle.sol: [0xa8bbbe439fa8cabe6a163d014e0e29c7697024c3](https://rinkeby.etherscan.io/address/0xa8bbbe439fa8cabe6a163d014e0e29c7697024c3)
4. OracleLibrary.sol: [0x55a52c2e16c0b28443d3814fa607c9158e3a92ba](https://rinkeby.etherscan.io/address/0x55a52c2e16c0b28443d3814fa607c9158e3a92ba)
5. OracleStorage.sol: [0xf4b186b23e3278144ed578d0627cfdc6181e9ee7](https://rinkeby.etherscan.io/address/0xf4b186b23e3278144ed578d0627cfdc6181e9ee7)
6. OracleRegistry.sol: [0x3dbdf868f9bb14b83b83c82c74710865f6262326](https://rinkeby.etherscan.io/address/0x3dbdf868f9bb14b83b83c82c74710865f6262326)


### Studio Home Page

screenshot of live page later

![Studio Home Page](https://raw.githubusercontent.com/thonly/BoxOffice/master/static/studio.png)


### Make Movie Page

![Make Movie Page](https://raw.githubusercontent.com/thonly/BoxOffice/master/static/make.png)

### Movie Token Page

![Movie Token Page](https://raw.githubusercontent.com/thonly/BoxOffice/master/static/movie.png)

### Movie Theater Page

![Movie Theater Page](https://raw.githubusercontent.com/thonly/BoxOffice/master/static/theater.png)

## How to Install

### Setup Project

open command line

1. Clone this repo: `$ git clone https://github.com/thonly/BoxOffice.git`
2. Change to the root directory: `$ cd ...`
3. Delete the build directory: `$ rm -r build`
4. Install dependencies: `$ npm install`

### Setup Smart Contract

choose how to deploy to ganache, rinkeby too; install ganache-cli or ganache gui
talk about `/config.js`
npm install -g truffle@4.1.12
npm install -g ganache-cli@6.1.6

1. Start up local blockchain: `$ ganache-cli`
1. Compile smart contracts: `$ truffle compile`
1. Deploy smart contracts: `$ truffle migrate --network ganache`

### Test Smart Contract

`truffle test`

### Setup Frontend

1. Start up local server: `npm run dev`
2. Visit url: `http://localhost:3000`

### Playground
tested on chrome

install metamask extension

to get update current price of ether

`$ npm run oracle`

useful scripts; to populate dummy data

`$ npm run boxoffice`

## How to Deploy to Rinkeby

`$ truffle migrate --network rinkeby`

get contract addresses

`$ truffle networks`

## Help Contribute

see issues
