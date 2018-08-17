import Web3 from "web3";

const contract = require("truffle-contract");
const kiitos = require("./build/contracts/HeartBankToken.json");
const boxOffice = require("./build/contracts/BoxOffice.json");
const registry = require("./build/contracts/BoxOfficeRegistry.json");
const oracle = require("./build/contracts/BoxOfficeOracle.json");

const provider = typeof window !== "undefined" && typeof window.web3 !== "undefined" ? 
    window.web3.currentProvider : new Web3.providers.HttpProvider("http://localhost:9545"); 
    // https://rinkeby.infura.io/DPHGLx2mBJeWsuDv1jFV

const Kiitos = contract(kiitos);
const BoxOffice = contract(boxOffice);
const Registry = contract(registry);
const Oracle = contract(oracle);

Kiitos.setProvider(provider);
BoxOffice.setProvider(provider);
Registry.setProvider(provider);
Oracle.setProvider(provider);

const currentOracle = Registry.deployed()
    .then(registry => registry.currentOracle())
    .then(oracle => Oracle.at(oracle));

export default new Web3(provider);
export { Kiitos, BoxOffice, currentOracle };