# BoxOffice

overview, link to article to learn about product functionalities, design decisions, and security vulnerabilities

## Rinkeby Testnet

url, deployed addresses, links to etherscan; live on heroku

### Studio Home Page

screenshot of live page later
![Studio Home Page](https://github.com/thonly/BoxOffice/blob/master/static/studio.png)

### Make Movie Page
dsfdds
### Movie Token Page

### Movie Theater Page



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
