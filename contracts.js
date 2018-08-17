import Web3 from "web3";

const contract = require("truffle-contract");
const kiitos = require("./build/contracts/HeartBankToken.json");
const boxOffice = require("./build/contracts/BoxOffice.json");
const registrar = require("./build/contracts/BoxOfficeRegistrar.json");
const oracle = require("./build/contracts/BoxOfficeOracle.json");

const provider = typeof window !== "undefined" && typeof window.web3 !== "undefined" ?
    window.web3.currentProvider : new Web3.providers.HttpProvider("http://localhost:9545"); // https://rinkeby.infura.io/DPHGLx2mBJeWsuDv1jFV

const Kiitos = contract(kiitos).setProvider(provider);
const BoxOffice = contract(boxOffice).setProvider(provider);
const Oracle = contract(oracle).setProvider(provider);

export default new Web3(provider);
export { Kiitos, BoxOffice, Oracle };